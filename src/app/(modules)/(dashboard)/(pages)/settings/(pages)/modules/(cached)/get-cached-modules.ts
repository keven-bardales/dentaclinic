import { cache } from "@/lib/utils/cache";
import { getModules } from "../(queries)/getModules";

export const getCachedModules = cache(getModules, ["modules"], { revalidate: 60, tags: ["modules"] });
