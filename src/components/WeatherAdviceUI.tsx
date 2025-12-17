import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

interface WeatherAdviceUIProps {
    data: OpenMeteoResponse;
}

export default function WeatherAdviceUI({ data }: WeatherAdviceUIProps) {
    const { temperature_2m, wind_speed_10m, relative_humidity_2m } = data.current;

    const getAdvice = () => {
        const adviceList: string[] = [];

        // Temperatura y Ropa
        if (temperature_2m >= 30) {
            adviceList.push("Usa bloqueador y ropa fresca (shorts, camisetas sin mangas).");
            adviceList.push("Evita hacer ejercicio al aire libre al mediodía.");
        } else if (temperature_2m >= 24) {
            adviceList.push("Clima agradable para usar manga corta y pantalones ligeros.");
        } else if (temperature_2m >= 18) {
            adviceList.push("Fresco y cómodo, ideal para jeans y camiseta.");
        } else if (temperature_2m >= 12) {
            adviceList.push("Refresca un poco, lleva un hoodie o chaqueta ligera.");
        } else {
            adviceList.push("Hace frío, usa abrigo y ropa térmica si vas a estar fuera.");
        }

        // Viento
        if (wind_speed_10m > 30) {
            adviceList.push("Vientos intensos, ten cuidado con objetos sueltos.");
        } else if (wind_speed_10m > 20) {
            adviceList.push("Brisa fuerte, perfecto si quieres refrescar tu hogar.");
        }
        
        // Humedad
        if (relative_humidity_2m > 85) {
            adviceList.push("Humedad muy alta, sensación térmica elevada.");
            adviceList.push("El cabello podría encresparse (frizz).");
        } else if (relative_humidity_2m < 30) {
            adviceList.push("Aire seco, usa crema hidratante y bálsamo labial.");
        }

        return adviceList;
    };

    const recommendations = getAdvice();

    return (
        <Card className="glass-card" sx={{ height: '100%' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#0d47a1', textAlign: 'center' }}>
                    Consejos del Día
                </Typography>
                <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    {recommendations.map((text, index) => (
                        <Typography component="li" key={index} variant="body1" sx={{ mb: 1, fontStyle: 'italic' }}>
                            {text}
                        </Typography>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
}
