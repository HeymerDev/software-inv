import { Button } from "@/components/ui/button";
import { getUserWithRoleServer } from "@/lib/auth";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  ShoppingCart,
  FileText,
  ArrowRight,
  Calendar,
  Package,
} from "lucide-react";
import { redirect } from "next/navigation";

import {
  getClients,
  getProducts,
  getVentasConInfo,
  getInvoices,
} from "@/lib/getData";
import { VentaConInfo } from "@/types/types";
import { filtrarVentasPorPeriodo } from "@/utils/filtroVentas";

export default async function Page() {
  const userData = await getUserWithRoleServer();
  const clients = await getClients();
  const products = await getProducts();
  const invoices = await getInvoices();

  const sales = await getVentasConInfo();

  const salesFiltereds = filtrarVentasPorPeriodo(sales)

  const recentSales = sales
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
    .slice(0, 5)
    .map((venta) => ({
      venta_id: venta.venta_id,
      cliente: venta.cliente,
      fecha: new Date(venta.fecha).toLocaleDateString("es-CO"),
      total: `$${venta.total.toLocaleString("es-CO")}`,
      estado: venta.estado,
    }));

  const calcularTotalVentas = (ventas: VentaConInfo[]): number => {
    return ventas.reduce((acumulado, venta) => acumulado + venta.total, 0);
  };

  if (!userData) {
    return redirect("/login");
  }

  if (userData.role === "Bodega") {
    return redirect("/productos");
  }
  if (userData.role === "Vendedor") {
    return redirect("/ventas");
  }

  return (
    <>
      <div className="flex  flex-col text-secondary ">
        <main className="flex-1 p-6 md:p-10">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Bienvenido al sistema de inventario y facturación,{" "}
                {userData?.nombre}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {["Administrador", "Vendedor"].includes(userData?.role) && (
                <Card className="text-secondary bg-black">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Clientes
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{clients.length}</div>
                    <p className="text-xs text-muted-foreground">
                      Clientes registrados
                    </p>
                    <div className="mt-4">
                      <Link href="/clientes">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full bg-black"
                        >
                          Ver clientes
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )}

              {["Administrador", "Bodega"].includes(userData?.role) && (
                <Card className="text-secondary bg-black">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Productos
                    </CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{products.length}</div>
                    <p className="text-xs text-muted-foreground">
                      Productos registrados
                    </p>
                    <div className="mt-4">
                      <Link href="/productos">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full bg-black"
                        >
                          Ver productos
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )}

              {["Administrador", "Vendedor"].includes(userData?.role) && (
                <Card className="text-secondary bg-black">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Ventas
                    </CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ${calcularTotalVentas(sales).toLocaleString("es-CO")}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {sales.length} ventas totales
                    </p>
                    <div className="mt-4">
                      <Link href="/ventas">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full bg-black"
                        >
                          Ver ventas
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )}

              {["Administrador", "Vendedor"].includes(userData?.role) && (
                <Card className="text-secondary bg-black">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Facturas
                    </CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{invoices.length}</div>
                    <p className="text-xs text-muted-foreground">
                      Facturas Totales
                    </p>
                    <div className="mt-4">
                      <Link href="/facturas">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full bg-black"
                        >
                          Ver facturas
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {["Administrador", "Vendedor"].includes(userData?.role) && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 cursor-pointer hover:bg-black/30 transition-colors text-secondary bg-black">
                  <Link href="/ventas">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Ventas Recientes</CardTitle>
                        <CardDescription>
                          Las últimas 5 ventas realizadas
                        </CardDescription>
                      </div>
                      <Button variant="ghost" size="icon" className="ml-auto">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 mt-4">
                        {recentSales.map((sale) => (
                          <div
                            key={sale.venta_id}
                            className="flex items-center"
                          >
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
                              <Calendar className="h-4 w-4" />
                            </div>
                            <div className="ml-4 space-y-1">
                              <p className="text-sm font-medium leading-none">
                                {sale.cliente}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {sale.fecha}
                              </p>
                            </div>
                            <div className="ml-auto font-medium">
                              {sale.total}
                            </div>
                            <Badge
                              className="ml-2"
                              variant={
                                sale.estado === "Pagado"
                                  ? "default"
                                  : "destructive"
                              }
                            >
                              {sale.estado}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Link>
                </Card>

                <Card className="col-span-3 text-secondary bg-black">
                  <CardHeader>
                    <CardTitle>Dinero Acumulado</CardTitle>
                    <CardDescription>
                      Total de ventas por período
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Hoy</p>
                        <p className="text-sm text-muted-foreground">
                         {salesFiltereds.ventasHoy.length } ventas
                        </p>
                      </div>
                      <div className="font-bold">${salesFiltereds.totalHoy.toLocaleString("es-CO")}</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Esta semana
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {salesFiltereds.ventasSemana.length} ventas
                        </p>
                      </div>
                      <div className="font-bold">${salesFiltereds.totalSemana.toLocaleString("es-CO")}</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Este mes
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {salesFiltereds.ventasMes.length} ventas
                        </p>
                      </div>
                      <div className="font-bold">${salesFiltereds.totalMes.toLocaleString("es-CO")}</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Este año
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {salesFiltereds.ventasAnio.length} ventas
                        </p>
                      </div>
                      <div className="font-bold">${salesFiltereds.totalAnio.toLocaleString("es-CO")}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
