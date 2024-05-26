import prisma from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const res = await prisma.user.findUnique({ where: { email } });
    return res;
  } catch (error) {
    console.warn(error);
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const res = await prisma.user.findUnique({ where: { id } });
    return res;
  } catch (error) {
    console.warn(error);
    return null;
  }
};
