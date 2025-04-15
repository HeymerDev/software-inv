import { serverClient } from "@/lib/supabaseClient"; //
import { ProductoVenta } from "@/types/types";

export async function crearVentaFactura(clienteId: number, productos: ProductoVenta[]) {
    const supabase = await serverClient();

    const { error } = await supabase.rpc('crear_venta_factura', {
        p_cliente_id: clienteId,
        p_productos: productos.map((p) => ({
            id: p.id,
            price: p.price,
            quantity: p.quantity,
        })),
    });

    if (error) {
        throw new Error('Error al crear venta: ' + error.message);
    }
}