export interface DateSale {
    id: number;
    idUsuUsuario: number;
    strFolio:  String;
    dtDate: String;
    idVenCatState: number;
} 

export interface Sale {
    id?: Number;
    idVenVenta: number;
    idProProducto: number;
    decQuantity: number;
    decSubtotal: Number;
}