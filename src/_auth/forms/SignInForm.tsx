import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInValidation } from "@/lib/validation";
import { renderButton } from "@/utils/utils";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { logIn } from "@/lib/redux/auth/authSlice";


const SignInForm: FC = () => {
  const { isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof signInValidation>>({
    resolver: zodResolver(signInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const logInHandler = async (values: z.infer<typeof signInValidation>) => {
    await dispatch(logIn(values));
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">Welcome back!</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(logInHandler)}
          className="flex flex-col gap-4 w-full max-w-lg"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@example.com" {...field} />
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
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{renderButton(isLoading, "Log In")}</Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Don't have an account?
            <Link
              to="/sign-up"
              className="text-blue-600  text-small-semibold ml-1"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </Form>
    </>
  );
};

export default SignInForm;
