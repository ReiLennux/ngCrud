export interface product {
    id: number;
    strName: string;
    strDescription: string; //--
    idCatSubcategoria: number;
    idCatCategoria: number;
    decMinimum: number;  //--
    decMaximum: number; //--
    decStock: number;
    decCost: number;
    decPrice: number;
    strImage: string | File
}

export interface SelectedProduct {
    product: product;
    quantity: number;
}