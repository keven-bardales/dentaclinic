import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { Controller, useForm } from "react-hook-form";
import { newModuleSchema } from "../(schemas)/new-module-schema";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { InputTextarea } from "primereact/inputtextarea";
import * as z from "zod";
import newModule from "../(actions)/new-module-action";
import { useToast } from "@/app/(modules)/(shared)/providers/toast-provider/toast-provider";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";

export type NewModuleModalProps = {
  visible: boolean;
  onHide: () => void;
  setVisible: (visible: boolean) => void;
};

export default function NewModuleModal({ onHide, visible, setVisible }: NewModuleModalProps) {
  const [state, setState] = useState({
    isCreatingModule: false,
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
    resolver: zodResolver(newModuleSchema),
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
          createNewModule(getValues());
        })}
        className="p-button p-button-primary"
        disabled={!isValid || state.isCreatingModule}
      >
        Guardar
      </Button>
    </div>
  );

  const createNewModule = async (payload: z.infer<typeof newModuleSchema>) => {
    setState({ ...state, isCreatingModule: true });
    const response = await newModule(payload);

    const deserializeResponse = JSON.parse(response);

    handleActionResponse(deserializeResponse);

    if (deserializeResponse?.success) {
      setVisible(false);
    }

    setState({ ...state, isCreatingModule: false });
  };

  return (
    <Dialog footer={modalFooter} header="Nuevo Modulo" className="p-0 w-[90%] min-w-[300px] max-w-[600px]" visible={visible} onHide={onHide}>
      <form onSubmit={handleSubmit(createNewModule)} className="flex w-full flex-col gap-y-8">
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
                      placeholder="Nombre del modulo"
                    />
                    <label htmlFor={field.name}>Nombre del modulo</label>
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
