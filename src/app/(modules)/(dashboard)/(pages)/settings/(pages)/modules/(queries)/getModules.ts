import { db } from "@/lib/db/db";

export const getModules = async () => {
  console.log("Refreshing cache");

  const modules = await db.module.findMany({
    include: {
      modulePermissions: true,
    },
  });

  return modules;
};
