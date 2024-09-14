import Nav from "@/components/component/nav";
import "./globals.css";
import { Footer } from "@/components/component/footer";

export const metadata = {
  title: "Cohor | Resume Builder",
  description: "Generate Your Resume",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
