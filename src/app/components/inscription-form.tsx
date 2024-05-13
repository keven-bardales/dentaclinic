"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, Form, useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../(modules)/(shared)/providers/toast-provider/toast-provider";
import { useEffect, useState } from "react";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { cn } from "@/lib/utils/cn";

const phoneRegex = /^(?:\+?(?:503|504)\-?)?(?:\d{4}\-?){2}\d{4}$/;

const inscriptionSchema = z.object({
  fullName: z
    .string({
      invalid_type_error: "El nombre debe ser un texto",
      required_error: "El nombre es requerido",
    })
    .min(1, "El nombre es requerido")
    .max(255, "El nombre no puede tener más de 255 caracteres"),
  email: z
    .string({
      invalid_type_error: "El email debe ser un texto",
      required_error: "El email es requerido",
    })
    .email({
      message: "El email no es válido",
    }),
  company: z
    .string({
      invalid_type_error: "La empresa debe ser un texto",
      required_error: "La empresa es requerida",
    })
    .min(1, "La empresa es requerida")
    .max(255, "La empresa no puede tener más de 255 caracteres"),
  city: z
    .string({
      invalid_type_error: "La ciudad debe ser un texto",
      required_error: "La ciudad es requerida",
    })
    .min(1, "La ciudad es requerida")
    .max(255, "La nombre no puede tener más de 255 caracteres"),
  description: z
    .string({
      invalid_type_error: "La descripción debe ser un texto",
      required_error: "La descripción es requerida",
    })
    .min(1, "La descripción es requerido")
    .max(255, "La descripción no puede tener más de 255 caracteres"),
  registeredBy: z.string().uuid().optional(),
  phone: z
    .string()
    .regex(phoneRegex, "El número de teléfono no es válido debe ej: 503-1234-5678")
    .min(1, "El nombre es requerido")
    .max(15, "El nombre no puede tener más de 255 caracteres"),
});

export default function InscriptionForm({ className }: { className: string }) {
  const [state, setState] = useState({
    submitting: false,
  });
  const { handleActionResponse } = useToast();

  const {
    control,
    getValues,
    trigger,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      city: "",
      description: "",
      registeredBy: "",
      phone: "",
    },
    resolver: zodResolver(inscriptionSchema),
  });

  useEffect(() => {
    trigger();
  }, [trigger]);

  const onSubmit = async () => {
    const values = getValues();
  };

  return (
    <form
      onSubmit={onSubmit}
      className={cn("flex flex-col gap-y-5 w-full py-10", {
        [className]: className,
      })}
    >
      <Controller
        name="fullName"
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
                  <i className="pi pi-envelope"></i>
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
                  <i className="pi pi-envelope"></i>
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
                  <i className="pi pi-envelope"></i>
                </span>
                <span className="p-float-label">
                  <InputText
                    id={field.name}
                    name={field.name}
                    placeholder="Descripción"
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
                  <i className="pi pi-envelope"></i>
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
    </form>
  );
}
