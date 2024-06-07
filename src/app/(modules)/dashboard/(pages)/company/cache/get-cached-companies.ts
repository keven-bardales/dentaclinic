import { GetCompanyUseCase } from "@/features/company/domain/use-cases/get-all-companies-use-case";
import { cache } from "@/lib/utils/cache";
import { COMPANYCACHEKEYS } from "../cache-keys/company-cache-key";

export const getCachedCompanies = cache(
  async () => {
    const useCase = new GetCompanyUseCase();

    const companies = await useCase.execute();

    return companies;
  },
  [COMPANYCACHEKEYS.COMPANIES.key],
  {
    revalidate: COMPANYCACHEKEYS.COMPANIES.revalidate,
    tags: COMPANYCACHEKEYS.COMPANIES.tags,
  }
);
