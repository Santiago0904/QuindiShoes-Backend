// services/MetricsService.ts
import db from '../../config/config-db';
import { RowDataPacket } from 'mysql2';
import { TopsRepository } from '../../repositories/ModuloMetricas/Tops';

type Agrupacion = 'dia' | 'semana' | 'mes' | 'año';

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
      case 'año':
        procedimiento = 'CALL VentasAnuales()';
        break;
      default:
        throw new Error('Agrupación no válida');
    }

    const [rows] = await db.query<RowDataPacket[][]>(procedimiento);
    return rows[0];
  }

 static async obtenerTopProductos(tipo: 'mas' | 'menos', limite: number) {
    const orden = tipo === 'mas' ? 'DESC' : 'ASC';
    const topsRepository = new TopsRepository();
    return topsRepository.getTopProductosVendidos(limite, orden);
  }

    static async obtenerProductosInactivos() {
    const topsRepository = new TopsRepository();
    return topsRepository.getProductosInactivos();
  }
}
