export interface DateSale {
    id: string; // este es el id interno guardado
    idUsuUsuario: string;
    strFolio: string;
    dtDate: string;
    idVenCatState: number;
    firebaseId?: string; // este es opcional si decides incluirlo
}
  

export interface Sale {
    id?: string; // este es el id interno guardado
    idVenVenta: string;
    idProProducto: number;
    decQuantity: number;
    decSubtotal: Number;
    firebaseId?: string; // este es opcional si decides incluirlo
}