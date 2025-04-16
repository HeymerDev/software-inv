"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Minus, Plus, Search, ShoppingCart, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Client, Product, ProductoVenta } from "@/types/types";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";

const FormAddVenta = ({
  clients,
  products,
}: {
  clients: Client[];
  products: Product[];
}) => {
  const [selectedClient, setSelectedClient] = useState<Client>();
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<
    Array<{ id: number; name: string; price: number; quantity: number }>
  >([]);

  const router = useRouter();

  const handleCreateVenta = async () => {
    if (!selectedClient || cart.length === 0) return;

    try {
      const response = await fetch("/api/ventas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clienteId: selectedClient.id,
          productos: cart.map((item) => ({
            id: item.id,
            price: item.price,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Venta creada:", data);
        // Limpiar formulario si quieres
        setCart([]);
        setSelectedClient({ ...selectedClient, nombre: "" });

        toast.message("Venta Creada",{description: `La venta Creada para el cliente ${selectedClient.nombre} se creo exitosamente`})
        setTimeout(() => {
          router.push("/ventas");
        }, 2000);
      } else {
        console.log("Error al crear la venta:", data.error);
      }
    } catch (error) {
      console.log("Error al enviar la solicitud:", error);
    }
  };
  const filteredProducts = products.filter((product) =>
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product: ProductoVenta) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.16; // 16% tax
  const total = subtotal + tax;

  return (
    <>
      <div className="space-y-6">
        <Card className="bg-black text-secondary">
          <CardHeader>
            <CardTitle>Información de la Venta</CardTitle>
            <CardDescription>
              Seleccione el cliente y los productos para esta venta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="client">Cliente</Label>
                <Select
                  value={selectedClient?.nombre}
                  onValueChange={(value) => {
                    console.log(value)
                    const client = clients.find((c) => c.nombre === value);
                    console.log("Cliente seleccionado:", client); // Verifica qué cliente se seleccionó
                    setSelectedClient(client);
                  }}
                >
                  <SelectTrigger id="client">
                    <SelectValue placeholder="Seleccionar cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.nombre}>
                        {client.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black text-secondary">
          <CardHeader>
            <CardTitle>Productos</CardTitle>
            <CardDescription>
              Busque y agregue productos a la venta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar productos..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-secondary">Nombre</TableHead>
                      <TableHead className="text-secondary">Precio</TableHead>
                      <TableHead className="text-secondary">Stock</TableHead>
                      <TableHead className="text-secondary"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">
                          {product.nombre}
                        </TableCell>
                        <TableCell>${product.precio.toFixed(2)}</TableCell>
                        <TableCell>
                          {product.stock > 0 ? (
                            <Badge
                              variant="default"
                              className="bg-secondary text-primary"
                            >
                              {product.stock} disponibles
                            </Badge>
                          ) : (
                            <Badge variant="destructive">Sin stock</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            onClick={() =>
                              addToCart({
                                id: product.id,
                                name: product.nombre,
                                price: product.precio,
                                quantity: 1,
                              })
                            }
                            disabled={product.stock === 0}
                            className="bg-secondary hover:bg-primary text-primary"
                          >
                            <Plus className="h-4 w-4 text-primary" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className="sticky top-20 bg-black text-secondary">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Carrito de Compra
            </CardTitle>
            <CardDescription>
              Productos seleccionados para esta venta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {cart.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                El carrito está vacío
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-secondary">Producto</TableHead>
                      <TableHead className="text-secondary">Precio</TableHead>
                      <TableHead className="text-secondary">Cantidad</TableHead>
                      <TableHead className="text-secondary">Subtotal</TableHead>
                      <TableHead className="text-secondary"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cart.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {item.name}
                        </TableCell>
                        <TableCell>${item.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6 bg-black text-secondary"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span>{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6 bg-black text-secondary"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          ${(item.price * item.quantity).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Impuesto (16%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-secondary text-primary"
              size="lg"
              onClick={handleCreateVenta}
              disabled={cart.length === 0 || !selectedClient}
            >
              Crear Venta
            </Button>
          </CardFooter>
        </Card>
        <Toaster theme="dark"/>
      </div>
    </>
  );
};

export default FormAddVenta;
