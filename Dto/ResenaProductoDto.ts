export interface ResenaProductoDto {
  id_resena?: number;
  id_producto: number;
  id_usuario: number;
  resena: string;
  puntuacion?: number;
  fecha_resena?: string;
}