"use client";

import {useReducer} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Send} from "lucide-react";
import Swal from "sweetalert2";
import {Kanit} from "next/font/google";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const kanit = Kanit({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const couponSchema = z.object({
  id: z.string(),
  email: z.string().email({message: "Correo electrónico inválido."}),
  discount: z
    .number()
    .min(1, {message: "Porcentaje inválido."})
    .max(100, {message: "Porcentaje inválido."}),
});

type Coupon = z.infer<typeof couponSchema>;

type Action = {type: "ADD_COUPON"; payload: Coupon};

const initialState: Coupon[] = [];

const couponReducer = (state: Coupon[], action: Action) => {
  switch (action.type) {
    case "ADD_COUPON":
      return [...state, action.payload];
    default:
      return state;
  }
};

function generateUUID() {
  return crypto.randomUUID().substring(0, 8).toUpperCase();
}

function showAlert() {
  Swal.fire({
    title: "¡Éxito!",
    text: "El cupón se ha enviado correctamente.",
    icon: "success",
    confirmButtonText: "Aceptar",
  });
}

type ProfileFormProps = {
  dispatch: React.Dispatch<Action>;
};

export function ProfileForm({dispatch}: ProfileFormProps) {
  const form = useForm<Coupon>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      id: "",
      email: "",
      discount: 0,
    },
  });

  function onSubmit(values: Coupon) {
    values.id = generateUUID();

    dispatch({
      type: "ADD_COUPON",
      payload: values,
    });

    showAlert();
    form.reset({id: generateUUID(), email: "", discount: 0});
  }

  return (
    <Form {...form}>
      <form
        className="h-72 w-72 space-y-6 rounded-lg bg-neutral-100 p-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="email@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discount"
          render={({field}) => (
            <FormItem>
              <FormLabel>Descuento</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Descuento"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full bg-emerald-700 align-bottom hover:bg-emerald-900" type="submit">
          <Send />
        </Button>
      </form>
    </Form>
  );
}

export default function HomePage() {
  const [coupons, dispatch] = useReducer(couponReducer, initialState);

  return (
    <div>
      <h1 className={cn("mt-4 text-center text-5xl font-normal", kanit.className)}>
        Generá tu cupón!
      </h1>
      <div className="mt-28 grid grid-cols-2">
        <section className="flex justify-center">
          <ProfileForm dispatch={dispatch} />
        </section>
        <section>
          <Table className="rounded-lg bg-neutral-100">
            <TableCaption className="mt-4">Historial</TableCaption>
            <TableHeader>
              <TableRow className="text-lg font-normal">
                <TableHead>Código</TableHead>
                <TableHead>Enviado a</TableHead>
                <TableHead>Descuento</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell className="font-medium">{coupon.id}</TableCell>
                  <TableCell>{coupon.email}</TableCell>
                  <TableCell>{coupon.discount}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </div>
    </div>
  );
}
