import { AlertDelete } from "@/components/alert/alert-delete";
import FormEditCliente from "@/components/forms/edit/form-edit-cliente";
import { Button } from "@/components/ui/button";

import { ArrowLeft } from "lucide-react";

import Link from "next/link";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const clientId = parseInt(id);

  // Convertir el id a un número entero

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/clientes">
          <Button
            variant="outline"
            size="icon"
            className="bg-black hover:bg-zinc-800 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 text-secondary" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-secondary">
          Editar Cliente
        </h1>

        <AlertDelete
          description="Estas seguro de esta accion?"
          page="Cliente"
          id={clientId}
        />
      </div>
      <FormEditCliente id={clientId} />
    </div>
  );
};

export default page;
