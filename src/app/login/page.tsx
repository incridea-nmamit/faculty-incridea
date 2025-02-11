"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { loginZ } from "~/zod/authZ";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { signIn } from "~/server/auth";
import { toast } from "sonner";

export default function Login() {
  const form = useForm<z.infer<typeof loginZ>>({
    resolver: zodResolver(loginZ),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof loginZ>) => {
    toast.loading("Logging in...");
    signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    })
      .then(async (s) => {
        toast.dismiss();
        const result = s as { ok: boolean; error?: string };
        if (result.ok) {
          toast.success("Logged in successfully");
        } else {
          toast.error(
            result.error ??
              "Failed to log in! You sure about your credentials?",
          );
        }
      })
      .catch((e) => {
        toast.dismiss();
        console.error(e);
        toast.error("Failed to log in");
      });
  };
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Faculty Login</CardTitle>
          <span className="text-sm text-red-500">
            Please login with organisational email only.
          </span>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@nitte.edu.in" {...field} />
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
                        placeholder="Enter your password"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CardFooter>
                <Button type="submit">Login</Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
