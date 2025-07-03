import fetch from "node-fetch";
import { obtenerVentasHistoricas } from "../../repositories/MetricasIA/metricaIA";
import { format } from 'date-fns';
const rellenarDiasFaltantes = (ventas: { fecha: string; total: number }[]) => {
    const completadas: { fecha: string; total: number }[] = [];

    const start = new Date(ventas[0].fecha);
    const end = new Date(ventas[ventas.length - 1].fecha);
    let current = new Date(start);

    const ventasMap = new Map(ventas.map(v => [v.fecha, v.total]));

    while (current <= end) {
        const fechaStr = current.toISOString().split('T')[0];
        completadas.push({
            fecha: fechaStr,
            total: ventasMap.get(fechaStr) || 0
        });
        current.setDate(current.getDate() + 1);
    }

    return completadas;
};
interface Venta {
  fecha: string;  // puede ser string o Date, depende de tu fuente de datos
  total: number;
}


export const agruparVentas = (
    ventas: Venta[],
    agrupacion: 'semana' | 'mes' | 'año'
): Venta[] => {
    const agrupadas: Record<string, number> = {};

    for (const venta of ventas) {
        const fecha = new Date(venta.fecha);
        let clave = '';

        switch (agrupacion) {
            case 'semana': {
                const start = new Date(fecha.getFullYear(), 0, 1);
                const diff = (fecha.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
                const week = Math.ceil((diff + start.getDay() + 1) / 7);
                clave = `Semana ${week} - ${fecha.getFullYear()}`;
                break;
            }
            case 'mes':
                clave = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-01`; // ✅ mes completo
                break;
            case 'año':
                clave = `${fecha.getFullYear()}-01-01`; // ✅ año completo
                break;
        }

        agrupadas[clave] = (agrupadas[clave] || 0) + venta.total;
    }

    return Object.entries(agrupadas).map(([fecha, total]) => ({ fecha, total }));
};





export const predecirVentasDesdeDBService = async (agrupacion: 'dia' | 'semana' | 'mes' | 'año') => {
    const ventasRawDB = await obtenerVentasHistoricas();
const ventasRaw = ventasRawDB.map(v => ({
  fecha: typeof v.fecha === 'string' ? v.fecha : v.fecha.toISOString().split('T')[0],
  total: typeof v.total === 'string' ? parseFloat(v.total) : v.total
}));


    // ✅ Rellenar días faltantes si es 'dia'
    let ventasCompletas = ventasRaw;

    if (agrupacion === 'dia') {
        ventasCompletas = rellenarDiasFaltantes(ventasRaw); // Esta función la definiremos abajo
    }

    // ✅ Agrupar si no es 'dia'
    if (agrupacion !== 'dia') {
        ventasCompletas = agruparVentas(ventasCompletas, agrupacion); // También la definiremos abajo
    }

    const ventasFormateadas = ventasCompletas
        .filter((v: any) => v.fecha && typeof v.total === "number" && !isNaN(v.total))
        .map((v: any) => ({
            fecha: typeof v.fecha === 'string' ? v.fecha : v.fecha.toISOString().split('T')[0],
            total: v.total,
        }));

    if (ventasFormateadas.length === 0) {
        throw new Error("No hay ventas válidas para predecir");
    }

    console.log("Enviando datos al microservicio de IA:", ventasFormateadas);

    const response = await fetch("http://localhost:8000/predecir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ventas: ventasFormateadas, agrupacion }), // ✅ ahora sí se envía agrupación
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Microservicio falló:", errorText);
        throw new Error(`Error al obtener predicción desde el microservicio: ${response.status} - ${errorText}`);
    }

    return await response.json();
};

