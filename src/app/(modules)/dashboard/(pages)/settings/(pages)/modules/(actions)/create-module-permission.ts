"use server";

import { getModulePermissionByName } from "../(queries)/getModulePermissionByName";
import * as z from "zod";
import { newModulePermissionSchema } from "../(schemas)/module-permission-schema";
import { db } from "@/lib/db/db";
import { revalidateTag } from "next/cache";
import { MODULESCACHEKEYS } from "../(cache-keys)/modules-cache-keys";

export const createModulePermission = async (payload: z.infer<typeof newModulePermissionSchema>) => {
  const validatedFields = newModulePermissionSchema.safeParse(payload);

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors.map((error) => error.message),
      success: false,
    };
  }

  const moduleFound = await db.module.findUnique({
    where: {
      id: payload.moduleId,
    },
  });

  if (!moduleFound) {
    return {
      message: "No se encontró el módulo",
      success: false,
    };
  }

  if (payload.name.includes("Crear") || payload.name.includes("Editar") || payload.name.includes("Eliminar") || payload.name.includes("Ver")) {
    return {
      message: "El nombre del permiso no puede contener palabras reservadas",
      success: false,
    };
  }

  if (payload.name.includes(" ")) {
    return {
      message: "El nombre del permiso no puede contener espacios",
      success: false,
    };
  }

  if (!payload.name.includes(moduleFound.name)) {
    return {
      message: "El nombre del permiso debe contener el nombre del módulo",
      success: false,
    };
  }

  const permissionExists = await getModulePermissionByName({
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

  revalidateTag(MODULESCACHEKEYS.MODULES.key);

  return {
    message: "Permiso creado exitosamente",
    data: newPermission,
    success: true,
  };
};
