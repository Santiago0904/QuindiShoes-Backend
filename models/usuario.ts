export interface Usuario {
    id: number;
    nombre: string;
    correo: string;
    contraseña: string;
    // Reseña opcional
    reseña?: {
      mensaje: string;
      fecha: string;
    };
  }
  