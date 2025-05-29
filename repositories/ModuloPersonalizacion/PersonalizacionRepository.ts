import Materiales from "../../Dto/MaterialesDto";
import Colores from "../../Dto/ColoresDto";
import ZonaProducto from "../../Dto/ZonaProductosDto";
import db from '../../config/config-db';


class PersonalizacionRepository {   

    // Materiales
    static async addMateriales(materiales: Materiales) {
        const sql = 'call InsertarMaterial(?);';
        const values = [materiales.nombre_material];
        return db.execute(sql, values);
    }

    static async ActualizarMaterial(id: number, material: Materiales) {
        console.log("Datos recibidos en el update:",  material, "ID",id,);
        const sql = `
          call ActualizarMaterial(?,?);
        `;
    
        const values = [
          id,
          material.nombre_material
        ];
        return await db.execute(sql, values);
      }
    

      static async obtenerMaterial() {
          const [rows] = await db.execute('SELECT * FROM materiales');
          console.log(rows);
          return rows;
        }

    static async deleteMateriales(id: number) {
        const sql = 'call EliminarMaterial(?);';
        await db.execute(sql, [id]);
    }

    // Colores

    static async addColores(colores: Colores) {
        const sql = 'call InsertarColor(?, ?);';
        const values = [colores.nombreColor, colores.codigoHax];
        return db.execute(sql, values);
    }   

    static async ActualizarColor(id: number, color: Colores) {
        console.log("Datos recibidos en el update:", "ID:", id, color);
        const sql = `
          call ActualizarColor(?,?,?);
        `;
    
        const values = [
          id,
          color.nombreColor,
          color.codigoHax
          
        ];
        return await db.execute(sql, values);
      }

      static async obtenerColores() {
        const [rows] = await db.execute('SELECT * FROM colores');
        console.log(rows);
        return rows;
      }

    static async deleteColores(id: number) {
        const sql = 'call EliminarColor(?);';
        await db.execute(sql, [id]);
    }


    // Zona Producto
    static async addZonaProducto(zonaProducto: ZonaProducto) {
        const sql = 'call InsertarZonaProductos(?);';
        const values = [zonaProducto.nombreZona];
        return db.execute(sql, values);
    }

    static async ActualizarZonaProducto(id: number, zonaProducto: ZonaProducto) {
        console.log("Datos recibidos en el update:", zonaProducto, "ID:", id);
        const sql = `
          call ActualizarZona(?,?);
        `;
    
        const values = [
          id,
          zonaProducto.nombre_zona,
          
        ];
        return await db.execute(sql, values);
      }   

      static async obtenerZonaProducto() {
        const [rows] = await db.execute('SELECT * FROM zona_productos');
        console.log(rows);
        return rows;
      }

    static async deleteZonaProducto(id: number) {
        const sql = 'call EliminarZonaProductos(?);';
        await db.execute(sql, [id]);
    }

}

export default PersonalizacionRepository;
