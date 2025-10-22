import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// === 💌 CONFIGURACIÓN SMTP (Brevo) ===
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

// === 🛏️ DATOS DE PRUEBA: RESERVAS ===
let reservas = [
  {
    id: 1,
    habitacion: 101,
    cliente: "Juan Pérez",
    monto: 60000,
    email: "carlos@ejemplo.com",
    estado: "pendiente",
  },
  {
    id: 2,
    habitacion: 202,
    cliente: "María Gómez",
    monto: 80000,
    email: "luciano@ejemplo.com",
    estado: "pendiente",
  },
];

// === 🔹 Endpoint para obtener reservas ===
app.get("/api/reservas", (req, res) => {
  res.json(reservas);
});

// === 📩 Endpoint para enviar correo (Brevo) ===
app.post("/api/enviar-correo", async (req, res) => {
  const { destinatario, asunto, mensaje } = req.body;

  try {
    await transporter.sendMail({
      from: `"Hotel Web Sunshine" <${process.env.FROM_EMAIL}>`,
      to: destinatario,
      subject: asunto,
      text: mensaje,
      html: `<p>${mensaje}</p>`,
    });

    console.log(`✅ Correo enviado a ${destinatario}`);
    res.json({ ok: true, msg: "Correo enviado correctamente" });
  } catch (error) {
    console.error("❌ Error al enviar correo:", error);
    res.status(500).json({ ok: false, msg: "Error enviando correo" });
  }
});

// === 🚀 Iniciar servidor ===
const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`✅ Backend corriendo en http://localhost:${PORT}`)
);
