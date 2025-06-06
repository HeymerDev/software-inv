import { AlertDelete } from "@/components/alert/alert-delete-product";
import { FormEditProduct } from "@/components/forms/edit/form-edit-product";
import { Button } from "@/components/ui/button";
import { getUserWithRoleServer } from "@/lib/auth";

import { ArrowLeft } from "lucide-react";

import Link from "next/link";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const productId = parseInt(id);

  const userData = await getUserWithRoleServer();

  if (!userData) {
    return redirect("/login");
  }

  if (userData.role === "Vendedor") {
    return redirect("/ventas");
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/productos">
          <Button
            variant="outline"
            size="icon"
            className="bg-black hover:bg-zinc-800 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 text-secondary" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-secondary">
          Editar Producto
        </h1>

        <AlertDelete
          description="Estas seguro de esta accion?"
          page="Producto"
          id={productId}
        />
      </div>
      <FormEditProduct id={productId} />
    </div>
  );
};

export default page;
