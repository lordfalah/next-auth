"use server";

import { generateTokenByEmail } from "@/data/token";
import { getUserByEmail } from "@/data/users";
import prisma from "@/lib/db";
import { RegisterFormSchema, TRegisterFormSchema } from "@/lib/definitions";
import { sendEmailVerification } from "@/lib/mail";
import bcrypt from "bcryptjs";

export const register = async (values: TRegisterFormSchema) => {
  const {
    success,
    error,
    data: payloads,
  } = RegisterFormSchema.safeParse(values);
  if (!success) {
    let errors = {};

    error.issues.forEach((issue) => {
      errors = { ...errors, [issue.path[0]]: issue.message };

      return errors;
    });

    return {
      errors,
      status: false,
      message: "Invalid fields!",
    };
  } else {
    // if user existing
    const existingUser = await getUserByEmail(payloads.email);

    if (existingUser) {
      return {
        errors: {},
        status: false,
        message: "user is existing",
      };
    }

    const hashPassword = await bcrypt.hash(payloads.password, 10);

    await prisma.user.create({
      data: {
        ...payloads,
        password: hashPassword,
      },
    });

    const verificationToken = await generateTokenByEmail(payloads.email);

    if (verificationToken) {
      await sendEmailVerification(
        verificationToken.email,
        verificationToken.token,
      );
    }

    return {
      message: "Email confirmation have be send it",
      errors: {},
      status: true,
    };
  }
};
