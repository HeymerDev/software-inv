"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";

interface AlertProps {
  page: string;
  description: string;
  id: number;
}

export const AlertDelete = ({ page, description, id }: AlertProps) => {
  const router = useRouter();

  const eliminarCliente = async (id: number) => {
    const res = await fetch("/api/delete-client", {
      method: "DELETE", // Usamos el método DELETE
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const data = await res.json(); // Aquí se hace el parsing de la respuesta

    if (res.ok) {
      toast.message("Cliente eliminado correctamente", {
        description: "El cliente ha sido eliminado de la BD.",
        duration: 3000,
      });
      setTimeout(() => {
        router.push("/clientes");
      }, 2000); // Redirige a la lista de clientes
    } else {
      toast.message("Error al eliminar el cliente", {
        description: data.error || "Error en el servidor",
        duration: 3000,
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="ml-auto cursor-pointer">
          <Trash className="mr-2 h-4 w-4" />
          Eliminar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-black text-secondary">
        <AlertDialogHeader>
          <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            {description} <br /> Eliminar un {page} no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-primary">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={() => eliminarCliente(id)}
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
      <Toaster theme="dark" />
    </AlertDialog>
  );
};
