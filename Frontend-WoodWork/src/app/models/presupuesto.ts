export interface Presupuesto{
    id: number;
    id_carpenter: number;
    id_solicitud: number;
    mano_obra: number;
    material: number;
    monto: number;
    estado: string;
    fecha_registro: Date;
    img_boceto: string;
}