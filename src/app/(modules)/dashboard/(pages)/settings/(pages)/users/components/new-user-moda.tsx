import { useToast } from "@/app/(modules)/(shared)/providers/toast-provider/toast-provider";
import { newUserSchema } from "@/features/user/domain/schemas/new-user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import newUser from "../actions/create-new-user.action";
import { RoleWithUsersPermissionsCountDto } from "@/features/role/domain/dtos/roleWithUsersPermissionsCount.dto";
import { MultiSelect } from "primereact/multiselect";
import { FloatLabel } from "primereact/floatlabel";
import { get } from "http";

export default function NewUserModal({
  onHide,
  visible,
  setVisible,
  roles,
}: {
  onHide: () => void;
  visible: boolean;
  roles: RoleWithUsersPermissionsCountDto[];
  setVisible: (visible: boolean) => void;
}) {
  const [state, setState] = useState<{
    isCreatingUser: boolean;
    selectedRoles: RoleWithUsersPermissionsCountDto[];
  }>({
    isCreatingUser: false,
    selectedRoles: [],
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
      email: "",
      password: "",
      name: "",
      userRoles: [],
    },
    resolver: zodResolver(newUserSchema),
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
        onClick={(e) => {
          e.preventDefault();
          createNewUser();
        }}
        className="p-button p-button-primary"
        disabled={!isValid || state.isCreatingUser}
      >
        Guardar
      </Button>
    </div>
  );

  const createNewUser = async () => {
    setState({ ...state, isCreatingUser: true });
    let response = await newUser({
      ...getValues(),
      userRoles:
        state.selectedRoles.map((role) => {
          return role.id;
        }) ?? [],
    });

    response = JSON.parse(response);

    handleActionResponse(response);

    if (response) {
      setVisible(false);
    }

    setState({ ...state, isCreatingUser: false });
  };

  return (
    <Dialog footer={modalFooter} header="Nuevo Usuario" className="p-0 w-full min-w-[300px] max-w-[600px]" visible={visible} onHide={onHide}>
      <form className="flex w-full flex-col gap-y-8">
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
                      placeholder="Nombre de el usuario"
                    />
                    <label htmlFor={field.name}>Nombre del usuario</label>
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
          name="email"
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
                      placeholder="Correo electrónico"
                    />
                    <label htmlFor={field.name}>Correo electrónico</label>
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
                      placeholder="Contraseña"
                    />
                    <label htmlFor={field.name}>Contraseña</label>
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
          name="userRoles"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <div>
                <FloatLabel>
                  <MultiSelect
                    value={roles.filter((role) => field.value.includes(role.id as never))}
                    onChange={(e) => {
                      const idsList = e.value.map((role: any) => role.id);
                      field.onChange(idsList);
                      setState((actualState) => ({
                        isCreatingUser: actualState.isCreatingUser,
                        selectedRoles: e.value,
                      }));
                    }}
                    options={roles}
                    name={field.name}
                    optionLabel="name"
                    placeholder="Seleccionar roles"
                    maxSelectedLabels={3}
                    className={classNames("w-full md:w-20rem", {
                      "p-invalid": fieldState.invalid,
                    })}
                  />
                  <label>Roles</label>
                </FloatLabel>
                <small id={`${field.name}-help`} className="p-error p-d-block">
                  {fieldState.error?.message}
                </small>
              </div>
            );
          }}
        ></Controller>
      </form>
    </Dialog>
  );
}
