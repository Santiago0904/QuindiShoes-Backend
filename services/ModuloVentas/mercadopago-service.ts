export async function createPreference(preferenceData: any): Promise<string> {
  try {
    const accessToken = process.env.MP_ACCESS_TOKEN;
    if (!accessToken) {
      console.error("No se encontró el access token de MercadoPago.");
      throw new Error("No se encontró el access token de MercadoPago.");
    }

    // Asegura currency_id en cada item
    const dataToSend = {
      ...preferenceData,
      items: preferenceData.items.map((item: any) => ({
        ...item,
        currency_id: "COP",
      })),
    };

    console.log("Enviando a MercadoPago:", JSON.stringify(dataToSend, null, 2));

    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify(dataToSend),
    });

    const data = await response.json();
    console.log("Respuesta de MercadoPago:", data);

    if (!response.ok) {
      throw new Error(data.message || "No se pudo crear la preferencia en Mercado Pago.");
    }

    const preferenceId = data.id || data.preference_id;
    if (!preferenceId) {
      throw new Error("No se recibió el ID de la preferencia de Mercado Pago.");
    }
    return preferenceId;
  } catch (error: any) {
    console.error("Error al crear la preferencia:", error);
    throw new Error("No se pudo crear la preferencia en Mercado Pago. Detalles: " + (error.message || JSON.stringify(error)));
  }
}