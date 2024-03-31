import { BaseModalComponent } from "@/app/(modules)/(shared)/components/base-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Module } from "@prisma/client";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { newModulePermissionSchema } from "../(schemas)/module-permission-schema";
import * as z from "zod";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { InputTextarea } from "primereact/inputtextarea";

export const CreateModuleDialog: BaseModalComponent<
  {
    id: string;
    module: Module;
  },
  {
    id: string;
    module: Module;
  }
> = ({ data, onClose }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      moduleId: data?.module?.id as number,
      name: "",
      description: "",
    },
    resolver: zodResolver(newModulePermissionSchema),
  });

  const createNewModulePermission = async (data: z.infer<typeof newModulePermissionSchema>) => {};

  return (
    <form onSubmit={handleSubmit(createNewModulePermission)} className="flex w-full flex-col gap-y-8">
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => {
          return (
            <div>
              <div className="p-inputgroup">
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
                    placeholder="Nombre del permiso"
                  />
                  <label htmlFor={field.name}>Nombre del permiso</label>
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
                <span className="p-float-label">
                  <InputTextarea
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    className={classNames({
                      "p-invalid": fieldState.invalid,
                    })}
                    id={field.name}
                    placeholder="Descripción"
                  />
                  <label htmlFor={field.name}>Descripción</label>
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
};
