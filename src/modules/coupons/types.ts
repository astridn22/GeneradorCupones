import {z} from "zod";

export const couponFormSchema = z.object({
  email: z.string().email({message: "Ingresá un correo valido!"}),
  percentage: z
    .number()
    .min(1, {message: "Solo se aceptan porcentajes entre 1 y 100."})
    .max(100, {message: "Solo se aceptan porcentajes entre 1 y 100."}),
});

export type CouponForm = z.infer<typeof couponFormSchema>;

export type Coupon = z.infer<typeof couponFormSchema> & {code: string};

export enum CouponActionType {
  ADD_COUPON = "ADD_COUPON",
}

export type CouponAction = {type: CouponActionType; payload: Coupon};

export type CouponList = Array<Coupon>;

export interface CouponApi {
  addCoupon: (coupon: CouponForm) => Coupon;
  sendTo: (coupon: Coupon, email: string) => void;
}
