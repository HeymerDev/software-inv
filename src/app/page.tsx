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
  Package,
  Users,
  ShoppingCart,
  FileText,
  ArrowRight,
  Calendar,
} from "lucide-react";
import { redirect } from "next/navigation";

const recentSales = [
  {
    id: 1,
    client: "Cliente 1",
    date: "2023-10-01",
    total: "$100.00",
    status: "Completed",
  },
  {
    id: 2,
    client: "Cliente 2",
    date: "2023-10-02",
    total: "$200.00",
    status: "Pending",
  },
  {
    id: 3,
    client: "Cliente 3",
    date: "2023-10-03",
    total: "$300.00",
    status: "Completed",
  },
];

export default async function Page() {
  const userData = await getUserWithRoleServer();

  if (!userData) {
    return redirect("/login");
  }

  return (
    <>
      <div className="flex min-h-screen flex-col text-secondary ">
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
              <Card className="text-secondary bg-black">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Clientes
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
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

              <Card className="text-secondary bg-black">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Productos
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">200</div>
                  <p className="text-xs text-muted-foreground">
                    3 con bajo inventario, 4 sin stock
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

              <Card className="text-secondary bg-black">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ventas</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$200,000.00</div>
                  <p className="text-xs text-muted-foreground">
                    200 ventas totales
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

              <Card className="text-secondary bg-black">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Facturas
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">100</div>
                  <p className="text-xs text-muted-foreground"></p>
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
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 cursor-pointer hover:bg-black/30 transition-colors text-secondary bg-black">
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
                  <div className="space-y-4">
                    {recentSales.map((sale) => (
                      <div key={sale.id} className="flex items-center">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                          <Calendar className="h-4 w-4" />
                        </div>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {sale.client}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {sale.date}
                          </p>
                        </div>
                        <div className="ml-auto font-medium">{sale.total}</div>
                        <Badge
                          className="ml-2"
                          variant={
                            sale.status === "Completed"
                              ? "default"
                              : "destructive"
                          }
                        >
                          {sale.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-3 text-secondary bg-black">
                <CardHeader>
                  <CardTitle>Dinero Acumulado</CardTitle>
                  <CardDescription>Total de ventas por período</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Hoy</p>
                      <p className="text-sm text-muted-foreground">24 ventas</p>
                    </div>
                    <div className="font-bold">$1,429.40</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Esta semana
                      </p>
                      <p className="text-sm text-muted-foreground">
                        156 ventas
                      </p>
                    </div>
                    <div className="font-bold">$8,234.50</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Este mes
                      </p>
                      <p className="text-sm text-muted-foreground">
                        532 ventas
                      </p>
                    </div>
                    <div className="font-bold">$45,231.89</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Este año
                      </p>
                      <p className="text-sm text-muted-foreground">
                        3,245 ventas
                      </p>
                    </div>
                    <div className="font-bold">$325,459.32</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
