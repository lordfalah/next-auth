"use client";

import CardWrapper from "@/components/auth/card-wrapper";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

enum TErrorAuth {
  Configuration = "Configuration",
  AccessDenied = "AccessDenied",
  Verification = "Verification",
  Default = "Default",
}

const errors = [
  {
    error: "Configuration",
    message:
      "There is a problem with the server configuration. Check if your options are correct.",
  },
  {
    error: "AccessDenied",
    message:
      "Usually occurs, when you restricted access through the signIn callback, or redirect callback.",
  },
  {
    error: "Verification",
    message:
      "Related to the Email provider. The token has expired or has already been used.",
  },

  {
    error: "Default",
    message: "Catch all, will apply, if none of the above matched.",
  },
];

const ErrorAuth = () => {
  const params = useSearchParams();
  const queryError = params.get("error") as TErrorAuth;

  const errMsg = queryError
    ? errors.find(({ error }) => error === queryError)
    : null;

  return (
    <CardWrapper
      cardTitle="Error"
      cardDescription="Something when Error"
      backButtonLabel="back to login"
      backButtonHref="login"
      classNameHeader="text-center"
    >
      <Suspense>
        {errMsg && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{errMsg.error}</AlertTitle>
            <AlertDescription>{errMsg.message}</AlertDescription>
          </Alert>
        )}
      </Suspense>
    </CardWrapper>
  );
};

export default ErrorAuth;
