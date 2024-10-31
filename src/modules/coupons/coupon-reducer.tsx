import {CouponActionType, type CouponAction, type CouponList} from "@/modules/coupons";

export const couponReducer = (state: CouponList, action: CouponAction) => {
  switch (action.type) {
    case CouponActionType.ADD_COUPON:
      return [...state, action.payload];
    default:
      throw new Error("Invalid action type");
  }
};
