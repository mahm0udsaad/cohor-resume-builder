import "@/app/[lng]/globals.css";
import { Footer } from "@/components/component/footer";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
