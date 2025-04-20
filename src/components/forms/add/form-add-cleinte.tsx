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
import { crearCliente } from "@/lib/createData";
import { Save } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

export const FormAddCliente = () => {

  async function createClientAction(formData: FormData) {
    "use server";
    const id = formData.get("id") as string
    const nombre = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;

    if (!id || !nombre || !email || !phone || !address) {
      throw new Error("Faltan datos");
    }

    await crearCliente({ id: parseInt(id), nombre, email, telefono: phone, direccion: address })
    revalidatePath("/clientes");
    redirect("/clientes");
  };

  return (
    <form action={createClientAction}>
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
                Ingrese la información del cliente.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre / Razón Social *</Label>
                <Input id="name" name="name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="id">Numero de cedula</Label>
                <Input id="id" name="id" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono *</Label>
                <Input
                  id="phone"
                  name="phone"
                />
              </div>
            </CardContent>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Dirección *</Label>
                <Textarea
                  id="address"
                  name="address"
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
          <Button variant="outline" className="cursor-pointer bg-black text-secondary hover:bg-zinc-900 hover:text-secondary">
            Cancelar
          </Button>
        </Link>
        <Button className="cursor-pointer text-primary bg-secondary hover:bg-gray-200 hover:text-primary">
          <Save className="mr-2 h-4 w-4" />
          Crear Cliente
        </Button>
      </div>
    </form>
  )
}
