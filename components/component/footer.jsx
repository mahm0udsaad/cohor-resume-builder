"use client";
"use client";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react"; // Import icons
import Logo from "./logo";
import { useTranslation } from "@/app/i18n/client";

export function Footer({ lng }) {
  const { t } = useTranslation(lng, "common");

  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo />
            <p className="pt-4 text-sm text-gray-600">
              {t("footer.description")}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-[#3b51a3] mb-4">
              {t("footer.product.title")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#features"
                  className="text-sm text-gray-600 hover:text-[#3b51a3]"
                >
                  {t("footer.product.features")}
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-sm text-gray-600 hover:text-[#3b51a3]"
                >
                  {t("footer.product.pricing")}
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-sm text-gray-600 hover:text-[#3b51a3]"
                >
                  {t("footer.product.templates")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#3b51a3] mb-4">
              {t("footer.company.title")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://cohr.sa/about/"
                  className="text-sm text-gray-600 hover:text-[#3b51a3]"
                >
                  {t("footer.company.aboutUs")}
                </Link>
              </li>
              <li>
                <Link
                  href="https://cohr.sa/blog/"
                  className="text-sm text-gray-600 hover:text-[#3b51a3]"
                >
                  {t("footer.company.careers")}
                </Link>
              </li>
              <li>
                <Link
                  href="https://cohr.sa/خدمات-المنشآت/"
                  className="text-sm text-gray-600 hover:text-[#3b51a3]"
                >
                  {t("footer.services")}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-gray-600 hover:text-[#3b51a3]"
                >
                  {t("footer.company.privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-conditions"
                  className="text-sm text-gray-600 hover:text-[#3b51a3]"
                >
                  {t("footer.company.termsOfService")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#3b51a3] mb-4">
              {t("footer.contact.title")}
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#3b51a3]" />
                <a
                  href="https://api.whatsapp.com/send/?phone=966571553790&text&type=phone_number&app_absent=0"
                  className="text-sm text-gray-600 hover:text-[#3b51a3]"
                >
                  {t("footer.contact.whatsapp")}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#3b51a3]" />
                <a
                  href="mailto:Info@cohr.sa"
                  className="text-sm text-gray-600 hover:text-[#3b51a3]"
                >
                  {t("footer.contact.email")}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#3b51a3]" />
                <a
                  href="tel:966571553790"
                  className="text-sm text-gray-600 hover:text-[#3b51a3]"
                >
                  {t("footer.contact.phone")}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">{t("footer.copyright")}</p>
            <div className="flex gap-4">
              <Link
                target="_blank"
                href="https://www.snapchat.com/add/c0hrcom"
                className="text-gray-600 hover:text-[#3b51a3]"
              >
                <Snapchat className="w-5 h-5" />
                <span className="sr-only">Snapchat</span>
              </Link>
              <Link
                target="_blank"
                href="https://twitter.com/c0hrcom"
                className="text-gray-600 hover:text-[#3b51a3]"
              >
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                target="_blank"
                href="https://www.youtube.com/channel/UCURYK5CU3-u2nG_1fnyoNDA"
                className="text-gray-600 hover:text-[#3b51a3]"
              >
                <Youtube className="w-5 h-5" />
                <span className="sr-only">Youtube</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Snapchat() {
  return (
    <svg
      width="30px"
      height="30px"
      viewBox="-3 0 262 262"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      fill="none"
    >
      <path
        stroke="#4b5563"
        strokeLinejoin="round"
        strokeWidth={"14"}
        d="M95.918 22.002c-11.963-.087-24.145 4.54-32.031 13.717-6.995 7.405-9.636 17.901-9.284 27.868-.03 5.119.032 10.237.05 15.355-4.901-1.217-9.873-4.624-15.063-2.937-4.422 1.313-6.267 7.088-3.596 10.791 2.876 3.761 7.346 5.907 11.08 8.71 1.837 1.5 4.313 2.571 5.68 4.499-.001 4.62-2.425 8.897-4.722 12.786-5.597 8.802-14.342 15.531-23.705 20.18-2.39 1.035-4.59 4.144-2.473 6.499 3.862 3.622 9.327 4.778 14.195 6.486 2.047.64 5.078 1.34 4.886 4.084.335 2.923 2.205 6.066 5.492 6.078 7.873.91 16.289.522 23.345 4.741 6.917 4.006 14.037 8.473 22.255 8.96 8.188.767 16.623-.888 23.642-5.255 5.23-2.884 10.328-6.477 16.456-7.061 5.155-1.206 10.702-.151 15.685-2.072 3.193-1.367 2.762-5.244 4.104-7.808 2.532-1.747 5.77-1.948 8.59-3.102 3.687-1.47 8.335-2.599 10.268-6.413 1.148-3.038-2.312-4.698-4.453-5.88-11.38-5.874-21.631-14.921-26.121-27.191-.496-1.936-2.279-4.834.084-6.255 4.953-4.176 11.413-6.575 15.514-11.715 3.103-3.884.941-10.55-4.141-11.322-4.928-.78-9.525 1.893-14.152 3.127-.404-8.53.502-17.232-.776-25.746-2.429-13.808-13.514-25.157-26.813-29.124-4.521-1.401-9.266-2.037-13.996-2Z"
      ></path>
    </svg>
  );
}
