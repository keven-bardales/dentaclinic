"use client";

import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { useState } from "react";

interface NavBarItemProps {
  children: React.ReactNode;
  href: string;
}
export function NavBarItem({ children, href }: NavBarItemProps) {
  const [isSelectedItem, setIsSelectedItem] = useState(href == "/home" ? true : false);

  return (
    <Link
      className={cn(
        "text-landing-secondary-main font-bold text-lg px-2 py-2 hover:bg-landing-primary-main hover:text-landing-nav-item-text rounded-lg transition-all duration-300",
        isSelectedItem ? "bg-landing-primary-main text-landing-nav-item-text" : "text-landing-secondary-main"
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
