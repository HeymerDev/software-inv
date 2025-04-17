import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

import { getProducts } from "@/lib/getData"
import { TableProductos } from "@/components/tables/table-productos"

const page = async () => {

    const products = await getProducts();

    return (
        <div className="container mx-auto py-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold tracking-tight text-secondary">
                    Productos
                </h1>
                <Link href="/productos/nuevo">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Nuevo Producto
                    </Button>
                </Link>
            </div>

            <TableProductos products={products}/>

        </div>
    )
}

export default page