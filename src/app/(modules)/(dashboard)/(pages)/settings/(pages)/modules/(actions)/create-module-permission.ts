"use server";

import { getModulePermissionByName } from "../(queries)/getModulePermissionByName";
import * as z from "zod";
import { newModulePermissionSchema } from "../(schemas)/module-permission-schema";
import { db } from "@/lib/db/db";
import { revalidateTag } from "next/cache";

export const createModulePermission = async (payload: z.infer<typeof newModulePermissionSchema>) => {
  const validatedFields = newModulePermissionSchema.safeParse(payload);

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors.map((error) => error.message),
      success: false,
    };
  }

  const permissionExists = await getModulePermissionByName({
    moduleId: payload.moduleId,
    permissionName: payload.name,
  });

  if (permissionExists) {
    return {
      message: "Ya existe un permiso con ese nombre",
      success: false,
    };
  }

  const newPermission = await db.modulePermission.create({
    data: {
      moduleId: payload.moduleId,
      name: payload.name,
    },
  });

  revalidateTag("modules");

  return {
    message: "Permiso creado exitosamente",
    data: newPermission,
    success: true,
  };
};
