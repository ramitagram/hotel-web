import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

(async () => {
  try {
    await transporter.verify();
    console.log("✅ Conectado correctamente al servidor SMTP");

    await transporter.sendMail({
      from: `"Hotel Web Sunshine" <${process.env.FROM_EMAIL}>`,
      to: "tu_correo_personal@gmail.com",
      subject: "Prueba desde Brevo SMTP",
      text: "Este es un correo de prueba usando Nodemailer + Brevo.",
    });

    console.log("📨 Correo enviado correctamente ✅");
  } catch (err) {
    console.error("❌ Error:", err);
  }
})();