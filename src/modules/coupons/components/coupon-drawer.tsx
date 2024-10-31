import {Coupon} from "@/modules/coupons";

type CouponDrawerProps = {
  coupon: Coupon;
};

export function CouponDrawer({coupon: {code, email, percentage}}: CouponDrawerProps) {
  return (
    <article className="inline-flex w-full justify-between border border-slate-900/30 px-6 py-4 transition-colors duration-150 ease-in-out hover:border-slate-900">
      <header>
        <h5 className="font-medium">{email}</h5>
        <p>Cupon por {percentage}% de descuento</p>
      </header>
      <p className="my-auto w-fit rounded-2xl bg-muted px-4 py-1 text-muted-foreground">
        Codigo: {code}
      </p>
    </article>
  );
}
