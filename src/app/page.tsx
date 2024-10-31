"use client";

import {useReducer} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Send} from "lucide-react";
import Swal from "sweetalert2";

import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";

const couponSchema = z.object({
  id: z.string(),
  email: z.string().email({message: "Correo electrónico inválido."}),
  percentage: z
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
      id: generateUUID(),
      email: "",
      percentage: 0,
    },
  });

  function onSubmit(values: Coupon) {
    dispatch({
      type: "ADD_COUPON",
      payload: values,
    });

    showAlert();
    form.reset({id: generateUUID(), email: "", percentage: 0});
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
              <FormControl>
                <p className="text-xl font-semibold" {...field}>
                  {field.value}
                </p>
              </FormControl>
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
      <h1 className="text-center text-4xl font-medium">Cupones de Descuento</h1>
      <div className="mt-32 grid grid-cols-2 space-x-32">
        <section className="flex justify-center">
          <ProfileForm dispatch={dispatch} />
        </section>
        <section>
          <ul className="space-y-6">
            {coupons.map((coupon) => (
              <li key={coupon.id}>
                {coupon.id} - {coupon.email} - {coupon.percentage}%
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
