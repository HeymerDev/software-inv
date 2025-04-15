import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import Link from "next/link";

import { updateClient } from "@/lib/updateData";
import { getClientById } from "@/lib/getData";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormEditCliente = async ({ id }: { id: number }) => {
  async function updateClientAction(formData: FormData) {
    "use server";
    const nombre = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;

    if (!id || !nombre || !email || !phone || !address) {
      throw new Error("Faltan datos");
    }

    await updateClient(id, {
      nombre,
      email,
      telefono: phone,
      direccion: address,
    });

    revalidatePath("/clientes");
    redirect("/clientes");
  }

  const client = await getClientById(id);

  return (
    <form action={updateClientAction}>
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-fit md:inline-grid grid-cols-1 px-2 bg-zinc-800 rounded-sm gap-3 ">
          <TabsTrigger
            value="general"
            className="text-secondary data-[state=active]:bg-black rounded-sm transition-colors duration-[300ms] ease-in-out"
          >
            Información General
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6 bg-black">
          <Card className="bg-black text-secondary">
            <CardHeader>
              <CardTitle>Información General</CardTitle>
              <CardDescription>
                Edite la información básica del cliente.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre / Razón Social *</Label>
                <Input id="name" name="name" defaultValue={client?.nombre} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={client?.email}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono *</Label>
                <Input
                  id="phone"
                  name="phone"
                  defaultValue={client?.telefono}
                />
              </div>
            </CardContent>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Dirección *</Label>
                <Textarea
                  id="address"
                  name="address"
                  defaultValue={client?.direccion}
                  placeholder="Dirección del cliente"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4 mt-6">
        <Link href="/clientes">
          <Button variant="outline" className="cursor-pointer">
            Cancelar
          </Button>
        </Link>
        <Button className="cursor-pointer">
          <Save className="mr-2 h-4 w-4" />
          Guardar Cambios
        </Button>
      </div>
    </form>
  );
};

export default FormEditCliente;
