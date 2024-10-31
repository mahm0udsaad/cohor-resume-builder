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
        <div className="mx-4 hidden md:flex">
          <Logo />
          <nav className="mx-6 flex items-center gap-6 text-sm font-medium">
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
        <button className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-10 w-10 px-0 md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">{t("nav.toggleMenu")}</span>{" "}
          {/* For accessibility */}
        </button>
        <UserBtn lng={lng} />
        <LanguageSwitcher currentLang={lng} />
      </div>
    </header>
  );
}
