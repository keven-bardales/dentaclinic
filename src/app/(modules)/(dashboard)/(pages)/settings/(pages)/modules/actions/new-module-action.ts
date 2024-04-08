"use server";
import * as z from "zod";

import { newModuleSchema } from "../schemas/new-module-schema";
import { getModuleByName } from "../queries/getModuleByName";
import { db } from "@/lib/db/db";
import { revalidateTag } from "next/cache";

export default async function newModule(payload: z.infer<typeof newModuleSchema>) {
  try {
    const validatedFields = newModuleSchema.safeParse(payload);

    const existingModule = await getModuleByName(payload.name.trim());

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.errors.map((error) => error.message),
        success: false,
      };
    }

    if (existingModule) {
      return {
        errors: ["Ya existe un módulo con ese nombre"],
        success: false,
      };
    }

    const createdModule = await db.module.create({
      data: {
        name: payload.name,
        description: payload.description,
        modulePermissions: {
          createMany: {
            data: [
              {
                name: `${payload.name} - Ver`,
              },
              {
                name: `${payload.name} - Crear`,
              },
              {
                name: `${payload.name} - Editar`,
              },
              {
                name: `${payload.name} - Eliminar`,
              },
            ],
          },
        },
      },
    });

    revalidateTag("modules");
    revalidateTag("permissions");

    return {
      message: "Módulo creado exitosamente",
      data: createdModule,
      success: true,
    };
  } catch (error: any) {
    return {
      errors: [error.message],
      success: false,
    };
  }
}
