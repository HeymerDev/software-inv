import { FormEditUser } from "@/components/forms/edit/form-edit-usuario";
import { Button } from "@/components/ui/button";
import { getUserWithRoleServer } from "@/lib/auth";
import { getUserByAuthId } from "@/lib/getData";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const userEdit = await getUserByAuthId(id)

  const userData = await getUserWithRoleServer();

  if (!userData) {
    return redirect("/login");
  }

  if (userData.role === "Bodega") {
    return redirect("/productos");
  }
  if (userData.role === "Vendedor") {
    return redirect("/ventas");
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/usuarios">
          <Button
            variant="outline"
            size="icon"
            className="bg-black hover:bg-zinc-800 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 text-secondary" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-secondary">
          Editar Usuario
        </h1>
      </div>
      {userEdit === null ?
        (<h2 className="text-center mt-14 font-extrabold text-6xl text-white">Usuario No encontrado</h2>)
        : <FormEditUser user={userEdit} />
      }
    </div>
  )
}

export default page