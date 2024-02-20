import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { addTodo } from "@/lib/redux/todo/todoSlice";
import { logOut } from "@/lib/redux/auth/authSlice";
import { addTodoValidation } from "@/lib/validation";
import { createErrorToast, renderButton } from "@/utils/utils";

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

/**
 * Component with form for adding a new todo.
 */
const AddTodo: FC = () => {
  const dispatch = useAppDispatch();
  const { email } = useAppSelector((state) => state.auth);
  const { isLoading } = useAppSelector((state) => state.todo);
  const form = useForm<z.infer<typeof addTodoValidation>>({
    resolver: zodResolver(addTodoValidation),
    defaultValues: {
      todo: "",
    },
  });

  const addTodoHandler = async (values: z.infer<typeof addTodoValidation>) => {
    if (!email) {
      createErrorToast(
        "Oops! There's a problem. Please, log in into your account again."
      );
      await dispatch(logOut());
      return;
    }

    const data = {
      email,
      todo: values.todo,
    };

    await dispatch(addTodo(data));
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(addTodoHandler)}
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
          {renderButton(isLoading, "Add task")}
        </Button>
      </form>
    </Form>
  );
};

export default AddTodo;
