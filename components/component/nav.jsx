"use client";
import Link from "next/link";
import { Menu } from "lucide-react";
import Logo from "./logo";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/app/i18n/client";
import { useAuth } from "@/context/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/client";
import { useRouter } from "next/navigation";

export default function Nav({ lng }) {
  const { t } = useTranslation(lng, "common");
  const [open, setOpen] = useState(false);
  const { user, setUser } = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      // Sign out from Firebase
      await signOut(auth);

      // Clear the user from your auth context
      setUser(null);

      // Clear any user-related data from localStorage if you're storing any
      localStorage.removeItem("user");

      router.push("/");

      console.log("Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center">
        <div className="mx-4 hidden md:flex">
          <Logo />
          <nav className="mx-6 flex items-center gap-6 text-sm font-medium">
            <Link className="hover:text-blue-800" href="#features">
              {t("nav.featuresTitle")}{" "}
            </Link>
            <Link className="hover:text-blue-800" href="#how-it-works">
              {t("nav.stepsTitle")}{" "}
            </Link>
            <Link className="hover:text-blue-800" href="#pricing">
              {t("nav.pricingTitle")}
            </Link>
          </nav>
        </div>
        <button className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-10 w-10 px-0 md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">{t("nav.toggleMenu")}</span>{" "}
          {/* For accessibility */}
        </button>
        {!user ? (
          <div className="flex flex-1 items-center space-x-2 justify-end">
            <nav className="flex gap-2 items-center">
              <Link href="/auth">
                <Button variant="ghost">{t("nav.signIn")}</Button>
              </Link>
              <Link href="/auth">
                <Button className="bg-[#3b51a3] hover:bg-[#2a3b7a] text-white">
                  {t("nav.signUp")}
                </Button>
              </Link>{" "}
            </nav>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-end overflow-hidden">
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-fit">
                  <Image
                    src={user.picture || user.photoURL || "avatar.svg"}
                    alt={user.name || "User"}
                    width={40}
                    height={40}
                    className="rounded-full border main-border"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </header>
  );
}
