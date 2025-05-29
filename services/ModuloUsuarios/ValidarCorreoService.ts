import nodemailer from 'nodemailer';

export const    ValidarCorreo = async (correo: string, urlConfirm: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,        
      pass: process.env.EMAIL_PASS,   
    },
  });

  const mailOptions = {
    from: `"Mi App" <${process.env.EMAIL_USER}>`,
    to: correo,
    subject: 'Confirma tu cuent a',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
    <h2>¡Bienvenido!</h2>
    <p>Gracias por registrarte. Para activar tu cuenta, haz clic en el botón:</p>
    <a href="${urlConfirm}" style="
        display: inline-block;
        padding: 12px 24px;
        background-color: #4CAF50;
        color: white;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
        margin-top: 20px;
    ">
      Confirmar cuenta
    </a>
    <p style="margin-top: 20px;">Si no solicitaste esta cuenta, puedes ignorar este mensaje.</p>
  </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
