import { z } from "zod";

export const newUserSchema = z.object({
  email: z.string().email({
    message: "El correo electrónico es requerido",
  }),
  password: z.string().min(8, {
    message: "Se requieren al menos 8 caracteres",
  }),
  name: z.string().min(1, {
    message: "El nombre es requerido",
  }),
  userRoles: z
    .array(
      z.number({
        message: "El rol es requerido",
      })
    )
    .min(1, {
      message: "Se requiere al menos un rol",
    }),
});
