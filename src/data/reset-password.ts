import prisma from "@/lib/db";

export const getResetPasswordByEmail = async (email: string) => {
  try {
    const existEmail = await prisma.resetPassword.findFirst({
      where: { email },
    });

    return existEmail;
  } catch (error) {
    return null;
  }
};

export const getResetPasswordByToken = async (token: string) => {
  try {
    const existToken = await prisma.resetPassword.findUnique({
      where: { token },
    });

    return existToken;
  } catch (error) {
    return null;
  }
};
