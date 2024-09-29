import Nav from "@/components/component/nav";
import "@/app/[lng]/globals.css";
import { Footer } from "@/components/component/footer";
import { dir } from "i18next"; // Add this line

export const icons = {
  icon: "/favicon.ico",
};
export default function RootLayout({ children, params: { lng } }) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body className="">
        <Nav lng={lng} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
