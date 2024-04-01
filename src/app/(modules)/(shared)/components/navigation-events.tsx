/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const router = useRouter();

  useEffect(() => {
    console.log("pathname", pathname);

    router.refresh();
  }, [pathname]);

  return null;
}
