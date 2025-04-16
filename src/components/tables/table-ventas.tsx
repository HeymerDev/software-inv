"use client";

import { Input } from "@/components/ui/input";
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
} from "../ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

import { useState } from "react";
import { VentaConInfo } from "@/types/types";

interface Props {
  sales: VentaConInfo[];
}

const TableVentas = ({ sales }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredSales = sales.filter((sale) => {
    if (!searchTerm) return true; // Si no hay término de búsqueda, mostrar todas las ventas
    return sale.cliente.toLowerCase().includes(searchTerm.toLowerCase()); // Aquí puedes implementar tu lógica de filtrado
  });

  return (
    <div>
      <Card className="bg-black text-secondary mt-6">
        <CardHeader>
          <CardTitle>Historial de Ventas</CardTitle>
          <CardDescription>
            Vea todas las ventas realizadas y su estado actual.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar ventas Por cliente..."
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

          <div className="rounded-md border max-h-[400px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-secondary">ID</TableHead>
                  <TableHead className="text-secondary">Fecha</TableHead>
                  <TableHead className="text-secondary">Cliente</TableHead>
                  <TableHead className="text-secondary">Artículos</TableHead>
                  <TableHead className="text-secondary">Total</TableHead>
                  <TableHead className="text-secondary">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSales.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No se encontraron ventas
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSales.map((sale) => (
                    <TableRow
                      key={sale.venta_id}
                      className="hover:bg-zinc-900 cursor-pointer"
                    >
                      <TableCell className="font-medium">
                        #{sale.venta_id}
                      </TableCell>
                      <TableCell>
                        {new Date(sale.fecha).toISOString().split("T")[0]}
                      </TableCell>
                      <TableCell>{sale.cliente}</TableCell>
                      <TableCell>{sale.cantidad_productos}</TableCell>
                      <TableCell>{sale.total}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            sale.estado === "Pagado" ? "default" : "destructive"
                          }
                        >
                          {sale.estado}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TableVentas;
