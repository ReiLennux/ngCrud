export interface DateSale {
    idUsuUsuario: string;
    strFolio: string;
    dtDate: string;
    idVenCatState: number;
}

export interface SaleDetails {
    idProProducto: number;
    decQuantity: number;
}
  

export interface Sale {
    id?: string; // este es el id interno guardado
    DateSale: DateSale;
    SaleDetails: SaleDetails[];
    decSubtotal: number;
    firebaseId?: string; // este es opcional si decides incluirlo
}