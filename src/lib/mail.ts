import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmaiResetPassword = async (email: string, token: string) => {
  const resetLink = `${process.env.NEXT_PUBLIC_URL}/auth/new-reset?token=${token}`;

  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "reset email",
    html: `<p>CLick <a href="${resetLink}">Here</a> to confirmation reset password</p>`,
  });
};

export const sendEmailVerification = async (email: string, token: string) => {
  const confirmationLink = `${process.env.NEXT_PUBLIC_URL}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "verification email",
    html: `<p>CLick <a href="${confirmationLink}">Here</a> to confirmation email</p>`,
  });
};
