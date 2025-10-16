import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { MercadoPagoConfig, Preference } from "mercadopago";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// === 🧾 CONFIGURACIÓN MERCADO PAGO ===
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
  options: { sandbox: true }, // modo prueba
});

// === 💌 CONFIGURACIÓN SMTP (BREVO) ===
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// === 🛏️ DATOS DE PRUEBA: RESERVAS ===
let reservas = [
  { id: 1, habitacion: 101, cliente: "Juan Pérez", monto: 60000, email: "carlos@ejemplo.com", estado: "pendiente" },
  { id: 2, habitacion: 202, cliente: "María Gómez", monto: 80000, email: "luciano@ejemplo.com", estado: "pendiente" },
];

// === 🔹 Endpoint para obtener reservas ===
app.get("/api/reservas", (req, res) => {
  res.json(reservas);
});

// === 💳 Endpoint para crear preferencia de pago ===
app.post("/api/create_preference", async (req, res) => {
  try {
    const { reservaId } = req.body;
    const reserva = reservas.find((r) => r.id === reservaId);

    if (!reserva) return res.status(404).json({ error: "Reserva no encontrada" });

    const preference = await new Preference(client).create({
      body: {
        items: [
          {
            title: `Reserva habitación ${reserva.habitacion}`,
            quantity: 1,
            unit_price: reserva.monto,
          },
        ],
        payer: {
          name: reserva.cliente,
          email: "test_user_123456@testuser.com", // correo de prueba Mercado Pago
        },
        back_urls: {
          success: "http://localhost:3002/operator/pagos/success",
          failure: "http://localhost:3002/operator/pagos/failure",
          pending: "http://localhost:3002/operator/pagos/pending",
        },
        notification_url: `${process.env.WEBHOOK_BASE_URL}/api/webhook`,
      },
    });

    console.log("✅ Preferencia creada:", preference.id);
    res.json({ preferenceId: preference.id });
  } catch (err) {
    console.error("⚠️ Error detallado al crear preferencia:", err.response?.data || err);
    res.status(500).json({ error: "Error creando preferencia" });
  }
});

// === 📩 Endpoint para enviar correo (Brevo) ===
app.post("/api/enviar-correo", async (req, res) => {
  const { destinatario, asunto, mensaje } = req.body;

  try {
    await transporter.sendMail({
      from: `"Hotel Renacer" <${process.env.FROM_EMAIL}>`,
      to: destinatario,
      subject: asunto,
      text: mensaje,
      html: `<p>${mensaje}</p>`,
    });

    console.log(`📨 Correo enviado a ${destinatario}`);
    res.json({ ok: true, msg: "Correo enviado correctamente" });
  } catch (error) {
    console.error("❌ Error al enviar correo:", error);
    res.status(500).json({ ok: false, msg: "Error enviando correo" });
  }
});

// === 🔔 Webhook (opcional) ===
app.post("/api/webhook", (req, res) => {
  console.log("📩 Webhook recibido:", req.body);
  res.sendStatus(200);
});

// === 🚀 Iniciar servidor ===
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Backend corriendo en http://localhost:${PORT}`));