import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-100 to-gray-200  text-muted-foreground px-4 md:px-6 py-6 flex items-center justify-between">
      <div className="text-sm">&copy; 2024 Cohor Resume Builder</div>
      <nav className="flex items-center gap-4">
        <Link href="#" className="text-sm hover:underline" prefetch={false}>
          Privacy
        </Link>
        <Link href="#" className="text-sm hover:underline" prefetch={false}>
          Terms
        </Link>
        <Link href="#" className="text-sm hover:underline" prefetch={false}>
          Contact
        </Link>
      </nav>
    </footer>
  );
}
