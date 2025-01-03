export interface RecetaModel {
    id?: string;
    nombre: string;
    products: Producto[];
    steps: string;
    createdBy?: string;
}

export interface Producto {
    nombre: string;
    cantidad: number | undefined;
    unidadMedida: string | undefined;
  }