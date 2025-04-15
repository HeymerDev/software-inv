// app/api/ventas/route.ts

import { NextResponse } from 'next/server';
import { crearVentaFactura } from '@/lib/createData'; // Asegúrate de importar la función correctamente
import { ProductoVenta } from '@/types/types';

export async function POST(request: Request) {
    try {
        const { clienteId, productos }: { clienteId: number, productos: ProductoVenta[] } = await request.json();

        // Llamar a la función que crea la venta con la factura
        await crearVentaFactura(clienteId, productos);

        return NextResponse.json({ message: 'Venta creada con éxito' }, { status: 200 });
    } catch (error) {
        console.error('Error al crear la venta: ', error);
        return NextResponse.json({ error: error || 'Error desconocido' }, { status: 500 });
    }
}
