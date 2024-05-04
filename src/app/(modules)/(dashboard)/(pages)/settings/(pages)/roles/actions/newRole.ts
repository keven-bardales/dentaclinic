"use server";
import * as z from "zod";

import { db } from "@/lib/db/db";
import { revalidateTag } from "next/cache";
import { newRoleSchema } from "../schemas/new-role-schema";
import { getRoleByName } from "../queries/getRoleByName";

export default async function newRole(payload: z.infer<typeof newRoleSchema>) {
  try {
    const validatedFields = newRoleSchema.safeParse(payload);

    const existingRole = await getRoleByName(payload.name.trim());

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.errors.map((error) => error.message),
        success: false,
      };
    }

    if (existingRole) {
      return {
        errors: ["Ya existe un rol con ese nombre"],
        success: false,
      };
    }

    const createdRole = await db.role.create({
      data: {
        name: payload.name,
        description: payload.description,
      },
    });

    revalidateTag("roles");

    return {
      message: "Rol creado exitosamente",
      data: createdRole,
      success: true,
    };
  } catch (error: any) {
    return {
      errors: [error.message],
      success: false,
    };
  }
}
