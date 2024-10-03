import "@/app/[lng]/globals.css";
import { dir } from "i18next";
import { languages } from "@/app/i18n/settings";
import AuthProvider from "@/components/AuthProvider";
export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export const metadata = {
  title: "Cohor | Resume Builder",
  description: "Generate Your Resume",
};
export const icons = {
  icon: "/favicon.ico",
};
export default function RootLayout({ children, params: { lng } }) {
  return (
    <AuthProvider>
      <html lang={lng} dir={dir(lng)}>
        <body className="">{children}</body>
      </html>
    </AuthProvider>
  );
}
