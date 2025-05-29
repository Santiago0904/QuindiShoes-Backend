import jwt from 'jsonwebtoken';

let generateToken = (properties: any, key: any, minutes: number) => {
    // Asegúrate de imprimir el payload y la clave para depuración
    console.log("🔐 Firmando token con clave:", key);
    console.log("📦 Payload:", properties);
    console.log("⏱️ Expiración en (segundos):", Math.floor(Date.now() / 1000) + (minutes * 60));

    return jwt.sign(
        {
            data: properties,  // Se asegura que el payload se pasa correctamente
        },
        key,
        { expiresIn: minutes * 60 }  // Utiliza `expiresIn` en lugar de calcular la expiración manualmente
    );
};

export default generateToken;
