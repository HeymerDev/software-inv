import { FormEditUser } from "@/components/forms/edit/form-edit-usuario";
import { Button } from "@/components/ui/button";
import { getUserByAuthId } from "@/lib/getData";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const userEdit = await getUserByAuthId(id)

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
        : <FormEditUser user={userEdit}/>
    }
  </div>
  )
}

export default page