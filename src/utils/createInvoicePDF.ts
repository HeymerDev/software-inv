import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Tipado (el mismo que devuelve tu consulta)
import { FullInvoiceItem } from "@/types/types"

export const generateInvoicePDF = (invoiceData: FullInvoiceItem[]) => {
    if (!invoiceData || invoiceData.length === 0) return;

    const doc = new jsPDF();
    const invoice = invoiceData[0]; // Factura base

    // Encabezado
    doc.setFontSize(18);
    doc.text("Factura", 14, 20);

    // Info cliente
    doc.setFontSize(12);
    doc.text(`Cliente: ${invoice.client_name}`, 14, 30);
    doc.text(`Email: ${invoice.client_email}`, 14, 36);
    doc.text(`Teléfono: ${invoice.client_telefono}`, 14, 42);
    doc.text(`Dirección: ${invoice.client_direccion}`, 14, 48);
    doc.text(`Fecha emisión: ${new Date(invoice.fecha_emision).toLocaleDateString()}`, 14, 54);
    doc.text(`Estado: ${invoice.estado}`, 14, 60);
    doc.text(`ID Factura: ${invoice.invoice_id}`, 14, 66);

    // Tabla de productos
    const tableData = invoiceData.map(item => [
        item.product_name,
        item.cantidad,
        `$${item.precio_unitario.toFixed(2)}`,
        `$${item.subtotal.toFixed(2)}`
    ]);

    const table = autoTable(doc, {
        startY: 75,
        head: [["Producto", "Cantidad", "Precio Unitario", "Subtotal"]],
        body: tableData
    });

    // Obtener coordenada Y final para mostrar el total
    const finalY = (table as any).finalY ?? 75 + 10;

    doc.setFontSize(14);
    doc.text(`Total: $${invoice.total.toFixed(2)}`, 14, finalY + 10);

    doc.save(`factura-${invoice.invoice_id}.pdf`);
};