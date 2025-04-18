"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Edit, Trash } from "lucide-react"
import { CustomUser } from '@/types/types'
import Link from "next/link"
import { Button } from "../ui/button"
import { useState } from "react"
import { Badge } from "../ui/badge"


export const TableUsuarios = ({ usuarios }: { usuarios: CustomUser[] }) => {

  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = usuarios.filter((user) => user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || user.role.toLowerCase().includes(searchTerm.toLowerCase()))
  return (
    <Card className="bg-black text-secondary">
      <CardHeader>
        <CardTitle>Gestión de Usuarios</CardTitle>
        <CardDescription>Administre los usuarios de su sistema y sus roles.</CardDescription>
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

        <div className="rounded-md border max-h-[400px] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-secondary">Nombre</TableHead>
                <TableHead className="text-secondary">Email</TableHead>
                <TableHead className="text-secondary">Rol</TableHead>
                <TableHead className="text-secondary">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    No se encontraron productos
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => {
                  return (
                    <TableRow key={user.id} className="hover:bg-zinc-900 cursor-pointer">
                      <TableCell className="font-medium">{user.nombre}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                          user.role === "Administrador" ? 
                          "default" : user.role === "Vendedor" 
                          ? "secondary" : "outline"
                          }
                          className={`${user.role === "Bodega" && "text-white"}`}
                        >
                            {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Link href={`/productos/editar/${user.id}`}>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>

                        <Button variant="ghost" size="icon" disabled={user.role === "Administrador"}>
                            <Trash className="h-4 w-4" />
                        </Button>
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
