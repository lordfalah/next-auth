import prisma from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getResetPasswordByEmail } from "@/data/reset-password";

export const generateTokenResetPassword = async (email: string) => {
  try {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hours
    const existingEmail = await getResetPasswordByEmail(email);

    if (existingEmail) {
      await prisma.resetPassword.delete({
        where: {
          id: existingEmail.id,
        },
      });
    }

    const generatePassword = await prisma.resetPassword.create({
      data: {
        token,
        expires,
        email,
      },
    });

    return generatePassword;
  } catch (error) {
    return null;
  }
};

export const generateTokenByEmail = async (email: string) => {
  try {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hours

    const existingToken = await getVerificationTokenByEmail(email);
    if (existingToken) {
      await prisma.verificationToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    }
    const verificationToken = await prisma.verificationToken.create({
      data: {
        email,
        token,
        expires,
      },
    });

    return verificationToken;
  } catch (error) {
    return null;
  }
};
