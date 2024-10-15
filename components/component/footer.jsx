"use client";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
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
                  href="#"
                  className="text-sm text-gray-600 hover:text-[#3b51a3]"
                >
                  {t("footer.product.templates")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-[#3b51a3]"
                >
                  {t("footer.product.integrations")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[#3b51a3] mb-4">
              {t("footer.resources.title")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-[#3b51a3]"
                >
                  {t("footer.resources.blog")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-[#3b51a3]"
                >
                  {t("footer.resources.helpCenter")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-[#3b51a3]"
                >
                  {t("footer.resources.careerTips")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-[#3b51a3]"
                >
                  {t("footer.resources.faqs")}
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
                  href="#"
                  className="text-sm text-gray-600 hover:text-[#3b51a3]"
                >
                  {t("footer.company.aboutUs")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-[#3b51a3]"
                >
                  {t("footer.company.careers")}
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
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">{t("footer.copyright")}</p>
            <div className="flex gap-4">
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
