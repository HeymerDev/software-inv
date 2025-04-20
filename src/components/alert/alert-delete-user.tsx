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
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

interface AlertProps {
    page: string;
    description: string;
    role: string;
    id: string;
}

export const AlertDelete = ({ page, description, id, role }: AlertProps) => {
    const router = useRouter();

    const eliminarUsuario = async (id: string) => {
        const res = await fetch("/api/users", {
            method: "DELETE", // Usamos el método DELETE
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });

        const data = await res.json(); // Aquí se hace el parsing de la respuesta

        if (res.ok) {
            toast.message("Usuario eliminado correctamente", {
                description: "El Usuario ha sido eliminado de la BD.",
                duration: 3000,
            });
            setTimeout(() => {
                router.push("/usuarios");
            }, 2000); // Redirige a la lista de clientes
        } else {
            toast.message("Error al eliminar el Usuario", {
                description: data.error || "Error en el servidor",
                duration: 3000,
            });
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    disabled={role === "Administrador"}
                >
                    <Trash className="h-4 w-4" />
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
                    <AlertDialogCancel className="text-primary cursor-pointer">
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90 cursor-pointer"
                        onClick={() => eliminarUsuario(id)}
                    >
                        Eliminar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
            <Toaster theme="dark" />
        </AlertDialog>
    );
};
