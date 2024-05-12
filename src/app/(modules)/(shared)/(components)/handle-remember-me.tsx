"use client";
import { deleteCookie, getCookie } from "@/lib/utils/set-cookie";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { getCurrentUserSession } from "../(actions)/current-user";
import { useDashboardStore } from "../../dashboard/(stores)/dashboard-store";

export default function RememberMe() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setisLogginRememberme = useDashboardStore((state) => state.setisLogginRememberme);
  const handleRememberMe = async () => {
    const rememberMeCookie = await getCookie("rememberme");

    const session = await getCurrentUserSession();

    if (!session && rememberMeCookie) {
      setisLogginRememberme(true);

      const response = await signIn("credentials", {
        redirect: false,
        loginCredential: "",
        password: "",
        rememberme: true,
        rememberMeToken: rememberMeCookie.value,
      });

      const path = searchParams.get("pathname") || "/dashboard";

      if (response?.error == null) {
        router.push(path);
      } else {
        deleteCookie("rememberme");
        router.push("/auth/sign-in");
      }

      setisLogginRememberme(false);
    }
  };

  useEffect(() => {
    handleRememberMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
