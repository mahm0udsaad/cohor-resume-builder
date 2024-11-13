"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/app/i18n/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutTemplate, LogOut, User } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Skeleton } from "../ui/skeleton";

const UserBtn = ({ lng }) => {
  const { data: session, status } = useSession();
  const { t } = useTranslation(lng, "common");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/");
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex flex-1 items-center justify-end">
        <Skeleton className={"w-10 h-10"} />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-1 items-center space-x-2 justify-end">
        <nav className="flex gap-2 items-center">
          <Link href="/auth">
            <Button
              className="ring-offset-none focus-visible:ring-0 focus-visible:ring-offset-0"
              variant="ghost"
            >
              {t("nav.signIn")}
            </Button>
          </Link>
          <Link href="/auth?register=true">
            <Button className="bg-[#3b51a3] hover:bg-[#2a3b7a] text-white">
              {t("nav.signUp")}
            </Button>
          </Link>
        </nav>
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center justify-end overflow-hidden">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button size="icon">
            <Image
              src={session?.user?.image}
              alt={session?.user?.name}
              width={40}
              height={40}
              className="rounded-full border main-border"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1 leading-none">
              {session?.user?.name && (
                <p className="font-medium">{session.user.name}</p>
              )}
              {session?.user?.email && (
                <p className="w-[200px] truncate text-sm text-muted-foreground">
                  {session.user.email}
                </p>
              )}
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/gallery" className="flex items-center">
              <LayoutTemplate className="mx-2 h-4 w-4" />
              <span>{t("templatesTitle")}</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="flex items-center">
              <User className="mx-2 h-4 w-4" />
              <span>{t("userDropdown.dashboard")}</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleLogout} className="text-red-600">
            <LogOut className="mx-2 h-4 w-4" />
            <span>{t("userDropdown.logout")}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <div className="pt-2 flex items-center justify-center gap-4 color-blue-500">
            <Link className="underline text-blue-500" href="/privacy-policy">
              {t("userDropdown.privacy")}
            </Link>
            <Link className="underline text-blue-500" href="/terms-conditions">
              {t("userDropdown.terms")}
            </Link>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export const DashUserBtn = ({ lng }) => {
  const { data: session, status } = useSession();
  const { t } = useTranslation(lng, "common");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/");
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex flex-1 items-center justify-end">
        <Skeleton className={"w-10 h-10"} />
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center justify-end overflow-hidden">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button size="icon">
            <Image
              src={session?.user?.image || "/user.png"}
              alt={session?.user?.name}
              width={40}
              height={40}
              className="rounded-full border main-border"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1 leading-none">
              {session?.user?.name && (
                <p className="font-medium">{session.user.name}</p>
              )}
              {session?.user?.email && (
                <p className="w-[200px] truncate text-sm text-muted-foreground">
                  {session.user.email}
                </p>
              )}
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/gallery" className="flex items-center">
              <LayoutTemplate className="mx-2 h-4 w-4" />
              <span>{t("templatesTitle")}</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="flex items-center">
              <User className="mx-2 h-4 w-4" />
              <span>{t("userDropdown.dashboard")}</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleLogout} className="text-red-600">
            <LogOut className="mx-2 h-4 w-4" />
            <span>{t("userDropdown.logout")}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <div className="pt-2 flex items-center justify-center gap-4 color-blue-500">
            <Link className="underline text-blue-500" href="/privacy-policy">
              {t("userDropdown.privacy")}
            </Link>
            <Link className="underline text-blue-500" href="/terms-conditions">
              {t("userDropdown.terms")}
            </Link>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserBtn;
