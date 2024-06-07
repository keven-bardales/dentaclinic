import { z } from "zod";

export const createCategorySchema = z.object({
  categoryName: z
    .string({
      required_error: "El nombre de la categoria es requerido",
    })
    .min(3, {
      message: "El nombre de la categoria debe tener entre 3 y 255 caracteres",
    })
    .max(255, { message: "El nombre de la categoria debe tener entre 3 y 255 caracteres" }),
  parentId: z.number().nullable(),
  categoryLevel: z.number(),
});
