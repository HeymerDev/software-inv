import { serverClient } from "@/lib/supabaseClient"; // o donde tengas tu cliente configurado
import { Client, Product, VentaConInfo } from "@/types/types";

export const getVentasConInfo = async () => {
    const supabase = await serverClient();

    const { data, error } = await supabase
        .from("ventas_con_info")
        .select("*");

    if (error) {
        console.error("Error consultando la vista de ventas:", error);
        return [];
    }

    return data as VentaConInfo[];
};

export const getClients = async () => {
    const supabase = await serverClient();

    const { data, error } = await supabase.from("client").select("*");

    if (error) {
        console.error("Error consultando la tabla de clientes:", error);
        return [];
    }

    return data as Client[];
}

export const getProducts = async () => {
    const supabase = await serverClient();

    const { data, error } = await supabase.from("product").select("*");

    if (error) {
        console.log("Error consultando la tabla de productos:", error);
        return [];
    }

    return data as Product[]; // Cambia el tipo según tu esquema de productos
};