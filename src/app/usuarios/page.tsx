import { TableUsuarios } from "@/components/tables/table-usuarios"
import { Button } from "@/components/ui/button"
import { getUsers } from "@/lib/getData"
import { Plus } from "lucide-react"
import Link from "next/link"

const page = async () => {

    const usuarios = await getUsers();

    return (
        <div className="container mx-auto py-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold tracking-tight text-secondary">
                    Usuarios
                </h1>
                <Link href="/usuarios/nuevo">
                    <Button className="bg-secondary text-primary">
                        <Plus className="mr-2 h-4 w-4" /> Nuevo Usuario
                    </Button>
                </Link>
            </div>

            <TableUsuarios usuarios={usuarios}/>
        </div>
    )
}

export default page