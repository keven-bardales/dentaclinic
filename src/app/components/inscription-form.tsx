"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, Form, useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../(modules)/(shared)/providers/toast-provider/toast-provider";
import { FormEvent, useEffect, useState } from "react";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { cn } from "@/lib/utils/cn";
import logoGrupo from "@/root/public/logos/logo_grupo_platino_gray.png";
import logoExpo from "@/root/public/logos/logo_expoconstruye_2024.webp";
import Image from "next/image";
import { Button } from "primereact/button";
import newInscriptionAction from "../actions/new-inscription-action";
import { inscriptionSchema } from "../schemas/new-inscription-schema";
import { tree } from "next/dist/build/templates/app-page";

export default function InscriptionForm({ className }: { className: string }) {
  const [state, setState] = useState({
    submitting: false,
  });
  const { handleActionResponse } = useToast();

  const {
    control,
    getValues,
    reset,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      city: "",
      description: "",
      registeredBy: "",
      phone: "",
      product: "",
      brand: "",
    },
    resolver: zodResolver(inscriptionSchema),
  });

  const onSubmit = async (formValues: z.infer<typeof inscriptionSchema>) => {
    setState({ ...state, submitting: true });
    const response = await newInscriptionAction(formValues);
    handleActionResponse(response);

    if (response.success == true) {
      reset();
    } else {
    }

    setState({ ...state, submitting: false });
  };

  return (
    <div
      className={cn("flex flex-col items-center w-full gap-y-5", {
        [className]: className,
      })}
    >
      <div className="flex flex-wrap gap-y-4 gap-x-4 items-center justify-center">
        <Image src={logoGrupo} className="w-52" alt="Logo Grupo Platino" />
        <Image src={logoExpo} className="w-56" alt="Logo Expo construye" />
      </div>

      <div className="w-full text-center">
        <h2 className="font-extrabold text-white text-3xl xl:text-3xl w-full">Registrate con nosotros</h2>
      </div>

      <form
        onSubmit={handleSubmit((values) => {
          onSubmit(values);
        })}
        className={cn("grid md:grid-cols-2 gap-x-4 gap-y-7 w-full max-w-[450px] md:max-w-[650px]")}
      >
        <Controller
          name="fullName"
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
                      id={field.name}
                      name={field.name}
                      placeholder="Nombre completo"
                      value={field.value}
                      className={classNames({ "p-invalid": fieldState.invalid })}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                    <label className={classNames({ "p-error": fieldState?.invalid })} htmlFor={field.name}>
                      Nombre completo
                    </label>
                  </span>
                </div>
                <small id={`${field.name}-help`} className="p-error p-d-block">
                  {fieldState.error?.message}
                </small>
              </div>
            );
          }}
        ></Controller>
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => {
            return (
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
            );
          }}
        />

        <Controller
          name="company"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <div>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-building"></i>
                  </span>
                  <span className="p-float-label">
                    <InputText
                      id={field.name}
                      name={field.name}
                      placeholder="Empresa"
                      value={field.value}
                      className={classNames({ "p-invalid": fieldState.invalid })}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                    <label className={classNames({ "p-error": fieldState?.invalid })} htmlFor={field.name}>
                      Empresa
                    </label>
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
          name="city"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <div>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-map-marker"></i>
                  </span>
                  <span className="p-float-label">
                    <InputText
                      id={field.name}
                      name={field.name}
                      placeholder="Ciudad"
                      value={field.value}
                      className={classNames({ "p-invalid": fieldState.invalid })}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                    <label className={classNames({ "p-error": fieldState?.invalid })} htmlFor={field.name}>
                      Ciudad
                    </label>
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
          name="description"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <div>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-inbox"></i>
                  </span>
                  <span className="p-float-label">
                    <InputText
                      id={field.name}
                      name={field.name}
                      placeholder="Comentarios"
                      value={field.value}
                      className={classNames({ "p-invalid": fieldState.invalid })}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                    <label className={classNames({ "p-error": fieldState?.invalid })} htmlFor={field.name}>
                      Descripción
                    </label>
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
          name="phone"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <div>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-phone"></i>
                  </span>
                  <span className="p-float-label">
                    <InputText
                      id={field.name}
                      name={field.name}
                      placeholder="Teléfono"
                      value={field.value}
                      className={classNames({ "p-invalid": fieldState.invalid })}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                    <label className={classNames({ "p-error": fieldState?.invalid })} htmlFor={field.name}>
                      Teléfono
                    </label>
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
          name="product"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <div>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-shopping-bag"></i>
                  </span>
                  <span className="p-float-label">
                    <InputText
                      id={field.name}
                      name={field.name}
                      placeholder="Producto"
                      value={field.value}
                      className={classNames({ "p-invalid": fieldState.invalid })}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                    <label className={classNames({ "p-error": fieldState?.invalid })} htmlFor={field.name}>
                      Producto
                    </label>
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
          name="brand"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <div>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-shopping-cart"></i>
                  </span>
                  <span className="p-float-label">
                    <InputText
                      id={field.name}
                      name={field.name}
                      placeholder="Marca"
                      value={field.value}
                      className={classNames({ "p-invalid": fieldState.invalid })}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                    <label className={classNames({ "p-error": fieldState?.invalid })} htmlFor={field.name}>
                      Marca
                    </label>
                  </span>
                </div>
                <small id={`${field.name}-help`} className="p-error p-d-block">
                  {fieldState.error?.message}
                </small>
              </div>
            );
          }}
        />

        <div className="w-full flex justify-center col-span-full">
          <Button disabled={state.submitting} className="flex max-w-[200px] lg:max-w-[300px] w-full justify-center bg-[#F6AA1C] text-white">
            <span>Enviar</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
