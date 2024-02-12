import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { signUpValidation } from "@/lib/validation";
import { Link } from "react-router-dom";
import { createUserAccount } from "@/lib/appwrite/api";
import { useAppSelector } from "@/lib/redux/store";
import { renderButton } from "@/utils/utils";

/**
 * Sign Up Form component.
 * Renders a form for user sign up.
 */
const SignUpForm = () => {
  const { isLoading } = useAppSelector((state) => state.auth);
  const form = useForm<z.infer<typeof signUpValidation>>({
    resolver: zodResolver(signUpValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function signUpHandler(values: z.infer<typeof signUpValidation>) {
    createUserAccount(values);
  }

  

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(signUpHandler)}
          className="flex flex-col gap-4 w-full max-w-lg"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your name</FormLabel>
                <FormControl>
                  <Input placeholder="Alex" {...field} />
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
                <FormLabel>Create a password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
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
                <FormLabel>Confirm your password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {renderButton(isLoading, "Sign Up")}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-blue-600  text-small-semibold ml-1"
            >
              Log in
            </Link>
          </p>
        </form>
      </Form>
    </>
  );
};

export default SignUpForm;
