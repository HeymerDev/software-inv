import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Package } from "lucide-react";

import { Form } from "@/components/ui/form";

const page = () => {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md bg-black text-secondary">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary p-2 text-primary-foreground">
              <Package className="h-6 w-6" />
            </div>
          </div>
          <CardTitle className="text-2xl text-secondary">
            Iniciar Sesión
          </CardTitle>
          <CardDescription className="text-lg text-secondary">
            Ingrese sus credenciales para acceder al sistema de inventario y
            facturación
          </CardDescription>
        </CardHeader>
        <Form />
      </Card>
    </main>
  );
};

export default page;
