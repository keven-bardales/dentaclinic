import { db } from "@/lib/db/db";

export const getRoleByName = async (name: string) => {
  const found = await db.role.findFirst({
    where: {
      name,
    },
  });

  return found;
};
