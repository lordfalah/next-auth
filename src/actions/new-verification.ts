"use server";

import { getVerificationTokenByToken } from "@/data/verification-token";
import { getUserByEmail } from "@/data/users";
import prisma from "@/lib/db";

export const newVerification = async (token: string) => {
  try {
    const existingToken = await getVerificationTokenByToken(token);
    if (!existingToken) {
      return { status: false, message: "token does not exist" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) return { status: false, message: "token has expired" };

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser)
      return { status: false, message: "Email does not exist" };

    await prisma.user.update({
      where: {
        email: existingUser.email,
      },

      data: {
        email: existingUser.email,
        emailVerified: new Date(),
      },
    });

    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });

    return {
      status: true,
      message: "Success Verification",
    };
  } catch (error) {
    return { status: false, message: "Server Error" };
  }
};
