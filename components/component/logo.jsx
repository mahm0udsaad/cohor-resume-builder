import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="h-[3rem] flex items-center justify-start max-w-[300px]"
    >
      <Image priority src="/ar-logo.png" alt="Logo" width={120} height={100} />
    </Link>
  );
}
