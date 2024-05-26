import RegisterForm from "@/components/auth/register-form";
import prisma from "@/lib/db";

export default async function RegisterPage() {
  return <RegisterForm />;
}
