import VerificationForm from "@/components/auth/verification-form";
import React, { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verification",
  description: "Auth",
};

const NewVerificationPage = () => {
  return (
    <Suspense>
      <VerificationForm />
    </Suspense>
  );
};

export default NewVerificationPage;
