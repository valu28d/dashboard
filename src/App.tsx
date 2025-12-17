//import { useState } from 'react'
import { Grid, CircularProgress, Alert, Button } from '@mui/material';
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './hooks/useFetchData';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';
import WeatherAdviceUI from './components/WeatherAdviceUI';
import AssistantUI from './components/AssistantUI';
import { useState } from 'react';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

function App() {
  //const [count, setCount] = useState(0)
  
  // Utilice una variable de estado para almacenar la opción seleccionada por el usuario
  const [selectedOption, setSelectedOption] = useState<string | null>('guayaquil');

  // Comunique la opción seleccionada al hook useFetchData
  const { data, loading, error } = useFetchData(selectedOption);
 

  return (
    <Grid container spacing={4} justifyContent="center" alignItems="center" sx={{ maxWidth: '1600px', margin: '0 auto', padding: '20px' }}>

      {/* Encabezado */}
      <Grid size={{ xs: 12, md: 12 }}><HeaderUI /></Grid>

      {/* INDICADOR DE CARGA */}
      {loading && (
        <Grid size={{ xs: 12, md: 12 }}>
          <Alert 
            severity="info" 
            icon={<CircularProgress size={20} />}
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}
          >
            Cargando datos meteorológicos...
          </Alert>
        </Grid>
      )}

      {/* INDICADOR DE ERROR */}
      {error && (
        <Grid size={{ xs: 12, md: 12 }}>
          <Alert 
            severity="error"
            action={
              <Button 
                color="inherit" 
                size="small" 
                onClick={() => window.location.reload()}
              >
                Reintentar
              </Button>
            }
          >
            <strong>Error al cargar los datos:</strong> {error}
          </Alert>
        </Grid>
      )}

      {/* CONTENIDO PRINCIPAL - Solo se muestra si hay datos y no hay error ni carga */}
      {!loading && !error && data && (
         
        <>
          {/* Alertas */}
          <Grid size={{ xs: 12, md: 12 }}>
            <AlertUI description='Sistema Meteorológico Activo - Actualización en tiempo real' />
          </Grid>

          {/* Selector */}
          <Grid size={{ xs: 12, md: 3 }}>
            <SelectorUI onOptionSelect={setSelectedOption} selectedCity={selectedOption || 'guayaquil'} />
          </Grid>

          {/* Indicadores */}
          <Grid container size={{ xs: 12, md: 9 }} spacing={4}>

            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title='Temperatura (2m)'
                description={`${data.current.temperature_2m} ${data.current_units.temperature_2m}`}
                icon={<DeviceThermostatIcon fontSize="large" />}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title='Temperatura aparente'
                description={`${data.current.apparent_temperature} ${data.current_units.apparent_temperature}`}
                icon={<DeviceThermostatIcon fontSize="large" color="action" />}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title='Velocidad del viento'
                description={`${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}`}
                icon={<AirIcon fontSize="large" />}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title='Humedad relativa'
                description={`${data.current.relative_humidity_2m} ${data.current_units.relative_humidity_2m}`}
                icon={<WaterDropIcon fontSize="large" />}
              />
            </Grid>

          </Grid>

          {/* Gráfico */}
          <Grid size={{ xs: 12, md: 7 }}><ChartUI data={data} /></Grid>


          {/* Tabla */}
          <Grid size={{ xs: 12, md: 5 }}><TableUI data={data} /></Grid>
          
          {/* Recomendaciones y Asistente */}
          <Grid size={{ xs: 12, md: 6 }}>
            <WeatherAdviceUI data={data} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <AssistantUI data={data} />
          </Grid>
        </>
      )}

      {/* Estado cuando no hay datos disponibles (opcional) */}
      {!loading && !error && !data && (
        <Grid size={{ xs: 12, md: 12 }}>
          <Alert severity="warning">
            No hay datos meteorológicos disponibles
          </Alert>
        </Grid>
      )}

    </Grid>
  )
}

export default App
