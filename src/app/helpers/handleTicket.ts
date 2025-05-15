
import fs from 'fs';
import blobStream from 'blob-stream';

import { SelectedProduct } from "../core/models/product";

export function generateAndDownloadTicket(selectedProducts: SelectedProduct[]): void {
  
  // Crear un nuevo documento PDF
  // const doc = new PDFDocument();

  // // Crear un flujo de blob para almacenar el PDF
  // const stream = doc.pipe(blobStream());

  // // Agregar contenido al documento PDF
  // selectedProducts.forEach((product, index) => {
  //   doc.fontSize(14).text(`Producto ${index + 1}`, { underline: true }).moveDown();
  //   doc.fontSize(12).text(`Nombre: ${product.product.strName}`).moveDown();
  //   doc.text(`Precio: ${product.product.decPrice}`).moveDown();
  //   doc.text(`Cantidad: ${product.quantity}`).moveDown();
  //   doc.text(`Total: ${product.product.decPrice * product.quantity}`).moveDown();
  //   doc.moveDown();
  // });

  // // Finalizar el documento PDF
  // doc.end();

  // // Manejar el evento 'finish' del flujo de blob
  // stream.on('finish', function() {
  //   // Obtener el blob del PDF
  //   const pdfBlob = stream.toBlob('application/pdf');

  //   // Convertir el blob a un arrayBuffer
  //   pdfBlob.arrayBuffer().then(buffer => {
  //     // Crear un nuevo buffer a partir del arrayBuffer
  //     const pdfBuffer = Buffer.from(buffer);

  //     // Escribir el buffer en un archivo
  //     fs.writeFile('ticket.pdf', pdfBuffer, (err) => {
  //       if (err) {
  //         console.error('Error al escribir el archivo PDF:', err);
  //       } else {
  //         console.log('Archivo PDF generado con éxito');
  //       }
  //     });
  //   });
  // });
}