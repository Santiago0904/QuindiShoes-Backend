import nodemailer from "nodemailer";

export const enviarCorreo = async (destinatario: string, token: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, 
    },
  });

  // api url
  const url = `https://quindi-shoes-project-dmg4ixf5w-santiago-bustos-projects.vercel.app//reiniciarContrasena?token=${token}`; 

const mailOptions = {
  from: '"QuindiShoes 👟" <santiagoaguirrecastano8@gmail.com>',
  to: destinatario,
  subject: "🔒 Restablece tu contraseña - QuindiShoes",
  html: `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #fffafc; color: #333; padding: 30px; border-radius: 12px; border: 1px solid #f3d1dc; max-width: 600px; margin: auto;">
    
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="margin: 0; font-size: 28px; color: #e91e63;">👟 QuindiShoes</h1>
      <p style="font-size: 16px; color: #777;">Tu estilo, tu camino.</p>
    </div>

    <p style="font-size: 18px;">Hola,</p>
    <p style="font-size: 16px;">Hemos recibido una solicitud para restablecer tu contraseña. Si fuiste tú, haz clic en el siguiente botón:</p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="${url}" target="_blank"
         style="background: linear-gradient(to right, #ec4899, #8b5cf6); color: white; text-decoration: none; padding: 14px 24px; border-radius: 8px; font-size: 16px; display: inline-block;">
        Restablecer contraseña
      </a>
    </div>

    <p style="font-size: 14px; color: #555;">Este enlace expirará en <strong>15 minutos</strong>.</p>

    <p style="font-size: 14px; color: #999;">
      Si no solicitaste este cambio, simplemente ignora este mensaje. Tu contraseña permanecerá segura.
    </p>

    <hr style="margin: 40px 0; border: none; border-top: 1px solid #f3d1dc;" />

    <div style="text-align: center; font-size: 12px; color: #aaa;">
      © ${new Date().getFullYear()} QuindiShoes. Todos los derechos reservados.
    </div>
  </div>
  `
};


  await transporter.sendMail(mailOptions);
}

