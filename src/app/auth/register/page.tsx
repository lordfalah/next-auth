import RegisterForm from "@/components/auth/register-form";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Auth",
};

export default async function RegisterPage() {
  return <RegisterForm />;
}
