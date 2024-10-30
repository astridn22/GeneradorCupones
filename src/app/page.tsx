"use client";

import {useState} from "react";
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
  id: z.string(),
  email: z.string().email({message: "Correo electrónico inválido."}),
  percentage: z
    .number()
    .min(1, {message: "Porcentaje inválido."})
    .max(100, {message: "Porcentaje inválido."}),
});

function generateUUID() {
  return crypto.randomUUID();
}

export function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      email: "",
      percentage: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values", values);
  }

  return (
    <Form {...form}>
      <form className=" space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="id"
          render={({field}) => (
            <FormItem>
              <FormLabel>CÓDIGO</FormLabel>
              <FormDescription className="text-xl font-semibold" {...field}>
                {(field.value = generateUUID().substring(0, 8).toUpperCase())}
              </FormDescription>
            </FormItem>
          )}
        />
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
        <Button className="bg-emerald-700 hover:bg-emerald-900" type="submit">
          Enviar
        </Button>
      </form>
    </Form>
  );
}

function CouponList() {
  // Aquí puedes agregar la lógica para obtener y mostrar la lista de cupones generados
  return (
    <div>
      <h2>Lista de Cupones Generados</h2>
      {/* Aquí puedes renderizar la lista de cupones */}
    </div>
  );
}

export default function HomePage() {
  const [view, setView] = useState<"form" | "list">("form");

  return (
    <div>
      <h1 className="text-center text-4xl font-medium">Cupones de Descuento</h1>
      <div className="mt-12 flex justify-center space-x-32">
        <Button
          className="rounded-lg bg-emerald-700 text-xl font-normal hover:bg-emerald-900"
          onClick={() => setView("form")}
        >
          Generar
        </Button>
        <Button
          className="rounded-lg bg-zinc-400 text-xl font-normal hover:bg-zinc-600"
          onClick={() => setView("list")}
        >
          Listar
        </Button>
      </div>
      <section className="mt-20 flex justify-center">
        {view === "form" ? <ProfileForm /> : <CouponList />}
      </section>
    </div>
  );
}
