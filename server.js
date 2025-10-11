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

// Endpoint para crear preferencia
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
          success: "http://localhost:3000/operator/pagos/success",
          failure: "http://localhost:3000/operator/pagos/failure",
          pending: "http://localhost:3000/operator/pagos/pending",
        },
        auto_return: "approved",
        notification_url: `${process.env.WEBHOOK_BASE_URL}/api/webhook`,
      },
    });

    res.json({ preferenceId: preference.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creando preferencia" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend corriendo en http://localhost:${PORT}`));

//Webhook para recibir notificaciones de Mercado Pago
app.post("/api/webhook", async (req, res) => {
  try {
    const { type, data } = req.body;

    // Solo procesamos notificaciones de pagos
    if (type === "payment") {
      const paymentId = data.id;
      console.log(`🔔 Notificación recibida para pago ID: ${paymentId}`);

      // Traer el estado actual del pago desde la API de MP
      const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      });
      const pago = await response.json();

      // Buscar reserva correspondiente y actualizar su estado
      const reserva = reservas.find(
        (r) => r.monto === pago.transaction_amount && r.estado === "pendiente"
      );
      if (reserva) {
        reserva.estado = pago.status; // Ejemplo: "approved", "pending", "rejected"
        console.log(`Reserva ${reserva.habitacion} actualizada a: ${pago.status}`);
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error procesando webhook:", error);
    res.sendStatus(500);
  }
});