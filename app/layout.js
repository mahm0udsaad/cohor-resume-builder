import "./globals.css";

export const metadata = {
  title: "Resume Builder",
  description: "Generate Your Resume",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
