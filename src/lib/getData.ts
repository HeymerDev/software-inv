import { serverClient } from "@/lib/supabaseClient"; // o donde tengas tu cliente configurado
import { Client, CustomUser, FullInvoiceItem, InvoiceWithClient, Product, TypeUser, VentaConInfo } from "@/types/types";

export const getVentasConInfo = async () => {
    const supabase = await serverClient();

    const { data, error } = await supabase
        .from("ventas_con_info")
        .select("*");

    if (error) {
        console.log("Error consultando la vista de ventas:", error);
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

export const getInvoices = async () => {
    const supabase = await serverClient();
    const { data, error } = await supabase.rpc('get_invoices_with_client');

    if (error) {
        console.error('Error al obtener facturas:', error);
        return [];
    }

    return data as InvoiceWithClient[]; // Cambia el tipo según tu esquema de facturas
}

export const getFullInvoices = async () => {
    const supabase = await serverClient();
    const { data, error } = await supabase
        .rpc('get_full_invoice_data');

    if (error) {
        console.error('Error al obtener las facturas:', error);
        return [];
    }

    return data as FullInvoiceItem[]; // Cambia el tipo según tu esquema de facturas
}

export const getClientById = async (id: number) => {
    const supabase = await serverClient();

    const { data, error } = await supabase
        .from("client")
        .select("*")
        .eq("id", id)
        .single(); // Obtiene un solo cliente por ID

    if (error) {
        console.log("Error consultando el cliente por ID:", error);
        return null;
    }

    return data as Client;
}

export const getProductById = async (id: number) => {
    const supabase = await serverClient();

    const { data, error } = await supabase
        .from("product")
        .select("*")
        .eq("id", id)
        .single(); // Obtiene un solo cliente por ID

    if (error) {
        console.log("Error consultando el producto por ID:", error);
        return null;
    }

    return data as Product;
}

export const getUsers = async () => {
    const supabase = await serverClient();

    const { data, error } = await  supabase.rpc("get_custom_users");

    if (error) {
        console.log('Error al obtener usuarios:', error);
        return [];
    }

    return data as CustomUser[];
}


export const getRoles = async () => {
    const supabase = await serverClient();

    const { data, error } = await supabase
        .from("typeuser")
        .select("*")

    if(error) return console.log(error)

    return data as TypeUser[];
}

export async function getUserByAuthId(id: string) {
    const supabase = await serverClient()
  
    const { data, error } = await supabase.rpc('get_user_by_auth_id', {
      p_auth_id: id
    }).single()
  
    if (error) {
      console.log('Error trayendo usuario:', error)
      return null
    }
  
    return data as CustomUser; // como usas limit 1, devuelves el primer resultado
  }