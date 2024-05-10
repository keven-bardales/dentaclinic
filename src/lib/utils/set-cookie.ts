"use server";

import { cookies } from "next/headers";

import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const setCookie = (options: { cookie: string; path: string; value: string }) => {
  cookies().set({
    name: options.cookie,
    path: options.path,
    value: options.value,
  });
};

export const getCookie = async (cookie: string) => {
  const foundCookie = cookies().get(cookie);

  return new Promise<RequestCookie | undefined>((resolve) => {
    resolve(foundCookie);
  });
};

export const deleteCookie = (cookie: string) => {
  cookies().delete(cookie);
};
