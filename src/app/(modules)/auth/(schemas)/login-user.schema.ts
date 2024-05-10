import * as z from "zod";

export const loginUserSchema = z.object({
  loginCredential: z
    .string({
      invalid_type_error: "El email o el nombre de usuario es inválido",
      required_error: "El email o el nombre de usuario es requerido",
    })
    .min(1, {
      message: "El email o el nombre de usuario es requerido",
    }),
  password: z
    .string({
      invalid_type_error: "La contraseña es inválida",
      required_error: "La contraseña es requerida",
    })
    .min(5, {
      message: "La contraseña debe tener al menos 8 caracteres",
    }),
  rememberme: z.boolean(),
});
