import "@/app/[lng]/globals.css";
import { Footer } from "@/components/component/footer";
import { AuthProvider } from "@/context/auth";

export default async function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html>
        <body>
          <div className="min-h-screen">{children}</div>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
