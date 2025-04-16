import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FullInvoiceItem } from "@/types/types";

export const generateInvoicePDF = (
  invoiceItems: FullInvoiceItem[],
  id: number // este es el id de la factura
) => {
  if (!invoiceItems || invoiceItems.length === 0) return;

  // Asegurarse de filtrar solo los productos de esa factura
  const filteredItems = invoiceItems.filter(item => item.invoice_id === id);

  if (filteredItems.length === 0) {
    console.warn("No hay productos para esta factura");
    return;
  }

  const invoice = filteredItems[0]; // Todos los productos tienen los mismos datos de cliente/factura

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Factura", 14, 20);

  doc.setFontSize(12);
  doc.text(`Cliente: ${invoice.client_name}`, 14, 30);
  doc.text(`Email: ${invoice.client_email}`, 14, 36);
  doc.text(`Teléfono: ${invoice.client_telefono}`, 14, 42);
  doc.text(`Dirección: ${invoice.client_direccion}`, 14, 48);
  doc.text(
    `Fecha emisión: ${new Date(invoice.fecha_emision).toLocaleDateString()}`,
    14,
    54
  );
  doc.text(`Estado: ${invoice.estado}`, 14, 60);
  doc.text(`ID Factura: ${invoice.invoice_id}`, 14, 66);

  const tableData = filteredItems.map((item) => [
    item.product_name,
    item.cantidad.toString(),
    `$${item.precio_unitario.toFixed(2)}`,
    `$${item.subtotal.toFixed(2)}`
  ]);

  let finalY = 95;

  autoTable(doc, {
    startY: finalY,
    head: [["Producto", "Cantidad", "Precio Unitario", "Subtotal"]],
    body: tableData
  });

  doc.setFontSize(14);
  doc.text(`Total: $${invoice.total.toFixed(2)}`, 14, finalY + 30);

  doc.save(`factura-${invoice.invoice_id}.pdf`);
};
