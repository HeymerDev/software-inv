// app/actions/deleteClientAction.ts

// lib/deleteData.ts
import { serverClient } from "@/lib/supabaseClient";
import { revalidatePath } from "next/cache";

export async function deleteClientAction(id: number) {
    const supabase = await serverClient();

    try {
        // Intentamos eliminar el cliente
        const { error } = await supabase.from("client").delete().eq("id", id);

        if (error) {
            console.error("Error al eliminar el cliente:", error); // Log de error
            throw new Error("Error al eliminar el cliente: " + error.message);
        }

        // Revalidar la ruta y redirigir
        revalidatePath("/clientes");
    } catch (err) {
        console.error("Error en deleteClientAction:", err); // Log de error
        throw new Error("Error en la acción de eliminación: " + err);
    }
}

export async function deleteProductAction(id: number) {
    const supabase = await serverClient();

    try {
        // Intentamos eliminar el producto
        const { error } = await supabase.from("product").delete().eq("id", id);

        if (error) {
            console.error("Error al eliminar el producto:", error); // Log de error
            throw new Error("Error al eliminar el producto: " + error.message);
        }

        // Revalidar la ruta y redirigir
        revalidatePath("/productos");
    } catch (err) {
        console.error("Error en deleteProductAction:", err); // Log de error
        throw new Error("Error en la acción de eliminación: " + err);
    }
}





