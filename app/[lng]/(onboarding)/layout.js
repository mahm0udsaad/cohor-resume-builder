import "@/app/[lng]/globals.css";
export default async function RootLayout({ children, params: { lng } }) {
  return (
    <main className="overflow-hidden min-h-screen w-full">{children}</main>
  );
}
