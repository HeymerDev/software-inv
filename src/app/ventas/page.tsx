import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Plus } from "lucide-react";
import Link from "next/link";
import { getVentasConInfo } from "@/lib/getData";
import { VentaConInfo } from "@/types/types";
import TableVentas from "@/components/tables/table-ventas";

const page = async () => {
  const sales = await getVentasConInfo();

  const calcularTotalVentas = (ventas: VentaConInfo[]): number => {
    return ventas.reduce((acumulado, venta) => acumulado + venta.total, 0);
  };

  const fechaHoy = new Date().toISOString().split("T")[0];
  const ventasHoy = sales.filter((sale) => sale.fecha.split("T")[0] == fechaHoy);  

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-secondary">
          Ventas
        </h1>
        <Link href="/ventas/nueva">
          <Button className="bg-secondary text-primary">
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
            <p className="text-xs text-muted-foreground">Obtenidos En ventas</p>
          </CardContent>
        </Card>

        <Card className="bg-black text-secondary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Hoy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ventasHoy.length}</div>
            <p className="text-xs text-muted-foreground">
              ventas realizadas hoy
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

      <TableVentas sales={sales} />
    </div>
  );
};

export default page;
