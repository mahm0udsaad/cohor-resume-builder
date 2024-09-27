import { SignInPageComponent } from "@/components/component/sign-in-page";

export default function AuthPage({ params: { lng } }) {
  return <SignInPageComponent lng={lng} />;
}
