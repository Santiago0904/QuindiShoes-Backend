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
  const url = `https://quindi-shoes-frontend-yemj.vercel.app//reiniciarContrasena?token=${token}`; 

  const mailOptions = {
    from: '"QuindiShoes 👟" <santiagoaguirrecastano8@gmail.com>',
    to: destinatario,
    subject: "Restablecer tu contraseña",
    html: `
      <p>Hola, haz clic en el siguiente enlace para restablecer tu contraseña:</p>
      <a href="${url}">${url}</a>
      <p>Este enlace expirará en 15 minutos.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

