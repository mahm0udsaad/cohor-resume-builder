"use client";
import Image from "next/image";
import Link from "next/link";
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

const UserBtn = ({ lng }) => {
  const { user, setUser } = useAuth();
  const { t } = useTranslation(lng, "common");
  const [open, setOpen] = useState(false);
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

  !user ? (
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
              src={user.picture || "/avatar.svg"}
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
          <DropdownMenuItem onClick={handleLogout} className="text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserBtn;
