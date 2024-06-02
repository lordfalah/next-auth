"use server";

import bcrypt from "bcryptjs";
import { getResetPasswordByToken } from "@/data/reset-password";
import { getUserByEmail } from "@/data/users";
import prisma from "@/lib/db";
import { NewPasswordSchema, TNewResetPasswordSchema } from "@/lib/definitions";

export const newResetPassword = async (
  values: TNewResetPasswordSchema,
  token: string,
) => {
  try {
    const { success, error, data } = NewPasswordSchema.safeParse(values);

    if (!success) {
      let errors = {};

      error.issues.forEach((issue) => {
        errors = { ...errors, [issue.path[0]]: issue.message };

        return errors;
      });

      return { errors, status: false, message: "Invalid Fields!" };
    }

    const existingToken = await getResetPasswordByToken(token);
    if (!existingToken) {
      return { errors: {}, status: false, message: "Token not found" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired)
      return { errors: {}, status: false, message: "token has expired" };

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) {
      return { errors: {}, status: false, message: "Email not found" };
    }

    const hashPassword = await bcrypt.hash(data.password, 10);

    await prisma.user.update({
      where: {
        email: existingUser.email,
      },
      data: {
        password: hashPassword,
      },
    });

    await prisma.resetPassword.delete({
      where: { id: existingToken.id },
    });

    return { errors: {}, status: true, message: "Success reset password" };
  } catch (error) {
    return { errors: {}, status: false, message: "Server errors" };
  }
};
