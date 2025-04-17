import { serverClient } from "@/lib/supabaseClient"; // o 
import { Client, Product } from "@/types/types";

export const updateClient = async (id: number, data: Omit<Client, "id">) => {
    const supabase = await serverClient();

    const { error } = await supabase
        .from("client")
        .update(data)
        .eq("id", id);

    if (error) {
        return { error };
    }
    return "Cliente actualizado correctamente";

}

export const updateProduct = async (id: number, data: Omit<Product, "id">) => {
    const supabase = await serverClient();

    const { error } = await supabase
        .from("product")
        .update(data)
        .eq("id", id);

    if (error) {
        return { error };
    }
    return "Producto actualizado correctamente";
}