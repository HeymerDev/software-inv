import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

import { getProducts } from "@/lib/getData"
import { TableProductos } from "@/components/tables/table-productos"
import { getUserWithRoleServer } from "@/lib/auth"
import { redirect } from "next/navigation"

const page = async () => {

    const products = await getProducts();
    const userData = await getUserWithRoleServer();

    if (!userData) {
        return redirect("/login");
    }

    if (userData.role === "Vendedor") {
        return redirect("/ventas");
    }

    return (
        <div className="container mx-auto py-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold tracking-tight text-secondary">
                    Productos
                </h1>
                <Link href="/productos/nuevo">
                    <Button className="bg-secondary text-primary hover:bg-gray-300 hover:text-primary">
                        <Plus className="mr-2 h-4 w-4" /> Nuevo Producto
                    </Button>
                </Link>
            </div>

            <TableProductos products={products} />

        </div>
    )
}

export default page