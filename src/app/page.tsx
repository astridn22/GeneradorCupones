import {Button} from "@/components/ui/button";

export default function HomePage() {
  return (
    <div>
      <h1 className="text-center text-4xl font-medium">Cupones de Descuento</h1>
      <Button className="rounde-lg mt-10 bg-teal-600 hover:bg-teal-800">Generar</Button>
    </div>
  );
}
