export interface Solicitud{
    id: number;
    id_customer: number;
    description: string;
    fecha_inicio: Date;
    fecha_fin: Date;
    ancho_producto: number;
    alto_producto: number;
    largo_producto: number;
    ancho_espacio: number;
    alto_espacio: number;
    largo_espacio: number;
    img_espacio: string;
}