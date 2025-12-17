import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import { type OpenMeteoResponse } from '../types/DashboardTypes';
import { Card, CardContent } from '@mui/material';

interface ChartUIProps {
   data?: OpenMeteoResponse;
}

export default function ChartUI({ data }: ChartUIProps) {
   // Si no hay datos, mostrar valores por defecto o vacíos
   if (!data || !data.hourly) {
      return (
         <Card className="glass-card">
            <CardContent>
                <Typography variant="h5" component="div">
                Gráfico de datos meteorológicos
                </Typography>
                <Typography variant="body2" color="text.secondary">
                No hay datos disponibles
                </Typography>
            </CardContent>
         </Card>
      );
   }

   // Limitar a las primeras 24 horas para mejor visualización
   const hoursToShow = 24;
   const temperatureData = data.hourly.temperature_2m.slice(0, hoursToShow);
   const windData = data.hourly.wind_speed_10m.slice(0, hoursToShow);

   // Formatear las etiquetas de tiempo (mostrar solo la hora)
   const timeLabels = data.hourly.time.slice(0, hoursToShow).map(timeStr => {
      const date = new Date(timeStr);
      return `${date.getHours()}:00`;
   });

   return (
      <Card className="glass-card">
         <CardContent>
            <Typography variant="h5" component="div" align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
                Temperatura y Viento (Próximas 24 horas)
            </Typography>
            <LineChart
                height={250}
                series={[
                { 
                    data: temperatureData, 
                    label: `Temperatura (${data.hourly_units.temperature_2m})`,
                    color: '#ff8a80',
                    area: true,
                    curve: "catmullRom",
                    showMark: false,
                },
                { 
                    data: windData, 
                    label: `Viento (${data.hourly_units.wind_speed_10m})`,
                    color: '#80d8ff',
                    area: true,
                    curve: "catmullRom",
                    showMark: false,
                },
                ]}
                xAxis={[{ 
                    scaleType: 'point', 
                    data: timeLabels,
                }]}
                yAxis={[{
                    // Default theme
                }]}
                sx={{
                    '.MuiLineElement-root': { strokeWidth: 3 },
                    '.MuiAreaElement-root': { fillOpacity: 0.3 }
                }}
            />
         </CardContent>
      </Card>
   );
}