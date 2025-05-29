import { Request, Response } from "express";
import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid"; // npm install uuid

export const processPayment = async (req: Request, res: Response) => {
  try {
    const accessToken = process.env.MP_ACCESS_TOKEN;
    if (!accessToken) {
      return res.status(500).json({ error: "No se encontró el access token de MercadoPago." });
    }

    const {
      token,
      issuer_id,
      payment_method_id,
      transaction_amount,
      installments,
      payer,
    } = req.body;

    // Validación de campos obligatorios
    if (
      !token ||
      !issuer_id ||
      !payment_method_id ||
      !transaction_amount ||
      !installments ||
      !payer ||
      !payer.email ||
      !payer.identification ||
      !payer.identification.type ||
      !payer.identification.number
    ) {
      return res.status(400).json({ error: "Faltan campos obligatorios para procesar el pago." });
    }

    const paymentData = {
      token,
      issuer_id,
      payment_method_id,
      transaction_amount: Number(transaction_amount),
      installments: Number(installments),
      payer: {
        email: payer.email,
        identification: {
          type: payer.identification.type,
          number: payer.identification.number,
        },
      },
    };

    console.log("Enviando a /v1/payments:", JSON.stringify(paymentData, null, 2));

    const idempotencyKey = uuidv4();

    const mpResponse = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify(paymentData),
    });

    const mpResult = await mpResponse.json();
    console.log("Respuesta de MercadoPago al crear pago:", mpResult);

    res.status(mpResponse.status).json(mpResult);
  } catch (error: any) {
    console.error("Error al procesar el pago:", error);
    res.status(500).json({ error: error.message });
  }
};