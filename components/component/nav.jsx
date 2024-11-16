import Link from "next/link";
import { Menu } from "lucide-react";
import Logo from "./logo";
import { useTranslation } from "@/app/i18n"; // assuming you're using react-i18next
import UserBtn from "./userBtn";
import LanguageSwitcher from "../btns/lang-switcher";

export default async function Nav({ lng }) {
  const { t } = await useTranslation(lng, "common");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center">
        <div className="mx-4 md:flex">
          <Logo />
          <nav className="mx-6 hidden md:flex items-center gap-6 text-sm font-medium">
            <Link className="hover:text-blue-800" href="/#features">
              {t("nav.featuresTitle")}{" "}
            </Link>
            <Link className="hover:text-blue-800" href="/#how-it-works">
              {t("nav.stepsTitle")}{" "}
            </Link>
            <Link className="hover:text-blue-800" href="/#pricing">
              {t("nav.pricingTitle")}
            </Link>
          </nav>
        </div>
        <UserBtn lng={lng} />
        <LanguageSwitcher currentLang={lng} />
      </div>
    </header>
  );
}
