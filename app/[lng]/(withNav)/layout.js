import Nav from "@/components/component/nav";
import "@/app/[lng]/globals.css";
import { Footer } from "@/components/component/footer";

export const icons = {
  icon: "/favicon.ico",
};
export default function RootLayout({ children, params: { lng } }) {
  return (
    <html>
      <body className="">
        <Nav lng={lng} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
