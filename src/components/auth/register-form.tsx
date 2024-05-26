"use client";

import { AlertCircle } from "lucide-react";
import { CircleCheck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import CardWrapper from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { RegisterFormSchema, TRegisterFormSchema } from "@/lib/definitions";
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
import { register } from "@/actions/register";
import { useState, useTransition } from "react";

const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [errMsg, setErrMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");
  const form = useForm<TRegisterFormSchema>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (payloads: TRegisterFormSchema) => {
    setErrMsg("");
    setSuccMsg("");
    startTransition(async () => {
      const { errors, message, status } = await register(payloads);

      if (status) {
        setSuccMsg(message);
      } else {
        setErrMsg(message);
        Object.keys(errors).forEach((key) => {
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
      backButtonHref="Login"
      backButtonLabel="Already have account?"
      cardDescription="Enter your information to create an account"
      cardTitle="Register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="falhhalla"
                    {...field}
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
              {isPending ? (
                <Loader className="animate-spin" />
              ) : (
                "Create an Account"
              )}
            </Button>
            <Button
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

export default RegisterForm;
