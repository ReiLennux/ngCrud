export interface DateSale {
    id?: Number;
    idUsuUsuario: Number;
    strFolio:  String;
    dtDate?: Date;
    idVenCatState: Number;
} 

export interface Sale {
    id: Number;
    idVenVenta: Number;
    idProProducto: Number;
    decQuantity: Number;
    decTotal: Number;
}