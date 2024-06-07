import { GetPhoneUseCase } from "@/features/phone/domain/use-cases/get-all-phones.use-case";
import { cache } from "@/lib/utils/cache";
import { PHONECACHEKEYS } from "../cache/phone-cache-keys";

export const getCachedPhones = cache(
  async () => {
    const useCase = new GetPhoneUseCase();

    const phones = await useCase.execute();

    return phones;
  },
  [PHONECACHEKEYS.PHONES.key],
  {
    revalidate: PHONECACHEKEYS.PHONES.revalidate,
    tags: PHONECACHEKEYS.PHONES.tags,
  }
);
