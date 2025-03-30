import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { ChevronRightCircle } from "lucide-react";
import { userAuth } from "@/lib/handler";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().min(2).max(50).email(),
  phoneNumber: z
    .string()
    .min(2)
    .max(12)
    .regex(/^[0-9]+$/),
  full_name: z.string().min(2).max(50),
});

const DataForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      phoneNumber: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    userAuth(values).then((res) => {
      toast.success("User Authenticated successfully");
      localStorage.setItem("email", values.email);
      localStorage.setItem("userId", res._id);
      window.location.href = "/appointments";
    });
  }

  return (
    <div className="flex flex-col gap-3 items-center justify-center h-screen w-full">
      <h1 className="text-2xl font-bold">Enter Your Details</h1>
      <div className="space-y-4 w-[400px]">
        <Form {...form}>
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your Full Name" {...field} />
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
                  <Input placeholder="Enter your Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your Phone Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
        <Button
          className="w-full rounded"
          type="submit"
          onClick={form.handleSubmit(onSubmit)}
        >
          Next <ChevronRightCircle />
        </Button>
      </div>
    </div>
  );
};

export default DataForm;
