import PasswordResetFlow from "@/components/forms/reset-passowrd";

// app/[lng]/auth/forgot-password/page.jsx
export default function ForgotPasswordPage({ params: { lng } }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 p-4">
      <PasswordResetFlow lng={lng} />
    </div>
  );
}
