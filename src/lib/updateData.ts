import { serverClient } from "@/lib/supabaseClient"; // o 
import { Client, CustomUser, Product } from "@/types/types";
import { supabaseAdmin } from "./subaseAdminClient";

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

export const updateUser = async (id: string, data: Omit<CustomUser, "id" | "auth_id">) => {

    const supabase = await serverClient();

    const { error: adminError } = await supabase
        .from("users")
        .update({
            nombre: data.nombre,
            email: data.email,
            contraseña: data.password,
            typeuser_id: parseInt(data.role)
        })
        .eq("authId", id)
    
    if(adminError) return console.log(adminError)

    const { error: authError } = await supabaseAdmin
        .auth.admin.updateUserById(id, {
            email: data.email,
            password: data.password,
            email_confirm: true,
        })
    
    if (authError) return console.log(authError);
    
    return "Usuario Editado Correctamente"

}