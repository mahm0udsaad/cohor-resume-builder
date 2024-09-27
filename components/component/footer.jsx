import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
export function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image
                src="/cogor-logo.svg"
                alt="Cogor Logo"
                width={116}
                height={53}
                className="inline-block"
              />
            </Link>
            <p className="text-sm text-gray-600">
              Create professional resumes with ease using our intuitive builder.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-[#3b51a3] mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#features"
                  className="text-sm text-gray-600 hover:text-[#3b51a3]"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-sm text-gray-600 hover:text-[#3b51a3]"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-[#3b51a3]"
                >
                  Templates
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-[#3b51a3]"
                >
                  Integrations
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[#3b51a3] mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-[#3b51a3]"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-[#3b51a3]"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-[#3b51a3]"
                >
                  Career Tips
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-[#3b51a3]"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[#3b51a3] mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-[#3b51a3]"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-[#3b51a3]"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-[#3b51a3]"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-[#3b51a3]"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              © 2023 ResumeBuilder. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-600 hover:text-[#3b51a3]">
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-[#3b51a3]">
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-[#3b51a3]">
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-[#3b51a3]">
                <Linkedin className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
