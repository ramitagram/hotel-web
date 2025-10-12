import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MercadoPagoConfig, Preference } from "mercadopago";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

// Simulación de reservas
let reservas = [
  { id: 1, habitacion: 101, cliente: "Juan Pérez", monto: 60000, estado: "pendiente" },
  { id: 2, habitacion: 202, cliente: "María Gómez", monto: 80000, estado: "pendiente" },
];

// ✅ Endpoint para obtener reservas
app.get("/api/reservas", (req, res) => {
  res.json(reservas);
});

// ✅ Endpoint para crear preferencia de pago
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
          email: "test_user_123456@testuser.com",
        },
        back_urls: {
          success: "http://localhost:3002/operator/pagos/success",
          failure: "http://localhost:3002/operator/pagos/failure",
          pending: "http://localhost:3002/operator/pagos/pending",
        },
        // 🚫 QUITAMOS auto_return porque Mercado Pago no acepta localhost
        notification_url: `${process.env.WEBHOOK_BASE_URL}/api/webhook`,
      },
    });

    console.log("✅ Preferencia creada:", preference.id);
    res.json({ preferenceId: preference.id });
  } catch (err) {
    console.error(
      "⚠️ Error detallado al crear preferencia:",
      err.response ? err.response.data : err
    );
    res.status(500).json({ error: "Error creando preferencia" });
  }
});

// ✅ (Opcional) Webhook — aún no lo necesitamos, pero puede quedar
app.post("/api/webhook", (req, res) => {
  console.log("📩 Webhook recibido:", req.body);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Backend corriendo en http://localhost:${PORT}`));
