"use client";

import { AlertCircle } from "lucide-react";
import { CircleCheck } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import CardWrapper from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { TResetPasswordSchema, ResetPasswordSchema } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { resetPassword } from "@/actions/reset-password";

const ResetForm = () => {
  const [isPending, startTransition] = useTransition();
  const [errMsg, setErrMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");
  const form = useForm<TResetPasswordSchema>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (payloads: TResetPasswordSchema) => {
    setErrMsg("");
    setSuccMsg("");

    startTransition(async () => {
      const { error, message, status } = await resetPassword(payloads);

      if (status) {
        // success login
        setSuccMsg(message);
      } else {
        // fail login
        setErrMsg(message);
        form.setError("email", { message: error ? error : "", type: "server" });
      }
    });
  };

  return (
    <CardWrapper
      cardTitle="Reset Password"
      backButtonHref="Login"
      backButtonLabel="Back to"
      cardDescription="Enter your email below to reset password to your account"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="@gmail.com"
                    {...field}
                    type="email"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {errMsg && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errMsg}</AlertDescription>
            </Alert>
          )}

          {succMsg && (
            <Alert variant="success">
              <CircleCheck className="h-4 w-4" />
              <AlertDescription>{succMsg}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? (
                <Loader className="animate-spin" />
              ) : (
                "Reset Password"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetForm;
