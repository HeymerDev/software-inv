import jsPDF from "jspdf";
import autoTable, { CellHookData } from "jspdf-autotable";
import { FullInvoiceItem } from "@/types/types";

export const generateInvoicePDF = (invoiceItems: FullInvoiceItem[], id: number) => {
    if (!invoiceItems || invoiceItems.length === 0) return;

    const doc = new jsPDF();
    const invoice = invoiceItems.filter(item => item.invoice_id === id)[0];

    // Encabezado
    doc.setFontSize(18);
    doc.text("Factura", 14, 20);

    doc.setFontSize(12);
    doc.text(`Cliente: ${invoice.client_name}`, 14, 30);
    doc.text(`Email: ${invoice.client_email}`, 14, 36);
    doc.text(`Teléfono: ${invoice.client_telefono}`, 14, 42);
    doc.text(`Dirección: ${invoice.client_direccion}`, 14, 48);
    doc.text(`Fecha emisión: ${new Date(invoice.fecha_emision).toLocaleDateString()}`, 14, 54);
    doc.text(`Estado: ${invoice.estado}`, 14, 60);
    doc.text(`ID Factura: ${invoice.invoice_id}`, 14, 66);

    const tableData = invoiceItems.map(item => [
        item.product_name,
        item.cantidad.toString(),
        `$${item.precio_unitario.toFixed(2)}`,
        `$${item.subtotal.toFixed(2)}`
    ]);

    let finalY = 75;

    autoTable(doc, {
        startY: finalY,
        head: [["Producto", "Cantidad", "Precio Unitario", "Subtotal"]],
        body: tableData,
        didDrawCell: (data: CellHookData) => {
            if (data && data.cursor && typeof data.cursor.y === "number") {
                finalY = data.cursor.y;
            }
        },
    });

    doc.setFontSize(14);
    doc.text(`Total: $${invoice.total.toFixed(2)}`, 14, finalY + 10);

    doc.save(`factura-${invoice.invoice_id}.pdf`);
};
