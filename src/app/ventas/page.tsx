import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { getVentasConInfo } from "@/lib/getData";
import { VentaConInfo } from "@/types/types";

const page = async () => {
  const sales = await getVentasConInfo();

  const filteredSales = sales.filter((sale) => {
    return sale.estado.toLowerCase().includes("a"); // Aquí puedes implementar tu lógica de filtrado
  });

  const calcularTotalVentas = (ventas: VentaConInfo[]): number => {
    return ventas.reduce((acumulado, venta) => acumulado + venta.total, 0);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Ventas</h1>
        <Link href="/ventas/nueva">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Nueva Venta
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-black text-secondary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ventas Totales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${calcularTotalVentas(sales).toLocaleString("es-CO")}
            </div>
            <p className="text-xs text-muted-foreground">
              +20.1% del mes anterior
            </p>
          </CardContent>
        </Card>

        <Card className="bg-black text-secondary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Hoy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,429.40</div>
            <p className="text-xs text-muted-foreground">
              24 ventas realizadas hoy
            </p>
          </CardContent>
        </Card>

        <Card className="bg-black text-secondary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ventas Canceladas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sales.filter((sale) => sale.estado === "Pagado").length}
            </div>
            <p className="text-xs text-muted-foreground">Ventas canceladas</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 bg-black text-secondary">
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
                placeholder="Buscar ventas..."
                className="pl-8 w-full md:w-1/3"
              />
            </div>
          </div>

          <div className="rounded-md border">
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
                      <TableCell>{sale.fecha}</TableCell>
                      <TableCell>{sale.cliente}</TableCell>
                      <TableCell>{sale.estado}</TableCell>
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

export default page;
