"use client";
import Image from "next/image";
import InscriptionForm from "./components/inscription-form";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { registerUser } from "./(modules)/auth/(actions)/register";
import { registerUserSchema } from "./(modules)/auth/(schemas)/register-user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "./(modules)/(shared)/providers/toast-provider/toast-provider";
import * as z from "zod";

export default function Home() {
  const [state, setState] = useState({
    loadingRegister: false,
  });

  const { handleActionResponse } = useToast();

  const router = useRouter();

  const {
    control,
    formState: { isValid },
    handleSubmit,
    trigger,
  } = useForm({
    resolver: zodResolver(registerUserSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      name: "",
      rememberme: false,
    },
  });

  useEffect(() => {
    trigger();
  }, [trigger]);

  const onSubmit = async (values: z.infer<typeof registerUserSchema>) => {
    setState({ ...state, loadingRegister: true });
    const response = await registerUser(values);

    const result = JSON.parse(response);

    handleActionResponse(result);

    if (result.success) {
      router.push("/auth/sign-in");
    }

    setState({ ...state, loadingRegister: false });
  };

  return (
    <main className="h-screen flex items-center">
      <section className="flex gap-5 p-5 w-[90%] h-[90%] mx-auto items-center rounded-3xl shadow-2xl">
        <div className="grow"></div>
        <InscriptionForm className="max-w-[350px]" />
      </section>
    </main>
  );
}
