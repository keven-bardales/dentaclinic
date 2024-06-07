"use client";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useState } from "react";
import { ProductCategoryEntity } from "@/features/category/domain/entity/product-category.entity";
import NewCategoryModal from "./new-category-modal";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { deleteCategoryAction } from "../actions/delete-category-action";
import { useToast } from "@/app/(modules)/(shared)/providers/toast-provider/toast-provider";

export default function CategoriesDataTable({ initialCategories }: { initialCategories: string }) {
  const categories = JSON.parse(initialCategories ?? "[]") as ProductCategoryEntity[];
  const [expandedRows, setExpandedRows] = useState<ProductCategoryEntity["subCategories"]>();
  const [newCategory, setnewCategory] = useState(false);
  const [parentForModal, setParentForModal] = useState<ProductCategoryEntity | null>(null);
  const { showToast, handleActionResponse } = useToast();

  const header = (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="text-2xl">Categorias</div>
      <Button
        icon="pi pi-plus"
        onClick={(e) => {
          e.preventDefault();
          setnewCategory(true);
        }}
        label="Nueva categoria"
      />
    </div>
  );

  const allowExpansion = (data: ProductCategoryEntity) => {
    return data?.subCategories && data?.subCategories?.length > 0;
  };

  const expansionTemplate = (data: ProductCategoryEntity) => {
    if (!data.subCategories || data?.subCategories?.length == 0) return null;

    const header = (
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-2xl">{data.name}</div>
        <Button
          icon="pi pi-plus"
          onClick={(e) => {
            e.preventDefault();
            setnewCategory(true);
            setParentForModal(data);
          }}
          label="Nueva subcategoria"
        />
      </div>
    );

    return (
      <DataTable header={header} value={data.subCategories} dataKey="id" scrollable paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}>
        <Column field="name" header="Nombre" />
        <Column
          body={(item: ProductCategoryEntity) => {
            return <span>Nivel {item.categoryLevel}</span>;
          }}
          header="Nivel"
        />
        <Column
          body={(item: ProductCategoryEntity) => {
            return (
              <Button
                icon="pi pi-trash"
                onClick={(e) => {
                  e.preventDefault();
                  confirmDeletion(item);
                }}
                className="p-button-danger"
              />
            );
          }}
          className="w-[80px]"
        />
      </DataTable>
    );
  };

  const confirmDeletion = async (categoryToDelete: ProductCategoryEntity) => {
    confirmDialog({
      message: (options) => {
        return (
          <div>
            ¿Estas seguro que deseas eliminar esta categoria? <strong>{categoryToDelete?.name}</strong>
          </div>
        );
      },
      header: "Confirmar",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "no",
      acceptClassName: "p-button-danger",
      accept: async () => {
        if (!categoryToDelete) {
          showToast({ severity: "error", summary: "Error", detail: "Categoria no encontrada" });
          return;
        }
        const response = await deleteCategoryAction({ categoryId: categoryToDelete?.id });
        const parsedResponse = JSON.parse(response);
        handleActionResponse(parsedResponse);
      },
      reject: () => {},
    });
  };

  return (
    <>
      <NewCategoryModal
        parentCategory={parentForModal}
        isVisible={newCategory}
        onClose={() => {
          setParentForModal(null);
          setnewCategory(false);
        }}
      />
      <ConfirmDialog className="max-w-[400px]" />
      <DataTable
        onRowToggle={(e) => {
          setExpandedRows(e.data as ProductCategoryEntity["subCategories"]);
        }}
        dataKey="id"
        scrollable
        expandedRows={expandedRows}
        rowExpansionTemplate={expansionTemplate}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        header={header}
        value={categories.filter((category) => {
          return category.categoryLevel === 1;
        })}
      >
        <Column className="w-[80px]" expander={allowExpansion} />
        <Column field="name" header="Nombre" />
        <Column
          body={(item: ProductCategoryEntity) => {
            return <span>Nivel {item.categoryLevel}</span>;
          }}
          header="Nivel"
        />
        <Column
          body={(item: ProductCategoryEntity) => {
            return (
              <Button
                icon="pi pi-trash"
                onClick={(e) => {
                  e.preventDefault();
                  confirmDeletion(item);
                }}
                className="p-button-danger"
              />
            );
          }}
          className="w-[80px]"
        />
      </DataTable>
    </>
  );
}
