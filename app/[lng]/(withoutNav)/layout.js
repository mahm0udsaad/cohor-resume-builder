import "@/app/[lng]/globals.css";
import { Footer } from "@/components/component/footer";

export default async function RootLayout({ children }) {
  return (
    <>
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
}
