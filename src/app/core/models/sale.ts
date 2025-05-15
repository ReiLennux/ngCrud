export interface DateSale {
    id: number;
    idUsuUsuario: string;
    strFolio:  string;
    dtDate: string;
    idVenCatState: number;
} 

export interface Sale {
    id?: Number;
    idVenVenta: number;
    idProProducto: number;
    decQuantity: number;
    decSubtotal: Number;
}