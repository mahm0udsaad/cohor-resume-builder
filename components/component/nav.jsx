"use client";
import { User } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

export default function Nav() {
  return (
    <nav className="bg-[#3b51a3] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Image priority src={"/cogor-logo.svg"} width={100} height={120} />
          </div>
          <div className="flex items-center">
            <Button
              variant="outline"
              className=" border-white hover:bg-[#3B51A3] hover:text-black"
            >
              <User className="h-4 w-4 mr-2" /> Sign In
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
