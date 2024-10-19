import { LandingPageComponent } from "@/components/landing-page";
// In your component
const ResumeBuilderPage = async ({ params: { lng } }) => {
  return <LandingPageComponent lng={lng} />;
};

export default ResumeBuilderPage;
