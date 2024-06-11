"use client";

import { cn } from "@/lib/utils/cn";

interface LandingButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export default function LandingButton(props: LandingButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "bg-landing-primary-main text-landing-button-text-primary font-bold capitalize rounded-lg px-5 py-1 hover:bg-transparent hover:text-landing-button-text-primary-hover hover:border-landing-primary-main border-2 transition-all duration-300",
        props.className ? props.className : ""
      )}
    >
      {props.children}
    </button>
  );
}
