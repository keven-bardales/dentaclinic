"use client";

import TextInput from "@/app/(modules)/dashboard/(components)/text-input";
import { createCategorySchema } from "@/features/category/domain/schemas/create-category-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Controller, useForm } from "react-hook-form";
import { createCategoryAction } from "../actions/create-category-action";
import { useToast } from "@/app/(modules)/(shared)/providers/toast-provider/toast-provider";
import { ProductCategoryEntity } from "@/features/category/domain/entity/product-category.entity";
import { useEffect } from "react";

export default function NewCategoryModal({
  isVisible,
  onClose,
  parentCategory,
}: {
  isVisible: boolean;
  onClose: () => void;
  parentCategory: ProductCategoryEntity | null;
}) {
  const header = (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="text-2xl">Nueva{parentCategory ? ` subcategoria para ${parentCategory?.name}` : " categoria"} </div>
    </div>
  );

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      categoryName: "",
      parentId: parentCategory?.id ?? null,
      categoryLevel: 1,
    },
    resolver: zodResolver(createCategorySchema),
  });

  const { control, register, handleSubmit, trigger, reset, formState, getValues } = form;

  useEffect(() => {
    reset({
      categoryName: "",
      parentId: parentCategory?.id ?? null,
      categoryLevel: 1,
    });
  }, [parentCategory, reset]);

  const { isValid, isSubmitting } = formState;

  const { handleActionResponse } = useToast();

  return (
    <Dialog className="w-[90%] max-w-[400px]" header={header} onHide={onClose} visible={isVisible}>
      <Controller
        render={({ field, fieldState, formState }) => {
          return (
            <>
              <TextInput
                onChange={(e) => {
                  field.onChange(e);
                }}
                invalid={!!fieldState.error?.message}
                error={fieldState.error?.message}
                label={parentCategory ? `Nombre de la subcategoria` : "Nombre de la categoria"}
                name={field.name}
              />
            </>
          );
        }}
        control={control}
        name="categoryName"
      ></Controller>
      <div className="flex justify-end gap-2 mt-4">
        <Button
          severity="danger"
          label="Cancelar"
          className="p-button p-button-secondary"
          onClick={() => {
            reset();
            onClose();
          }}
        ></Button>
        <Button
          loading={isSubmitting}
          disabled={!isValid}
          loadingIcon="pi pi-spin pi-spinner"
          label="Guardar"
          className="p-button p-button-primary"
          onClick={handleSubmit(async (data) => {
            const response = await createCategoryAction({
              categoryName: data.categoryName,
              parentId: data.parentId,
              categoryLevel: data?.categoryLevel,
            });
            const parsedResponse = JSON.parse(response);
            handleActionResponse(parsedResponse);
            if (parsedResponse?.success) {
              reset();
              onClose();
            }
          })}
        ></Button>
      </div>
    </Dialog>
  );
}
