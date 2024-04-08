import { cache } from "@/lib/utils/cache";
import { getRoles } from "../queries/getRoles";

export const getCachedRoles = cache(getRoles, ["roles"], { revalidate: 3600, tags: ["roles"] });
