"use client";

import { AlertCircle } from "lucide-react";
import { CircleCheck } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import CardWrapper from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { TNewResetPasswordSchema, NewPasswordSchema } from "@/lib/definitions";
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
import { newResetPassword } from "@/actions/new-reset-password";
import { useSearchParams } from "next/navigation";

const NewResetForm = () => {
  const [isPending, startTransition] = useTransition();
  const [errMsg, setErrMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");
  const params = useSearchParams();
  const token = params.get("token");

  const form = useForm<TNewResetPasswordSchema>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (payloads: TNewResetPasswordSchema) => {
    setErrMsg("");
    setSuccMsg("");

    startTransition(async () => {
      if (!token) return setErrMsg("token not found!");

      const { errors, message, status } = await newResetPassword(
        payloads,
        token,
      );

      if (status) {
        // success login
        setSuccMsg(message);
      } else {
        // fail login
        setErrMsg(message);
        Object.keys(errors).forEach((key) => {
          return form.setError(key as keyof typeof errors, {
            type: "server",
            message: errors[key as keyof typeof errors],
          });
        });
      }
    });
  };

  return (
    <CardWrapper
      cardTitle="Auth"
      backButtonHref="Login"
      backButtonLabel="Back to"
      cardDescription="Enter a new password"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="********"
                    {...field}
                    type="password"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="********"
                    {...field}
                    type="password"
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

export default NewResetForm;
