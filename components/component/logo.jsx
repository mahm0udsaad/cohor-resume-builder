import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="mr-6 h-[3rem] flex items-center space-x-2 bg-main rounded shadow-lg max-w-[300px] px-4"
    >
      <Image src="/cogor-logo.svg" alt="Logo" width={100} height={32} />
    </Link>
  );
}
