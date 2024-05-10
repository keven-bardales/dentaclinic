import { BaseModalComponent } from "@/app/(modules)/(shared)/(components)/base-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { newModulePermissionSchema } from "../(schemas)/module-permission-schema";
import * as z from "zod";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";
import { createModulePermission } from "../(actions)/create-module-permission";
import { useToast } from "@/app/(modules)/(shared)/providers/toast-provider/toast-provider";
import { ModuleWithPermissionsDto } from "@/features/module/domain/dtos/modules-with-permissions-dto";

export const CreateModuleDialog: BaseModalComponent<
  {
    id: number;
    module: ModuleWithPermissionsDto;
  },
  {
    id: number;
    module: ModuleWithPermissionsDto;
  }
> = ({ data, onHide, setVisible, visible, primeReactDialogProps }) => {
  const { handleActionResponse } = useToast();

  const [state, setState] = React.useState({
    isCreatingModulePermission: false,
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
      moduleId: data?.module?.id as number,
      name: "",
      description: "",
    },
    resolver: zodResolver(newModulePermissionSchema),
  });

  useEffect(() => {
    trigger();
  }, [trigger]);

  const createNewModulePermission = async (data: z.infer<typeof newModulePermissionSchema>) => {
    setState({
      ...state,
      isCreatingModulePermission: true,
    });
    const response = await createModulePermission(data);

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
      <button type="submit" onClick={handleSubmit(createNewModulePermission)} className="p-button p-button-primary">
        Crear
      </button>
    </div>
  );

  return (
    <Dialog
      {...primeReactDialogProps}
      header={`Crear permiso para modulo ${data?.module?.name}`}
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
