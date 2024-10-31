import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="mx-6 h-[3rem] flex items-center space-x-2 max-w-[300px] px-4"
    >
      <Image priority src="/ar-logo.png" alt="Logo" width={200} height={100} />
    </Link>
  );
}
