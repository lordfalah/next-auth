"use server";

import { signIn } from "@/auth";
import { generateTokenByEmail } from "@/data/token";
import { getUserByEmail } from "@/data/users";
import { SignupFormSchema, TSignupFormSchema } from "@/lib/definitions";
import { sendEmailVerification } from "@/lib/mail";
import { DEFFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (values: TSignupFormSchema) => {
  const validatePayloads = SignupFormSchema.safeParse(values);
  if (!validatePayloads.success) {
    let errors = {};

    validatePayloads.error.issues.forEach((issue) => {
      errors = { ...errors, [issue.path[0]]: issue.message };

      return errors;
    });

    return {
      errors,
      status: false,
      message: "Invalid fields!",
    };
  } else {
    const { email, password } = validatePayloads.data;

    const existingUser = await getUserByEmail(email);
    if (!existingUser || !existingUser.email || !existingUser.password) {
      return {
        errors: {},
        status: false,
        message: "Email does not exist !",
      };
    }

    if (!existingUser.emailVerified) {
      const existingToken = await generateTokenByEmail(existingUser.email);

      if (existingToken) {
        await sendEmailVerification(existingToken.email, existingToken.token);
      }

      return {
        errors: {},
        status: true,
        message: "Confirmation email sent!",
      };
    }

    try {
      await signIn("credentials", {
        email,
        password,
        redirectTo: DEFFAULT_LOGIN_REDIRECT,
      });

      return {
        errors: {},
        status: true,
        message: "Success login",
      };
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return {
              errors: {},
              status: false,
              message: "Invalid Credentials",
            };

          default:
            return {
              errors: {},
              status: false,
              message: "Something when errors",
            };
        }
      }

      throw error;
    }
  }
};
