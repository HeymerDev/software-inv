
import { FormAddCliente } from '@/components/forms/add/form-add-cleinte'
import { Button } from '@/components/ui/button'
import { getUserWithRoleServer } from '@/lib/auth'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
  const userData = await getUserWithRoleServer();

  if (!userData) {
    return redirect("/login");
  }

  if (userData.role === "Bodega") {
    return redirect("/productos");
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/clientes">
          <Button
            variant="outline"
            size="icon"
            className="bg-black hover:bg-zinc-800 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 text-secondary" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-secondary">
          Crear Cliente
        </h1>
      </div>
      <FormAddCliente />
    </div>
  )
}

export default page