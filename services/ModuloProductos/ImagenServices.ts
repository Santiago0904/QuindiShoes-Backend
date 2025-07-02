import configDb from "../../config/config-db";

export default {
  async guardarImagen(id_producto: number, url_imagen: string) {
    const query = `
      INSERT INTO imagenes_producto (id_producto, url_imagen)
      VALUES (?, ?)
    `;
    const [resultado]: any = await configDb.query(query, [id_producto, url_imagen]);
    
    // Retorna el ID insertado por si lo necesitas
    return resultado.insertId;
  }
};
