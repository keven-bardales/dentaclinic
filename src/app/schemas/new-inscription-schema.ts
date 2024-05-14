import * as z from "zod";
const phoneRegex = /^(?:\+?(?:503|504)\-?)?(?:\d{4}\-?){2}\d{4}$/;

export const inscriptionSchema = z.object({
  fullName: z
    .string({
      invalid_type_error: "El nombre debe ser un texto",
      required_error: "El nombre es requerido",
    })
    .min(1, "El nombre es requerido")
    .max(255, "El nombre no puede tener más de 255 caracteres"),
  email: z
    .string({
      invalid_type_error: "El email debe ser un texto",
      required_error: "El email es requerido",
    })
    .email({
      message: "El email no es válido",
    }),
  company: z
    .string({
      invalid_type_error: "La empresa debe ser un texto",
      required_error: "La empresa es requerida",
    })
    .min(1, "La empresa es requerida")
    .max(255, "La empresa no puede tener más de 255 caracteres"),
  city: z
    .string({
      invalid_type_error: "La ciudad debe ser un texto",
      required_error: "La ciudad es requerida",
    })
    .min(1, "La ciudad es requerida")
    .max(255, "La nombre no puede tener más de 255 caracteres"),
  description: z
    .string({
      invalid_type_error: "La descripción debe ser un texto",
      required_error: "La descripción es requerida",
    })
    .min(1, "La descripción es requerido")
    .max(255, "La descripción no puede tener más de 255 caracteres"),
  phone: z.string().min(1, "El nombre es requerido").max(15, "El nombre no puede tener más de 255 caracteres"),
});
