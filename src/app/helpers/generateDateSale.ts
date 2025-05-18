import { DateSale } from "../core/models/sale";

export function createDateSale(): DateSale {
    const fecha: Date = new Date(); // Supongamos que esta es tu fecha en TypeScript
    const fechaFormateada: string = fecha.toISOString().split('T')[0]; // Formatea la fecha en 'YYYY-MM-DD'
    const newDateSale: DateSale = {
        idUsuUsuario: localStorage.getItem('name') || '',
        strFolio: generarCadena(),
        dtDate: fechaFormateada,
        idVenCatState: 1
    };

    return newDateSale;
}


function generarCadena(): string {
    const caracteresPermitidos = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let cadenaGenerada = '';
    const longitudMaxima = 10;

    for (let i = 0; i < longitudMaxima; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteresPermitidos.length);
        cadenaGenerada += caracteresPermitidos.charAt(indiceAleatorio);
    }

    return cadenaGenerada;
}


export function formatoFecha(fecha: string): string {
    fecha = fecha.split('T')[0]
    return `${fecha}`;
}
