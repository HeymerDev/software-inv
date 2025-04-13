"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Search } from "lucide-react";
import Link from "next/link";
import { Client } from "@/types/types";
import { Edit } from "lucide-react";

import { useState } from "react";
import { Button } from "../ui/button";

interface Props {
  clients: Client[];
}

const TableClient = ({ clients }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredClients = clients.filter((client: Client) => {
    if (!searchTerm) return true;
    return client.nombre?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <Card className="bg-black text-secondary mt-6">
        <CardHeader>
          <CardTitle>Gestión de Clientes</CardTitle>
          <CardDescription>
            Administre la información de sus clientes y vea su historial de
            compras.
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-black text-secondary">
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar clientes..."
                className="pl-8 w-full md:w-1/3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    // Aquí puedes implementar la lógica de búsqueda
                  }
                }}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-secondary">Nombre</TableHead>
                  <TableHead className="text-secondary">Email</TableHead>
                  <TableHead className="text-secondary">Teléfono</TableHead>
                  <TableHead className="hidden md:table-cell text-secondary">
                    Dirección
                  </TableHead>
                  <TableHead className="text-secondary">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No se encontraron clientes
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredClients.map((client: Client) => (
                    <TableRow
                      key={client.id}
                      className="hover:bg-zinc-900 cursor-pointer"
                    >
                      <TableCell className="font-medium">
                        {client.nombre}
                      </TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell>{client.telefono}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {client.direccion},
                      </TableCell>
                      <TableCell>
                        <Link href={`/clientes/editar/${client.id}`}>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default TableClient;
