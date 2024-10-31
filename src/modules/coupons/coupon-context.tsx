"use client";

import {useContext, createContext, useReducer} from "react";

import {api, Coupon, couponReducer} from "@/modules/coupons";
import {CouponActionType, type CouponForm, type CouponList} from "@/modules/coupons";

const mock: CouponList = [
  {
    code: "123",
    email: "john@doe.com",
    percentage: 10,
  },
  {
    code: "123",
    email: "john@doe.com",
    percentage: 10,
  },
];

interface Context {
  coupons: CouponList;
  addCoupon: (coupon: CouponForm) => string | null;
  sendCoupon: (coupon: Coupon) => boolean;
}

const CouponContext = createContext({} as Context);

export function CouponProvider({children}: {children: React.ReactNode}) {
  // El use reducer lo usamos aca para poder tener el estado dentro del context
  const [state, dispatch] = useReducer(couponReducer, mock);

  function add(coupon: CouponForm): string | null {
    try {
      // Aca estamos llamando a la funcion addCoupon del api que esta en el archivo coupon-reducer.tsx
      // Esto es para simular una llamada a un servidor (puede tirar un error, por eso try catch)
      const myCoupon = api.addCoupon(coupon);

      // Aca estamos llamando al dispatch para agregar el cupon al estado
      // Otrar razon para el try catch es que el dispatch puede tirar un error si el action no es valido
      dispatch({type: CouponActionType.ADD_COUPON, payload: myCoupon});

      return myCoupon.code;
    } catch (error) {
      return null;
    }
  }

  function send(coupon: Coupon): boolean {
    try {
      // Aca simulamos el envio de un email desde la api
      // Puede tirar un error, por eso el try catch
      api.sendTo(coupon, coupon.email);

      return true;
    } catch (error) {
      return false;
    }
  }

  const context: Context = {
    coupons: state,
    addCoupon: add,
    sendCoupon: send,
  };

  return <CouponContext.Provider value={context}>{children}</CouponContext.Provider>;
}

export function useCouponContext(): [
  Context["coupons"],
  Context["addCoupon"],
  Context["sendCoupon"],
] {
  const {coupons, addCoupon, sendCoupon} = useContext(CouponContext);

  return [coupons, addCoupon, sendCoupon];
}
