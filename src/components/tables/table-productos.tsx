"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Edit } from "lucide-react"
import { Product } from '@/types/types'
import Link from "next/link"
import { Button } from "../ui/button"
import { useState } from "react"


export const TableProductos = ({ products }: { products: Product[] }) => {

    const [searchTerm, setSearchTerm] = useState("");

    // Filtrar productos según el término de búsqueda
    const filteredProducts = products.filter(
        (product) =>
            product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.precio.toString().toLowerCase().includes(searchTerm.toLowerCase())
    ); 

    return (
        <Card className="bg-black text-secondary">
            <CardHeader>
                <CardTitle>Gestión de Productos</CardTitle>
                <CardDescription>Administre su inventario, actualice precios y controle el stock.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center mb-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Buscar productos..."
                            className="pl-8 w-full md:w-1/3"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="rounded-md border overflow-y-scroll">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-secondary">Nombre</TableHead>
                                <TableHead className="text-secondary">Descripcion</TableHead>
                                <TableHead className="text-secondary">Precio</TableHead>
                                <TableHead className="text-secondary">Stock</TableHead>
                                <TableHead className="text-secondary">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredProducts.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-4">
                                        No se encontraron productos
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredProducts.map((product) => {
                                    return (
                                        <TableRow key={product.id} className="hover:bg-zinc-900 cursor-pointer">
                                            <TableCell className="font-medium">{product.nombre}</TableCell>
                                            <TableCell className="line-clamp-1">{product.descripcion}</TableCell>
                                            <TableCell>${product.precio}</TableCell>
                                            <TableCell className={`${product.stock === 0 ? "text-red" : "text-secondary"}`}>{product.stock}</TableCell>
                                            <TableCell>
                                                <Link href={`/productos/editar/${product.id}`}>
                                                    <Button variant="ghost" size="icon">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}
