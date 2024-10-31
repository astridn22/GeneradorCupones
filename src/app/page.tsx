import {Coupons} from "@/modules/coupons";
import {CouponProvider} from "@/modules/coupons/coupon-context";
import {ProfileForm} from "@/modules/profile";

export default function HomePage() {
  return (
    <section className="flex h-full">
      <CouponProvider>
        <aside className="flex flex-1 flex-col items-center justify-center">
          <h3 className="w-full px-12 text-center text-2xl font-medium">
            Enviá el cupon a quien quieras!😉
          </h3>
          <ProfileForm className="flex w-full flex-col justify-center px-12 py-8" />
        </aside>
        <section className="w-[50rem] border-s border-slate-900/30">
          <header className="w-full border-b border-slate-900/30 py-3">
            <h3 className="w-full px-12 text-center text-3xl font-medium">Cupones que enviaste</h3>
          </header>

          <div className="p-4">
            <Coupons className="flex flex-col gap-4" />
          </div>
        </section>
      </CouponProvider>
    </section>
  );
}
