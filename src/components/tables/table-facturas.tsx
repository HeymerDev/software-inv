"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { FullInvoiceItem } from "@/types/types";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { generateInvoicePDF } from "@/utils/createInvoicePDF";

interface Props {
  invoices: FullInvoiceItem[];
}

const TableFacturas = ({ invoices }: Props) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.invoice_id.toString().includes(searchTerm.toLowerCase()) ||
      invoice.estado.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.fecha_emision.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Card className="bg-black text-secondary mt-6">
        <CardHeader>
          <CardTitle>Historial de Facturas</CardTitle>
          <CardDescription>
            Vea todas las facturas emitidas y su estado actual.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar facturas..."
                className="pl-8 w-full md:w-1/3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-secondary">Número</TableHead>
                  <TableHead className="text-secondary">Fecha</TableHead>
                  <TableHead className="text-secondary">Cliente</TableHead>
                  <TableHead className="text-secondary">Monto</TableHead>
                  <TableHead className="text-secondary">Estado</TableHead>
                  <TableHead className="text-secondary"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No se encontraron facturas
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInvoices.map((invoice, index) => (
                    <TableRow
                      key={index}
                      className="hover:bg-zinc-900 cursor-pointer"
                      onClick={() =>
                        router.push(`/facturas/${invoice.invoice_id}`)
                      }
                    >
                      <TableCell className="font-medium">
                        FA-#{invoice.invoice_id}
                      </TableCell>
                      <TableCell>
                        {
                          new Date(invoice.fecha_emision)
                            .toISOString()
                            .split("T")[0]
                        }
                      </TableCell>
                      <TableCell>{invoice.client_name}</TableCell>
                      <TableCell>{invoice.total}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            invoice.estado === "Pagado"
                              ? "default"
                              : "destructive"
                          }
                        >
                          {invoice.estado}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            generateInvoicePDF(invoices, invoice.invoice_id);
                            // Simular descarga
                            toast.message("Descargando factura...", {
                              description: `Factura ${invoice.invoice_id} descargada correctamente.`,
                            });
                          }}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
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

export default TableFacturas;
