"use client";

import {cn} from "@/lib/utils";
import {useCouponContext, CouponDrawer} from "@/modules/coupons";

type CouponsProps = {
  className?: string;
};

export function Coupons({className}: CouponsProps) {
  const [coupons] = useCouponContext();

  return (
    <ul className={cn(className)}>
      {coupons.map((coupon) => (
        <li key={coupon.code}>
          <CouponDrawer coupon={coupon} />
        </li>
      ))}
    </ul>
  );
}
