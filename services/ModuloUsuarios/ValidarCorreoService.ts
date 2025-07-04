import nodemailer from 'nodemailer';

export const ValidarCorreo = async (correo: string, urlConfirm: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"QuindiShoes 👟" <${process.env.EMAIL_USER}>`,
    to: correo,
    subject: '✅ Confirma tu cuenta en QuindiShoes',
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #fffafc; color: #333; padding: 30px; border-radius: 12px; border: 1px solid #f3d1dc; max-width: 600px; margin: auto;">
        
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="margin: 0; font-size: 28px; color: #e91e63;">👟 QuindiShoes</h1>
          <p style="font-size: 16px; color: #777;">¡Gracias por unirte!</p>
        </div>

        <p style="font-size: 18px;">Hola,</p>
        <p style="font-size: 16px;">Gracias por registrarte en <strong>QuindiShoes</strong>. Para completar tu registro y activar tu cuenta, por favor haz clic en el siguiente botón:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${urlConfirm}" target="_blank"
            style="background: linear-gradient(to right, #ec4899, #8b5cf6); color: white; text-decoration: none; padding: 14px 24px; border-radius: 8px; font-size: 16px; display: inline-block;">
            Confirmar mi cuenta
          </a>
        </div>

        <p style="font-size: 14px; color: #555;">Si tú no creaste esta cuenta, puedes ignorar este mensaje sin problemas.</p>

        <hr style="margin: 40px 0; border: none; border-top: 1px solid #f3d1dc;" />

        <div style="text-align: center; font-size: 12px; color: #aaa;">
          © ${new Date().getFullYear()} QuindiShoes. Todos los derechos reservados.
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
