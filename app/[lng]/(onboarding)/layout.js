import "@/app/[lng]/globals.css";
export default async function RootLayout({ children, params: { lng } }) {
  return <main className="min-h-screen w-full">{children}</main>;
}
