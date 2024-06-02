import ErrorAuth from "@/components/auth/error-auth";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Error",
  description: "Auth",
};

const ErrorAuthPage = () => {
  return (
    <Suspense>
      <ErrorAuth />
    </Suspense>
  );
};

export default ErrorAuthPage;
