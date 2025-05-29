import mysql from 'mysql2';
import dotenv from "dotenv";
dotenv.config();


const db = mysql.createPool({
  host: process.env.DB_HOST,             
  port: parseInt(process.env.DB_PORT!, 10), 
  user: process.env.DB_USERNAME,          
  password: process.env.DB_PASSWORD,      
  database: process.env.DB_DATABASE,    
  connectionLimit: 10,
  queueLimit: 0
});
  
  (async () => {
    try {
      db.getConnection((err, connection) => {
        if (err) {
          console.error('Error al conectar a la base de datos:', err);
          return;
        }
        console.log('Conexión a la base de datos exitosa');
        connection.release();
      });
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
    }
  })();

export default db.promise()
