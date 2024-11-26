"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { useMotionValueEvent, useScroll } from "framer-motion";

type Props = {
  logo: any;
};

export const MobileNavbar = ({ logo }: Props) => {
  const { scrollY } = useScroll();

  const [showBackground, setShowBackground] = useState(false);

  useMotionValueEvent(scrollY, "change", (value) => {
    if (value > 100) {
      setShowBackground(true);
    } else {
      setShowBackground(false);
    }
  });

  return (
    <div
      className={cn(
        "flex justify-between bg-transparent items-center w-full rounded-md px-2.5 py-1.5 transition duration-200",
        showBackground &&
        " bg-neutral-900  shadow-[0px_-2px_0px_0px_var(--neutral-800),0px_2px_0px_0px_var(--neutral-800)]"
      )}
    >
      <Logo image={logo?.image} />
    </div>
  );
};
