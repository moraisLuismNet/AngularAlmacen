export interface ICategoria{
  idCategoria?: number;
  nombreCategoria: string;
  //totalProductos?: number
}

export interface IProducto {
  idProducto: number;
  nombreProducto: string;
  precio: number;
  descatalogado: boolean;
  foto?: File | null;
  fotoUrl?: string;
  categoriaId: number | null;
  nombreCategoria: string;
}

