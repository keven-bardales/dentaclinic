"use client";

import { cn } from "@/lib/utils/cn";
import { useRouter } from "next/navigation";

export default function BasicPageWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     router.refresh();
  //   }, 15000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [router]);

  return (
    <section
      className={cn("w-full h-full p-4 flex-col", {
        [className as string]: !!className,
      })}
    >
      {children}
    </section>
  );
}
