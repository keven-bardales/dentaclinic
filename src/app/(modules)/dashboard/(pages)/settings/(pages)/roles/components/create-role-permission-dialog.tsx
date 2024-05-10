import { BaseModalComponent } from "@/app/(modules)/(shared)/(components)/base-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";
import { useToast } from "@/app/(modules)/(shared)/providers/toast-provider/toast-provider";
import { createRolePermissionsSchema } from "../schemas/new-role-permission-schema";
import { createRolePermission } from "../actions/createRolePermission";

export const CreateRolePermissionDialog: BaseModalComponent<
  {
    id: number;
    role: any;
  },
  {
    id: number;
    role: any;
  }
> = ({ data, onHide, setVisible, visible, primeReactDialogProps }) => {
  const { handleActionResponse } = useToast();

  const [state, setState] = React.useState({
    isCreatingRolePermission: false,
  });

  const {
    reset,
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      rolPermissionId: 0,
      name: "",
      description: "",
    },
    resolver: zodResolver(createRolePermissionsSchema),
  });

  useEffect(() => {
    trigger();
  }, [trigger]);

  const createNewModulePermission = async (data: z.infer<typeof createRolePermissionsSchema>) => {
    setState({
      ...state,
      isCreatingRolePermission: true,
    });
    const response = await createRolePermission(data);

    handleActionResponse(response);

    if (response.success) {
      setVisible(false);
      reset();
    }
  };

  const footer = (
    <div className="flex justify-end gap-4">
      <button
        onClick={() => {
          setVisible(false);
        }}
        className="p-button p-button-text"
      >
        Cancelar
      </button>
      <button type="submit" onClick={handleSubmit(createRolePermission)} className="p-button p-button-primary">
        Crear
      </button>
    </div>
  );

  return (
    <Dialog
      {...primeReactDialogProps}
      header={`Asignar permiso a rol ${data?.role?.name}`}
      footer={footer}
      visible={visible}
      onHide={() => {
        setVisible(false);
        onHide();
        reset();
      }}
    >
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
    </Dialog>
  );
};
