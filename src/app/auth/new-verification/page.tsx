import VerificationForm from "@/components/auth/verification-form";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verification",
  description: "Auth",
};

const NewVerificationPage = () => {
  return (
    <div>
      <VerificationForm />
    </div>
  );
};

export default NewVerificationPage;
