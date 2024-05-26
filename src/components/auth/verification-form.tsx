"use client";

import { useSearchParams } from "next/navigation";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import CardWrapper from "@/components/auth/card-wrapper";
import { AlertCircle, CircleCheck, Loader } from "lucide-react";
import { newVerification } from "@/actions/new-verification";
import { Alert, AlertDescription } from "@/components/ui/alert";

const VerificationForm = () => {
  const params = useSearchParams();
  const token = params.get("token");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const trigerVerification = useCallback(async () => {
    if (!token) {
      return setError("token null");
    }
    newVerification(token)
      .then(({ status, message }) => {
        if (status) {
          setSuccess(message);
          setError("");
        } else {
          setError(message);
          setSuccess("");
        }
      })
      .catch(() => {
        setError("Something when error");
        setSuccess("");
      });
  }, [token]);

  useEffect(() => {
    trigerVerification();
  }, [trigerVerification]);

  return (
    <CardWrapper
      backButtonHref="Login"
      backButtonLabel="back to login"
      cardDescription="Confirming your verification"
      cardTitle="Auth"
      classNameHeader="text-center"
    >
      <Suspense>
        <div className="mx-auto w-fit">
          {!error && !success && (
            <Loader className="size-20 animate-spin stroke-1" />
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert variant="success">
              <CircleCheck className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
        </div>
      </Suspense>
    </CardWrapper>
  );
};

export default VerificationForm;
