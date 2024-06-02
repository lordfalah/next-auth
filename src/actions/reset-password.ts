"use server";

import { generateTokenResetPassword } from "@/data/token";
import { getUserByEmail } from "@/data/users";
import { ResetPasswordSchema, TResetPasswordSchema } from "@/lib/definitions";
import { sendEmaiResetPassword } from "@/lib/mail";

export const resetPassword = async (value: TResetPasswordSchema) => {
  try {
    const { success, error, data } = ResetPasswordSchema.safeParse(value);
    if (!success) {
      return {
        error: error.issues[0].message,
        status: false,
        message: "Invalid Field!",
      };
    }

    const existingUser = await getUserByEmail(data.email);
    if (!existingUser) {
      return {
        error: "Invalid Email!",
        status: false,
        message: "Email does not exist !",
      };
    }

    const generateToken = await generateTokenResetPassword(existingUser.email);
    if (!generateToken) {
      return {
        error: "Invalid Token",
        status: false,
        message: "Token not found",
      };
    }

    await sendEmaiResetPassword(generateToken.email, generateToken.token);

    return { error: null, status: true, message: "Reset email send" };
  } catch (error) {
    return { error: null, status: false, message: "Server error" };
  }
};
