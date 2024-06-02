import NewResetForm from "@/components/auth/new-reset-form";
import React, { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Auth",
};

const NewResetPassword = () => {
  return (
    <Suspense>
      <NewResetForm />
    </Suspense>
  );
};

export default NewResetPassword;
