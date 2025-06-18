import fetch from 'node-fetch';

export const obtenerPrediccionVentas = async (ventasHistoricas: any) => {
  const response = await fetch("http://localhost:8000/predecir", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ventas: ventasHistoricas }),
  });

  const data = await response.json();
  return data;
};
