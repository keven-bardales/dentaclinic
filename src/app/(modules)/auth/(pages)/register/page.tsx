"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useEffect, useState } from "react";
import PassWordToolTip from "../../(components)/password-tooltip";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUserSchema } from "../../(schemas)/register-user.schema";
import { classNames } from "primereact/utils";
import { registerUser } from "../../(actions)/register";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/(modules)/(shared)/providers/toast-provider/toast-provider";
import * as z from "zod";

export default function RegisterPage() {
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
    <main className="flex items-center justify-center w-full h-screen max-h-screen px-3 sm:px-5">
      <div className="overflow-auto w-full flex justify-center h-[90%]">
        <div className="p-4 shadow-2xl bg-surface-card rounded-lg min-w-[250px] max-w-[550px] h-full w-full flex flex-col gap-y-8 overflow-auto">
          <div className="text-center gap-y-3 w-full flex flex-col justify-center items-center">
            <Image
              alt="register-logo"
              className="w-12 h-12"
              width={500}
              height={500}
              src={"https://blocks.primereact.org/demo/images/blocks/logos/hyper.svg"}
            ></Image>

            <div className="text-4xl font-bold">Registro</div>
            <div>
              <span className="font-medium line-height-3">¿Ya tienes una cuenta?</span>
              <Link href={"/auth/sign-in"} className="font-medium ml-2 text-blue-500 cursor-pointer">
                Inicia sesión
              </Link>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-8 mx-auto w-full">
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <div>
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-envelope"></i>
                    </span>
                    <span className="p-float-label">
                      <InputText
                        id={field.name}
                        name={field.name}
                        placeholder="Correo electrónico"
                        value={field.value}
                        className={classNames({ "p-invalid": fieldState.invalid })}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                      />
                      <label className={classNames({ "p-error": fieldState?.invalid })} htmlFor={field.name}>
                        Correo electrónico
                      </label>
                    </span>
                  </div>
                  <small id={`${field.name}-help`} className="p-error p-d-block">
                    {fieldState.error?.message}
                  </small>
                </div>
              )}
            />

            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <div>
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-user"></i>
                    </span>
                    <span className="p-float-label">
                      <InputText
                        id={field.name}
                        name={field.name}
                        placeholder="Nombre"
                        value={field.value}
                        className={classNames({ "p-invalid": fieldState.invalid })}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                      />

                      <label htmlFor={field.name}>Nombre</label>
                    </span>
                  </div>
                  <small id={`${field.name}-help`} className="p-error p-d-block">
                    {fieldState.error?.message}
                  </small>
                </div>
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <div>
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-lock"></i>
                    </span>
                    <span className="p-float-label">
                      <Password
                        footer={PassWordToolTip}
                        toggleMask
                        value={field.value}
                        inputId={field.name}
                        placeholder="Contraseña"
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                        className={classNames({ "p-invalid": fieldState.invalid })}
                      />
                      <label htmlFor={field.name}>Contraseña</label>
                    </span>
                  </div>
                  <small id={`${field.name}-help`} className="p-error p-d-block">
                    {fieldState.error?.message}
                  </small>
                </div>
              )}
            />

            <div className="flex items-center justify-between">
              <Controller
                name="rememberme"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center gap-x-2">
                    <Checkbox
                      checked={field.value}
                      inputRef={field.ref}
                      inputId={field.name}
                      onChange={(e) => {
                        field.onChange(e.checked);
                      }}
                    />

                    <label htmlFor={field.name}>
                      <span>Recuérdame</span>
                    </label>
                  </div>
                )}
              />
            </div>

            <Button
              loading={state.loadingRegister}
              loadingIcon={<i className="pi pi-spin pi-spinner"></i>}
              disabled={!isValid}
              type="submit"
              label="Registrarse"
              icon="pi pi-check"
              className="w-full"
            />
          </form>
        </div>
      </div>
    </main>
  );
}
