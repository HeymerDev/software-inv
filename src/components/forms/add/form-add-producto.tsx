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
import { crearProducto } from "@/lib/createData";
import { Save } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

export const FormAddProduct = () => {
  async function createProductAction(formData: FormData) {
    "use server";

    const nombre = formData.get("name") as string;
    const descripcion = formData.get("description") as string;
    const stock = formData.get("stock") as string;
    const precio = formData.get("precio") as string;

    if (!nombre || !descripcion || !stock || !precio) {
      throw new Error("Faltan datos");
    }

    await crearProducto({ nombre, descripcion, stock: parseInt(stock), precio: parseInt(precio) })
    revalidatePath("/productos");
    redirect("/productos");
  };

  return (
    <form action={createProductAction}>
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
                Ingrese la informacion del producto
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del producto *</Label>
                <Input id="name" name="name" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripcion *</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Descripcion de prodcuto"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="precio">Precio *</Label>
                <Input
                  id="precio"
                  name="precio"
                  type="number"
                  required
                  min={1000}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  placeholder="El valor debe ser mayor a 0"
                  required
                  min={1}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4 mt-6">
        <Link href="/productos">
          <Button variant="outline" className="cursor-pointer bg-black text-secondary hover:bg-zinc-900 hover:text-secondary">
            Cancelar
          </Button>
        </Link>
        <Button className="cursor-pointer text-primary bg-secondary hover:bg-gray-200 hover:text-primary">
          <Save className="mr-2 h-4 w-4" />
          Crear Producto
        </Button>
      </div>
    </form>
  )
}
