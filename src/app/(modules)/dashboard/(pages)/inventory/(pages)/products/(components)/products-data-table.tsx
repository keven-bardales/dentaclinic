"use client";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProductEntity } from "@/features/product/domain/entities/product.entity";

export default function ProductsDataTable({ initialProducts }: { initialProducts: string }) {
  const parsedProducts = JSON.parse(initialProducts ?? "[]") as ProductEntity[];
  const products = parsedProducts.map((product) => {
    return ProductEntity.create(product);
  });

  const router = useRouter();
  const [newQuotation, setnewQuotation] = useState(false);

  const header = (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="text-2xl">Productos</div>
      <Button
        icon="pi pi-plus"
        onClick={(e) => {
          e.preventDefault();
          setnewQuotation(true);
        }}
        label="Nuevo Producto"
      />
    </div>
  );

  const dateFormater = new Intl.DateTimeFormat("es-HN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <>
      <DataTable dataKey="id" scrollable paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} header={header} value={products ?? []}>
        <Column field="name" header="Nombre" />
        <Column field="category.name" header="Categoria" />
        <Column
          body={(data: ProductEntity) => {
            return dateFormater.format(new Date(data.createdAt.date));
          }}
          header="Creación"
        />
      </DataTable>
    </>
  );
}
