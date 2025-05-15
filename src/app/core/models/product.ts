export interface product {
    id: number;
    strName: string;
    strDescription: string; //--
    idCatSubcategoria: string;
    idCatCategoria: string;
    decMinimum: number;  //--
    decMaximum: number; //--
    decStock: number;
    decCost: number;
    decPrice: number;
    strImage: string | File
}

export interface productView {
    id: number;
    strName: string;
    strDescription: string; //--
    CatSubcategoria: string;
    CatCategoria: string;
    decMinimum: number;  //--
    decMaximum: number; //--
    decStock: number;
    decCost: number;
    decPrice: number;
    strImage: string | File
}

export interface SelectedProduct {
    id? : number;
    product: product;
    quantity: number;
}