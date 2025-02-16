import "./globals.css";
import { dir } from "i18next";
import { languages } from "@/app/i18n/settings";
import AuthProvider from "@/components/AuthProvider";
import { Toaster } from "@/components/ui/toaster";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export const metadata = {
  title: "انشاء السيرة الذاتية عاصمة الموارد البشرية | COHR CV Builder",
  description: "انشاء السيرة الذاتية عاصمة الموارد البشرية | COHR CV Builder",
};

export default function RootLayout({ children, params: { lng } }) {
  return (
    <AuthProvider lng={lng}>
      <html lang={lng} dir={dir(lng)}>
        <head>
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body>
          {children}
          <Toaster />
        </body>
      </html>
    </AuthProvider>
  );
}
