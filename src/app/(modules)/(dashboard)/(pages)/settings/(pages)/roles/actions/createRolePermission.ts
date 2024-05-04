import { createRolePermissionsSchema } from "../schemas/new-role-permission-schema";
import * as z from "zod";

export const createRolePermission = async (data: z.infer<typeof createRolePermissionsSchema>) => {
  return {
    success: true,
    message: "Permiso de rol creado exitosamente",
  };
};
