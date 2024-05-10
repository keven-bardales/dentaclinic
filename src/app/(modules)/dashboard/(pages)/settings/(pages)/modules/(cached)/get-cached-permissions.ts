import { cache } from "@/lib/utils/cache";
import { getPermissions } from "../(queries)/getPermissions";

export const getCachedPermissions = cache(getPermissions, ["permissions"], { revalidate: 3600, tags: ["permissions"] });
