"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useEffect, useState } from "react";
import PassWordToolTip from "../../(components)/password-tooltip";
import { login } from "../../(actions)/login";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUserSchema } from "../../(schemas)/login-user.schema";
import { useToast } from "@/app/(modules)/(shared)/providers/toast-provider/toast-provider";
import { classNames } from "primereact/utils";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useDashboardStore } from "@/app/(modules)/dashboard/(stores)/dashboard-store";

export default function SignInPage() {
  const [state, setState] = useState({
    loadingLogin: false,
    isClient: false,
  });

  useEffect(() => {
    setState({ ...state, isClient: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { handleErrorsList, showToast } = useToast();
  const router = useRouter();

  const isLogginRememberme = useDashboardStore((state) => state.isLogginRememberme);

  const {
    control,
    formState: { isValid },
    handleSubmit,
    trigger,
    getValues,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      loginCredential: "",
      password: "",
      rememberme: false,
    },
    resolver: zodResolver(loginUserSchema),
  });

  useEffect(() => {
    trigger();
  }, [trigger]);

  const handleSignIn = async () => {
    setState({ ...state, loadingLogin: true });
    const response = await login(getValues());

    if (response?.errors) {
      handleErrorsList(response.errors);
    }

    if (response?.success) {
      showToast({
        severity: "success",
        detail: response.message,
        life: 3000,
      });
      router.push("/dashboard");
    }

    setState({ ...state, loadingLogin: false });
  };

  if (isLogginRememberme) return null;
  if (!state.isClient) return null;

  return (
    <main className="flex items-center justify-center w-full h-screen max-h-screen px-3 sm:px-5">
      <div className="overflow-auto w-full h-[80%] max-h-[800px] flex justify-center">
        <div className="p-4 shadow-2xl bg-surface-card rounded-lg min-w-[250px] max-w-[550px] h-full w-full flex flex-col gap-y-8 overflow-auto">
          <div className="text-center gap-y-3 w-full flex flex-col justify-center items-center">
            <Image
              alt="login-logo"
              className="w-12 h-12"
              width={500}
              height={500}
              src={"https://blocks.primereact.org/demo/images/blocks/logos/hyper.svg"}
            ></Image>

            <div className="text-4xl font-bold">Bienvenido de vuelta</div>
            <div>
              <span className="font-medium line-height-3">Aun no tienes una cuenta?</span>
              <Link href={"/auth/register"} className="font-medium ml-2 text-blue-500 cursor-pointer">
                Registrate ahora
              </Link>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignIn();
            }}
            className="flex flex-col gap-y-8 mx-auto w-full"
          >
            <Controller
              name="loginCredential"
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <div>
                    <div className="p-inputgroup">
                      <span className="p-inputgroup-addon">
                        <i className="pi pi-user"></i>
                      </span>
                      <span className="p-float-label">
                        <InputText
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          id={field.name}
                          placeholder="Email o nombre de usuario"
                        />
                        <label htmlFor={field.name}>Email o nombre de usuario</label>
                      </span>
                    </div>
                    <small id={`${field.name}-help`} className="p-error p-d-block">
                      {fieldState.error?.message}
                    </small>
                  </div>
                );
              }}
            />

            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <div>
                    <div className="p-inputgroup">
                      <span className="p-inputgroup-addon">
                        <i className="pi pi-lock"></i>
                      </span>
                      <span className="p-float-label">
                        <InputText
                          type="password"
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          id={field.name}
                          placeholder="Email o nombre de usuario"
                        />
                        <label htmlFor={field.name}>Email o nombre de usuario</label>
                      </span>
                    </div>
                    <small id={`${field.name}-help`} className="p-error p-d-block">
                      {fieldState.error?.message}
                    </small>
                  </div>
                );
              }}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <Controller
                  name="rememberme"
                  control={control}
                  render={({ field }) => <Checkbox id="rememberme" onChange={(e) => field.onChange(e.checked as boolean)} checked={field.value} />}
                />
                <label htmlFor="rememberme">
                  <span>Recuerdame</span>
                </label>
              </div>
              <Link href={"/auth/forgot-password"} className="font-medium text-blue-500 text-right cursor-pointer">
                Olvidaste tu contraseña?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={!isValid}
              loading={state.loadingLogin}
              loadingIcon={<i className="pi pi-spin pi-spinner"></i>}
              label="Iniciar sesión"
              icon="pi pi-user"
              className="w-full"
            />
          </form>
        </div>
      </div>
    </main>
  );
}
