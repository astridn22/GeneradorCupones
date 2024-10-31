import {Coupon, CouponApi, CouponForm} from "@/modules/coupons";

export const api: CouponApi = {
  addCoupon: (coupon: CouponForm): Coupon => {
    // request to the server
    try {
      const code: string = Math.random().toString(36).substring(7);
      const newCoupon: Coupon = {...coupon, code};

      return newCoupon;
    } catch (error) {
      throw new Error("Error adding coupon");
    }
  },
  sendTo: (coupon: Coupon, email: string) => {
    // request to the server
    try {
      console.log(`Coupon ${coupon.code} sent to ${email}`);
    } catch (error) {
      throw new Error("Error sending coupon");
    }
  },
};
