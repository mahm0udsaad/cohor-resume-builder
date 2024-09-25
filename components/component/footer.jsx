import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-auto text-center md:text-left mb-4 md:mb-0">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cogor-logo-0ILYRoRGNSeJooVt3bQuaCPgP86zpg.svg"
              alt="Cogor Logo"
              width={116}
              height={53}
              className="inline-block"
            />
            <p className="mt-2">© 2024 Cogor. All rights reserved.</p>
          </div>
          <div className="w-full md:w-auto">
            <ul className="flex flex-wrap justify-center md:justify-end space-x-6">
              <li>
                <Link href="#" className="hover:text-gray-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
