"use client";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProductCategoryEntity } from "@/features/category/domain/entity/product-category.entity";
import { CATEGORYLEVELTRADUCTIONS } from "@/features/category/domain/enums/category-level-traductions";
import { CategoryLevelEnum } from "@/features/category/domain/enums/product-category-level.enum";

export default function CategoriesDataTable({ initialCategories }: { initialCategories: string }) {
  const categories = JSON.parse(initialCategories ?? "[]") as ProductCategoryEntity[];

  const [expandedRows, setExpandedRows] = useState<ProductCategoryEntity["subCategories"]>();

  const router = useRouter();
  const [newQuotation, setnewQuotation] = useState(false);

  const header = (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="text-2xl">Categorias</div>
      <Button
        icon="pi pi-plus"
        onClick={(e) => {
          e.preventDefault();
          setnewQuotation(true);
        }}
        label="Nueva categoria"
      />
    </div>
  );

  const allowExpansion = (data: ProductCategoryEntity) => {
    return data?.subCategories && data?.subCategories?.length > 0;
  };

  const expansionTemplate = (data: ProductCategoryEntity) => {
    return (
      <DataTable value={data.subCategories} dataKey="id" scrollable paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}>
        <Column field="name" header="Nombre" />
        <Column
          body={(item: ProductCategoryEntity) => {
            return CATEGORYLEVELTRADUCTIONS.es[item.categoryLevel];
          }}
          header="Nivel"
        />
      </DataTable>
    );
  };

  return (
    <>
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
        value={categories.filter((category) => category.categoryLevel == CategoryLevelEnum.LEVEL_1) ?? []}
      >
        <Column className="w-[80px]" expander={allowExpansion} />
        <Column field="name" header="Nombre" />
        <Column
          body={(item: ProductCategoryEntity) => {
            return CATEGORYLEVELTRADUCTIONS.es[item.categoryLevel];
          }}
          header="Nivel"
        />
      </DataTable>
    </>
  );
}
