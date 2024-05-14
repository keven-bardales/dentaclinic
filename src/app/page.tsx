"use client";
import Image from "next/image";
import InscriptionForm from "./components/inscription-form";
import { Button } from "primereact/button";
import { useEffect, useRef, useState } from "react";
import { registerUser } from "./(modules)/auth/(actions)/register";
import { registerUserSchema } from "./(modules)/auth/(schemas)/register-user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "./(modules)/(shared)/providers/toast-provider/toast-provider";
import * as z from "zod";
import Marquee from "react-fast-marquee";
import { COMPANIES } from "@/lib/constants/companies";
import { cn } from "@/lib/utils/cn";

export default function Home() {
  const [state, setState] = useState({
    loadingRegister: false,
  });

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { handleActionResponse } = useToast();

  const router = useRouter();

  const {
    control,
    formState: { isValid },
    handleSubmit,
    trigger,
    reset,
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

    console.log(result);

    handleActionResponse(result);

    if (result.success) {
      reset();
    }

    setState({ ...state, loadingRegister: false });
  };

  return (
    <main className="h-screen flex items-center bg-black">
      <section className="flex mx-auto items-center h-full w-full justify-center shadow-2xl flex-wrap overflow-auto p-5 gap-y-5 bg-gradient-to-t from-[#080808] to-[#2c2c2c]">
        {/* <div className="grow relative hidden md:flex bg-transparent shrink-0 h-full flex-col justify-center items-center overflow-hidden">
          <video
            ref={videoRef}
            style={{ opacity: 0.4 }}
            className="absolute z-[200] h-full w-full object-cover"
            loop
            autoPlay={true}
            muted
            src="/videos/portada.mp4"
          ></video>
          <div className="absolute z-[300] flex flex-col gap-y-8">
            <div className="w-full flex flex-col">
              <h1 className="font-bold text-3xl xl:text-5xl text-white text-center w-full">Construyendo oportunidades</h1>
            </div>

          </div>
        </div> */}
        <InscriptionForm className="max-w-[450px] md:max-w-[650px] 2xl:max-w-[30%] overflow-auto" />

        <div className="w-full">
          <Marquee autoFill pauseOnClick pauseOnHover>
            {COMPANIES.map((company) => {
              return (
                <div key={company.id}>
                  <Image
                    className={cn("w-36 px-5", {
                      [company?.className as string]: company?.className,
                    })}
                    src={company.logo}
                    alt={company.name}
                  />
                </div>
              );
            })}
          </Marquee>
        </div>
      </section>
    </main>
  );
}
