import * as z from "zod";

export const baseValidator = <T extends z.ZodType<any, any, any>, K>(schema: T, payload: z.infer<T>) => {
  const validatedFields = schema.safeParse(payload);

  if (!validatedFields.success) {
    return {
      validatedFields: validatedFields,
      success: false,
      errors: validatedFields.error.errors.map((error) => error.message),
    };
  }

  return {
    success: true,
    validatedFields: validatedFields.data,
    errors: [],
  };
};
