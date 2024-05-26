"use client";

import { AlertCircle } from "lucide-react";
import { CircleCheck } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import CardWrapper from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import {
  ErrorForm,
  SignupFormSchema,
  TSignupFormSchema,
} from "@/lib/definitions";
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
import Google from "@/icons/google";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";

import { DEFFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [errMsg, setErrMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");
  const form = useForm<TSignupFormSchema>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (payloads: TSignupFormSchema) => {
    setErrMsg("");
    setSuccMsg("");
    startTransition(async () => {
      const { errors, message, status } = await login(payloads);

      if (status) {
        // success login
        setSuccMsg(message);
      } else {
        // fail login
        setErrMsg(message);

        Object.keys(errors as ErrorForm).forEach((key) => {
          return form.setError(key as any, {
            type: "server",
            message: errors[key as keyof typeof errors],
          });
        });
      }
    });
  };

  return (
    <CardWrapper
      backButtonHref="Register"
      backButtonLabel="Don't have an account?"
      cardDescription="Enter your email below to login to your account"
      cardTitle="Login"
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
                    placeholder="m@example.com"
                    {...field}
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="*******"
                    {...field}
                    type="password"
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
              {isPending ? <Loader className="animate-spin" /> : "Login"}
            </Button>
            <Button
              onClick={async () =>
                await signIn("google", { redirectTo: DEFFAULT_LOGIN_REDIRECT })
              }
              type="button"
              disabled={isPending}
              variant="outline"
              className="flex h-auto w-full gap-x-3.5"
            >
              <Google className="h-8 w-8 " />
              Login with Google
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
