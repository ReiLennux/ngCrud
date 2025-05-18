import { jsPDF } from 'jspdf';
import { SelectedProduct } from '../core/models/product';

export function generateAndDownloadTicket(selectedProducts: SelectedProduct[]): void {
  const doc = new jsPDF();

  // Encabezado
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('TICKET DE VENTA', 105, 20, { align: 'center' });

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`Fecha: ${new Date().toLocaleString()}`, 10, 30);

  // Línea divisoria
  doc.line(10, 35, 200, 35);

  // Encabezados de tabla
  let y = 42;
  doc.setFont('helvetica', 'bold');
  doc.text('Producto', 10, y);
  doc.text('Precio', 90, y);
  doc.text('Cant.', 120, y);
  doc.text('Subtotal', 160, y);
  doc.setFont('helvetica', 'normal');

  y += 6;

  let total = 0;

  selectedProducts.forEach((product) => {
    const name = product.product.strName;
    const price = product.product.decPrice;
    const quantity = product.quantity;
    const subtotal = price * quantity;
    total += subtotal;

    // Evitar desbordamiento de página
    if (y > 270) {
      doc.addPage();
      y = 20;
    }

    // Texto del producto
    const productName = name.length > 30 ? name.slice(0, 27) + '...' : name;
    doc.text(productName, 10, y);
    doc.text(`$${price.toFixed(2)}`, 90, y);
    doc.text(`${quantity}`, 125, y);
    doc.text(`$${subtotal.toFixed(2)}`, 160, y);
    y += 8;
  });

  // Línea divisoria
  doc.line(10, y, 200, y);
  y += 10;

  // Total
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(`TOTAL: $${total.toFixed(2)}`, 160, y, { align: 'right' });

  // Footer
  y += 20;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'italic');
  doc.text('Gracias por su compra', 105, y, { align: 'center' });

  // Descargar PDF
  doc.save('ticket.pdf');
}
