import "@/app/[lng]/globals.css";

export default async function RootLayout({ children, params: { lng } }) {
  return (
    <>
      <div className="min-h-screen">{children}</div>
    </>
  );
}
