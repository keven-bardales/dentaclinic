import { db } from "@/lib/db/db";

export const getModuleByName = async (name: string) => {
  const found = await db.module.findFirst({
    where: {
      name,
    },
  });

  return found;
};
