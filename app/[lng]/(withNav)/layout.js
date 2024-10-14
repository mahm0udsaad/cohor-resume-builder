import Nav from "@/components/component/nav";
import "@/app/[lng]/globals.css";
import { Footer } from "@/components/component/footer";

export const icons = {
  icon: "/favicon.ico",
};
export default function RootLayout({ children, params: { lng } }) {
  return (
    <>
      <Nav lng={lng} />
      <div className="bg-gray-50 min-h-screen">{children}</div>
      <Footer />
    </>
  );
}
