export interface DateSale {
    id?: Number;
    idUsuUsuario: Number | null;
    strFolio:  String;
    dtDate?: String;
    idVenCatState: Number;
} 

export interface Sale {
    id?: Number;
    idVenVenta: Number;
    idProProducto: Number;
    decQuantity: Number;
    decSubtotal: Number;
}