import db from '../../config/config-db';
import { RowDataPacket } from 'mysql2';

type Agrupacion = 'dia' | 'semana' | 'mes' | 'anio';

export class MetricsService {
  static async getVentasPorRango(agrupacion: Agrupacion) {
    let procedimiento = '';

    switch (agrupacion) {
      case 'dia':
        procedimiento = 'CALL VentasDiarias()';
        break;
      case 'semana':
        procedimiento = 'CALL VentasSemanales()';
        break;
      case 'mes':
        procedimiento = 'CALL VentasMensuales()';
        break;
      case 'anio':
        procedimiento = 'CALL VentasAnuales()';
        break;
      default:
        throw new Error('Agrupación no válida');
    }

    const [rows] = await db.query<RowDataPacket[][]>(procedimiento);
    return rows[0]; // CALL devuelve un array de arrays
  }
}
