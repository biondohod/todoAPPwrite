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
import { addTodoValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Home = () => {
  const form = useForm<z.infer<typeof addTodoValidation>>({
    resolver: zodResolver(addTodoValidation),
    defaultValues: {
      todo: "",
    },
  });

  function onSubmit(values: z.infer<typeof addTodoValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="w-[1280px] mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 flex items-end gap-2">
          <FormField
            control={form.control}
            name="todo"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel className="font-semibold text-xl col-span-full">Your task</FormLabel>
                <FormControl>
                  <Input className="text-lg p-4" placeholder="Clean up the backyard" {...field} />
                </FormControl>
                <FormMessage className="absolute"/>
              </FormItem>
            )}
          />
          <Button className="text-lg"type="submit">Add todo</Button>
        </form>
      </Form>
    </div>
  );
};

export default Home;
