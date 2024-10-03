import { LandingPageComponent } from "@/components/landing-page";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

// In your component
const ResumeBuilderPage = async ({ params: { lng } }) => {
  const user = await auth();
  if (user) redirect("/dashboard");

  return <LandingPageComponent lng={lng} />;
};

export default ResumeBuilderPage;
