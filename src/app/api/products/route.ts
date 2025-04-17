// app/api/delete-client/route.ts
import { deleteProductAction } from "@/lib/deleteData";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    try {
        const { id } = await req.json();

        if (!id || typeof id !== "number") {
            return NextResponse.json({ error: "ID inválido" }, { status: 400 });
        }

        await deleteProductAction(id);

        // ✅ Siempre retornamos JSON
        return NextResponse.json({ success: true, message: "Producto eliminado correctamente" });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return NextResponse.json({ error: err.message }, { status: 500 });
        }
        return NextResponse.json({ error: "Error desconocido" }, { status: 500 });
    }
}
