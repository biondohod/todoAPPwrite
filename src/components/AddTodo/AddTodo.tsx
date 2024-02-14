import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addTodoValidation } from "@/lib/validation";
import { addTodo } from "@/lib/appwrite/api";
import { createErrorToast } from "@/utils/utils";
import { logOut } from "@/lib/redux/auth/authSlice";
import { z } from "zod";

const AddTodo = () => {
  const dispatch = useAppDispatch();
  const { email } = useAppSelector((state) => state.auth);
  const form = useForm<z.infer<typeof addTodoValidation>>({
    resolver: zodResolver(addTodoValidation),
    defaultValues: {
      todo: "",
    },
  });

  function onSubmit(values: z.infer<typeof addTodoValidation>) {
    if (email) {
      addTodo(email, values.todo);
      form.reset();
    } else {
      createErrorToast(
        "Oops! There's a problem. Please, log in into your account again."
      );
      dispatch(logOut());
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 flex items-end gap-2"
      >
        <FormField
          control={form.control}
          name="todo"
          render={({ field }) => (
            <FormItem className="grow">
              <FormLabel className="font-semibold text-2xl col-span-full">
                Add task
              </FormLabel>
              <FormControl>
                <Input
                  className="text-xl p-4 py-6 shadow"
                  placeholder="What needs to be done?"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute" />
            </FormItem>
          )}
        />
        <Button className="text-xl p-4 py-6 shadow-inner" type="submit">
          Add task
        </Button>
      </form>
    </Form>
  );
};

export default AddTodo;
