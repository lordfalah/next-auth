import ErrorAuth from "@/components/auth/error-auth";
import { Suspense } from "react";

const ErrorAuthPage = () => {
  return (
    <Suspense>
      <ErrorAuth />
    </Suspense>
  );
};

export default ErrorAuthPage;
