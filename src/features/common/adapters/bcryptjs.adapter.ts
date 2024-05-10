import bcrypt from "bcryptjs";

export const bcryptAdapter = {
  hash: async (password: string) => {
    const hash = bcrypt
      .hash(password, 10)
      .then((hash) => hash)
      .catch((err) => {
        throw new Error("Ocurrió un error al encriptar la contraseña");
      });

    return hash;
  },

  compare: async (password: string, hashed: string) => {
    try {
      const result = await bcrypt.compare(password, hashed);
      return result;
    } catch (err) {
      throw new Error("Ocurrió un error al comparar las contraseñas");
    }
  },

  generateRandomToken: async () => {
    const token = crypto.randomUUID();
    return token;
  },
};
