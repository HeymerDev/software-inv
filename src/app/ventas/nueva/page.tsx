import FormAddVenta from "@/components/forms/add/form-add-venta";
import { getClients, getProducts } from "@/lib/getData";

const page = async () => {
  const clients = await getClients();
  const products = await getProducts();

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Nueva Venta</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FormAddVenta clients={clients} products={products} />
      </div>
    </div>
  );
};

export default page;
