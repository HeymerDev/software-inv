import TableFacturas from "@/components/tables/table-facturas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserWithRoleServer } from "@/lib/auth";
import { getFullInvoices } from "@/lib/getData";
import { InvoiceWithClient } from "@/types/types";
import { FileText } from "lucide-react";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";

const page = async () => {
  const invoices = await getFullInvoices();
  const invoicesUnique = Array.from(
    new Map(invoices.map(invoice => [invoice.invoice_id, invoice])).values()
  );

  const userData = await getUserWithRoleServer();

  if (!userData) {
    return redirect("/login");
  }

  if (userData.role === "Bodega") {
    return redirect("/productos");
  }

  const calcularTotalFacturado = (invoices: InvoiceWithClient[]) => {
    return invoices.reduce((acumulado, invoice) => {
      return acumulado + invoice.total;
    }, 0);
  };

  const calcularTotalFacturadoPendiente = (invoices: InvoiceWithClient[]) => {
    return invoices.reduce((acumulado, invoice) => {
      return acumulado + (invoice.estado === "No Pagado" ? invoice.total : 0);
    }, 0);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-secondary">
          Facturas
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-black text-secondary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Facturado
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${calcularTotalFacturado(invoicesUnique).toLocaleString("es-CO")}
            </div>
            <p className="text-xs text-muted-foreground">
              {invoicesUnique.length} facturas emitidas
            </p>
          </CardContent>
        </Card>

        <Card className="bg-black text-secondary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Facturas Pendientes
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {calcularTotalFacturadoPendiente(invoicesUnique).toLocaleString(
                "es-CO"
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {invoicesUnique.filter((inv) => inv.estado === "No Pagado").length}{" "}
              facturas pendientes
            </p>
          </CardContent>
        </Card>

        <Card className="bg-black text-secondary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Facturas Canceladas
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$349.99</div>
            <p className="text-xs text-muted-foreground">
              {invoicesUnique.filter((inv) => inv.estado === "Pagado").length}{" "}
              facturas canceladas
            </p>
          </CardContent>
        </Card>
      </div>

      <TableFacturas invoices={invoicesUnique} />
      <Toaster theme="dark" />
    </div>
  );
};

export default page;
