"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {Send} from "lucide-react";
import {useForm} from "react-hook-form";
import Swal from "sweetalert2";

import {useCouponContext} from "../coupons/coupon-context";

import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";
import {Coupon, type CouponForm, couponFormSchema} from "@/modules/coupons";

type ProfileFormProps = {
  className?: string;
};

export function ProfileForm({className}: ProfileFormProps) {
  const [_, addCoupon, sendCoupon] = useCouponContext();

  function throwSuccessAlert({code, email}: Omit<Coupon, "percentage">) {
    Swal.fire({
      title: "¡Éxito!",
      text: `El cupón ${code} se ha enviado correctamente a ${email} 🎉`,
      icon: "success",
      confirmButtonText: "Aceptar",
    });
  }

  function throwFailedAlert(message?: string) {
    Swal.fire({
      title: "Error 😅",
      text: `Algo ha fallado. ${message}`,
      icon: "error",
      confirmButtonText: "Salir",
    });
  }

  const form = useForm<CouponForm>({
    resolver: zodResolver(couponFormSchema),
    // Tu default value no puede ser 0 porque en el schema tenes un minimo de 1
    defaultValues: {
      email: "",
      percentage: 1, // Cambie el valor por defecto a 1,
    },
  });

  function onSubmit(values: CouponForm) {
    const code = addCoupon(values);

    if (code === null) {
      throwFailedAlert("El cupón no ha podido ser creado.");

      return;
    }

    const isSent = sendCoupon({code, ...values});

    if (!isSent) {
      throwFailedAlert("El cupón no ha podido ser enviado.");

      return;
    }

    throwSuccessAlert({code, email: values.email});
    form.reset();
  }

  return (
    <Form {...form}>
      <form className={cn("space-y-6", className)} onSubmit={form.handleSubmit(onSubmit)}>
        {/* <FormField
          control={form.control}
          name="id"
          render={({field}) => (
            <FormItem>
              <FormLabel>Código</FormLabel>
              <FormControl>
                <Input disabled className="w-full" {...field} />
                <p className="text-xl font-semibold" {...field}>
                  {field.value}
                </p>
              </FormControl>
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="example@example.com" {...field} />
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
        {/* Si el color base es muy oscuro el hover queda mejor si achicas el tono */}
        <Button
          className="inline-flex max-w-56 gap-3 self-end bg-emerald-500 hover:bg-emerald-600/80"
          type="submit"
        >
          <Send />
          Enviar descuento
        </Button>
      </form>
    </Form>
  );
}
