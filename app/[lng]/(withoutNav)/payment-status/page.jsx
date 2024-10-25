"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function PaymentStatus() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("loading");
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const success = searchParams.get("success");
    const redirectUrl = localStorage.getItem("currentUrl");

    console.log(redirectUrl);
    // Set initial status
    if (success === "true") {
      setStatus("success");
      // Store transaction details if needed
    } else {
      setStatus("error");
    }

    // Handle redirect
    if (redirectUrl) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            router.push(redirectUrl);
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [searchParams, router]);

  // Render different content based on status
  const statusContent = {
    loading: {
      icon: <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />,
      title: "Processing Payment",
      description: "Please wait while we confirm your payment...",
      textColor: "text-blue-500",
    },
    success: {
      icon: <CheckCircle className="w-16 h-16 text-green-500" />,
      title: "Payment Successful!",
      description: "Your payment has been processed successfully.",
      textColor: "text-green-500",
    },
    error: {
      icon: <XCircle className="w-16 h-16 text-red-500" />,
      title: "Payment Failed",
      description: "There was an error processing your payment.",
      textColor: "text-red-500",
    },
  };

  const content = statusContent[status];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center space-y-4">
          {content.icon}
          <h1 className={`text-2xl font-bold ${content.textColor}`}>
            {content.title}
          </h1>
          <p className="text-gray-600 text-center">{content.description}</p>

          {status === "success" ||
            (status === "error" && (
              <Alert className="mt-4">
                <AlertDescription>
                  Redirecting in {countdown} seconds...
                </AlertDescription>
              </Alert>
            ))}

          {status === "error" && (
            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => window.history.back()}>
                Go Back
              </Button>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
