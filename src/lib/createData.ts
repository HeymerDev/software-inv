import { serverClient } from "@/lib/supabaseClient"; //
import { Client, Product, ProductoVenta } from "@/types/types";

export async function crearVentaFactura(clienteId: number, productos: ProductoVenta[]) {
    const supabase = await serverClient();
     // Verifica que los datos sean correctos.

    const { error } = await supabase.rpc('crear_venta_factura', {
        p_cliente_id: clienteId,
        p_productos: productos.map((p) => ({
            id: p.id,
            price: p.price,
            quantity: p.quantity,
        })),
    });

    if (error) {
        console.log("Error Supabase:", error);  // Imprime el error detallado
        throw new Error('Error al crear venta: ' + error.message);
    }
}

export async function crearCliente(cliente: Client) {
    const supabase = await serverClient();

    const {error} = await supabase
                    .from("client")
                    .insert(cliente)

    if(error) {
        console.log(error);
    }

    console.log("Cliente creado con exito");

};


export async function crearProducto(product: Omit<Product, "id">) {
    const supabase = await serverClient();

    const {error} = await supabase
                    .from("product")
                    .insert(product)

    if(error) {
        console.log(error);
    }

    console.log("Producto creado con exito");
    
}