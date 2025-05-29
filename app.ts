import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

// Configuración de variables de entorno
dotenv.config();

// Inicializar express
const app = express();

// Middlewares
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true,
    exposedHeaders: ["x-renewed-token"], 
  }));
  

  

// Middlewares

app.use(express.urlencoded({ extended: true }));
app.use(express.json());// Alternativa moderna (también funciona)


// Importar rutas
import register from "./routes/register";
import auth from "./routes/auth";
import profile from "./routes/profile";
import recuperarContrasena from "./routes/RecuperarContrasena";
import reiniciarContrasena from "./routes/reiniciarContrasena"; // ✅
import materialRouter from "./routes/material";
import colorRouter from "./routes/color";
import zonaRouter from "./routes/zonaProductos";
import productoRouter from "./routes/producto";
import empleadoRouter from "./routes/empleado";
import carrioRouter from "./routes/carrito_compras"; // ✅
import buscadorProductosRouter from "./routes/buscadorProducto"; // ✅
import cambiarContrasenaRouter from "./routes/cambiarContrasena";
import verificarCorreoRoute from './routes/verificarCorreo'
import chatRoutes from "./routes/chatBot"; // ✅
import juegoRoute from "./routes/juego"


import Pagos from './routes/pago-routes';
app.use((req, res, next) => {
  console.log("🛰 Nueva solicitud recibida:");
  console.log("Método:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("Headers:", req.headers);
  next();
});


app.use("/api", Pagos); 
app.use(bodyParser.json());


// import producto from "./routes/producto";
// Usar rutas




app.use("/register", register);  
app.use("/auth", auth);
app.use("/profile", profile);
app.use("/RecuperarContrasena", recuperarContrasena); // // ✅
app.use("/reiniciarContrasena", reiniciarContrasena);  // ✅


// ✅ activa /api/pagos/confirmacion


// app.use("/producto", producto);



app.use("/cambiarContrasenaR", cambiarContrasenaRouter); // ✅
app.use("/producto", productoRouter);
app.use("/empleado", empleadoRouter);
app.use("/carrito",carrioRouter)    
app.use("/material", materialRouter);
app.use("/color", colorRouter);
app.use("/zonaProducto", zonaRouter);
app.use("/buscadorProducto", buscadorProductosRouter);
app.use(verificarCorreoRoute);
app.use('/api', chatRoutes);
app.use("/juego", juegoRoute); // ✅


 // ✅


// pagos



// Rutas de reseñas
import resena from "./routes/resena"; // ✅
app.use("/resena", resena); // ✅

// Dettalle de producto
import productoDetalleRouter from "./routes/productoDetalle";
app.use("/productoDetalle", productoDetalleRouter);


// Variantes
import variantesRouter from "./routes/variantes";
app.use("/variantes", variantesRouter);

// Puerto

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log("Servidor ejecutándose en el puerto:", PORT);
}).on("error", (error) => {
  throw new Error(error.message);
});

import usuarioRouter from "./routes/usuario";
app.use("/usuario", usuarioRouter);