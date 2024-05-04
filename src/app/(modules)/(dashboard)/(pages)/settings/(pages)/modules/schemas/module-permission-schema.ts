import * as z from "zod";
export const newModulePermissionSchema = z.object({
  moduleId: z.number({
    required_error: "El modulo es requerido",
    invalid_type_error: "El modulo debe ser un número",
  }),
  name: z
    .string({
      invalid_type_error: "El nombre del módulo debe ser un texto",
      required_error: "El nombre del módulo es requerido",
    })
    .min(1, {
      message: "El nombre del módulo no puede estar vacío",
    }),
  description: z
    .string({
      invalid_type_error: "La descripción del módulo debe ser un texto",
    })
    .max(255, {
      message: "La descripción del módulo no puede tener más de 255 caracteres",
    })
    .nullable(),
});
