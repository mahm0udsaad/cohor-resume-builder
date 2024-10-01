import { getCurrentUser } from "@/actions/userInfo/action";
import { SignInPageComponent } from "@/components/component/sign-in-page";
import { redirect } from "next/navigation";

export default function AuthPage({ params: { lng } }) {
  const user = getCurrentUser();
  if (!user) redirect("/dashboard");
  return <SignInPageComponent lng={lng} />;
}
