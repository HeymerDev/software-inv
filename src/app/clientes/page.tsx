import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

import { getClients } from "@/lib/getData";
import TableClient from "@/components/tables/table-cliente";

export default async function ClientsPage() {
  const clients = await getClients();

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-secondary">
          Clientes
        </h1>
        <Link href="/clientes/nuevo">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Nuevo Cliente
          </Button>
        </Link>
      </div>

      <TableClient clients={clients} />
    </div>
  );
}
