import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { Controller, useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { InputTextarea } from "primereact/inputtextarea";
import * as z from "zod";
import { useToast } from "@/app/(modules)/(shared)/providers/toast-provider/toast-provider";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { newRoleSchema } from "../schemas/new-role-schema";
import newRole from "../actions/newRole";

export type NewRoleModalProps = {
  visible: boolean;
  onHide: () => void;
  setVisible: (visible: boolean) => void;
};

export default function NewRoleModal({ onHide, visible, setVisible }: NewRoleModalProps) {
  const [state, setState] = useState({
    isCreatingRole: false,
  });

  const {
    control,
    getValues,
    formState: { isValid },
    handleSubmit,
    trigger,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: zodResolver(newRoleSchema),
  });

  const { handleActionResponse } = useToast();

  useEffect(() => {
    trigger();
  }, [trigger]);

  const modalFooter = (
    <div className="flex justify-end gap-4">
      <Button
        onClick={() => {
          setVisible(false);
        }}
        className="p-button p-button-text"
      >
        Cancelar
      </Button>
      <Button
        type="submit"
        onClick={handleSubmit(() => {
          createNewRole(getValues());
        })}
        className="p-button p-button-primary"
        disabled={!isValid || state.isCreatingRole}
      >
        Guardar
      </Button>
    </div>
  );

  const createNewRole = async (payload: z.infer<typeof newRoleSchema>) => {
    setState({ ...state, isCreatingRole: true });
    const response = await newRole(payload);

    handleActionResponse(response);

    if (response?.success) {
      setVisible(false);
    }

    setState({ ...state, isCreatingRole: false });
  };

  return (
    <Dialog footer={modalFooter} header="Nuevo Rol" className="p-0 w-full min-w-[300px] max-w-[600px]" visible={visible} onHide={onHide}>
      <form onSubmit={handleSubmit(createNewRole)} className="flex w-full flex-col gap-y-8">
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
                      placeholder="Nombre de el rol"
                    />
                    <label htmlFor={field.name}>Nombre del rol</label>
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
}
