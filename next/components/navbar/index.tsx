"use client";
import { DesktopNavbar } from "./desktop-navbar";
import { MobileNavbar } from "./mobile-navbar";
import { motion } from "framer-motion";

export function Navbar({ data }: { data: any }) {
  return (
    <motion.nav className="max-w-7xl  fixed top-4  mx-auto inset-x-0 z-50 w-[95%] lg:w-full">
      <div className="hidden lg:block w-full">
        <DesktopNavbar logo={data?.logo} />
      </div>
      <div className="flex h-full w-full items-center lg:hidden ">
        <MobileNavbar logo={data?.logo} />
      </div>
    </motion.nav>
  );
}
