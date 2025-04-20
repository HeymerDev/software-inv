import { VentaConInfo } from "@/types/types";
import { isSameDay, isSameWeek, isSameMonth, isSameYear, parseISO } from "date-fns";

export function filtrarVentasPorPeriodo(ventas: VentaConInfo[]) {
  const hoy = new Date();

  const ventasHoy = ventas.filter((venta) =>
    isSameDay(parseISO(venta.fecha), hoy)
  );
  const totalHoy = ventasHoy.reduce((acc, v) => acc + v.total, 0);

  const ventasSemana = ventas.filter((venta) =>
    isSameWeek(parseISO(venta.fecha), hoy, { weekStartsOn: 1 }) // semana inicia en lunes
  );
  const totalSemana = ventasSemana.reduce((acc, v) => acc + v.total, 0);

  const ventasMes = ventas.filter((venta) =>
    isSameMonth(parseISO(venta.fecha), hoy)
  );
  const totalMes = ventasMes.reduce((acc, v) => acc + v.total, 0);

  const ventasAnio = ventas.filter((venta) =>
    isSameYear(parseISO(venta.fecha), hoy)
  );
  const totalAnio = ventasAnio.reduce((acc, v) => acc + v.total, 0);

  return {
    ventasHoy,
    totalHoy,
    ventasSemana,
    totalSemana,
    ventasMes,
    totalMes,
    ventasAnio,
    totalAnio,
  };
}
