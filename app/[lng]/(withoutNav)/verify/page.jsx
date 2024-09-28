"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/client";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { storeUser } from "@/actions/auth/actions";

export default function VerifyEmailComponent() {
  const [verificationStatus, setVerificationStatus] = useState(
    "Verifying your email...",
  );
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const verifyEmail = async () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem("emailForSignIn");
        if (!email) {
          email = window.prompt("Please provide your email for confirmation");
        }
        if (!email) {
          setError("Email is required for verification");
          setVerificationStatus("Verification failed");
          return;
        }
        try {
          const result = await signInWithEmailLink(
            auth,
            email,
            window.location.href,
          );
          window.localStorage.removeItem("emailForSignIn");

          // User is signed in.
          const user = result.user;
          const storeResult = await storeUser(user);

          if (!storeResult.success) {
            throw new Error(storeResult.error);
          }
          setVerificationStatus("Email verified successfully. Redirecting...");
          setTimeout(() => router.push("/dashboard"), 2000);
        } catch (error) {
          console.error("Error during email verification:", error);
          setError(error.message);
          setVerificationStatus("Verification failed");
        }
      } else {
        setError("Invalid verification link");
        setVerificationStatus("Verification failed");
      }
    };

    verifyEmail();
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Email Verification
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {verificationStatus}
          </p>
          {error && (
            <p className="mt-2 text-center text-sm text-red-600">
              Error: {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
