"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";

import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email({message: "Correo electrónico inválido."}),
  percentage: z
    .number()
    .min(1, {message: "Porcentaje inválido."})
    .max(100, {message: "Porcentaje inválido."}),
});

export function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      percentage: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("values", values);
  }

  return (
    <Form {...form}>
      <form className=" space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input className="w-56" placeholder="email@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="percentage"
          render={({field}) => (
            <FormItem>
              <FormLabel>Porcentaje</FormLabel>
              <FormControl>
                <Input
                  className="w-20"
                  placeholder="Descuento"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="bg-teal-600 hover:bg-teal-800" type="submit">
          Generar
        </Button>
      </form>
    </Form>
  );
}

export default function HomePage() {
  return (
    <div>
      <h1 className="text-center text-4xl font-medium">Cupones de Descuento</h1>
      <section className="mt-32 flex justify-center">
        <ProfileForm />
      </section>
    </div>
  );
}
