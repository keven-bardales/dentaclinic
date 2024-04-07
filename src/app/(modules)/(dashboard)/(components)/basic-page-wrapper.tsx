"use client";

import { cn } from "@/lib/utils/cn";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function BasicPageWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh();
    }, 15000);

    return () => {
      clearInterval(interval);
    };
  }, [router]);

  return (
    <section
      className={cn("grow w-full px-5 flex-col", {
        className: !!className,
      })}
    >
      {children}
    </section>
  );
}
