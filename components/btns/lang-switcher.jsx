// LanguageSwitcher.js
"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import i18next from "i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LanguagesIcon } from "lucide-react";
import { useCookies } from "react-cookie";

export default function LanguageSwitcher({ currentLang }) {
  const pathname = usePathname();
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["NEXT_LOCALE"]);

  const handleLanguageChange = (newLang) => {
    if (currentLang === newLang) return;
    const currentPathname = pathname;
    const segments = currentPathname.split("/");
    segments[1] = newLang;
    const newPathname = segments.join("/");

    // Set a cookie to persist the language choice
    setCookie("NEXT_LOCALE", newLang, { path: "/", maxAge: 31536000 });

    router.push(newPathname);
    i18next.changeLanguage(newLang);
  };

  return (
    <div className="flex gap-2 mx-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="w-12 px-0 border">
            <LanguagesIcon className="size-6" />
            <span className="sr-only">Switch language</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="gap-4"
            onClick={() => handleLanguageChange("ar")}
          >
            <img
              src={`https://flagcdn.com/w40/sa.png`}
              alt={`sa flag`}
              className="size-5 rounded-sm"
            />
            العربية
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="gap-4"
            onClick={() => handleLanguageChange("en")}
          >
            <img
              src={`https://flagcdn.com/w40/us.png`}
              alt={`uk flag`}
              className="size-5 rounded-sm"
            />
            English
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
