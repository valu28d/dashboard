//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import "./App.css";
import { Grid } from "@mui/material";
import HeaderUI from "./components/HeaderUI";
import AlertUI from "./components/AlertUI";
import SelectorUI from "./components/SelectorUI";
import IndicatorUI from "./components/IndicatorUI";
import useFetchData from "./hooks/useFetchData";

function App() {
   const dataFetcherOutput = useFetchData();

   if (dataFetcherOutput.loading) {
      return (
         <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
            <Grid>
               <p>Cargando información meteorológica...</p>
            </Grid>
         </Grid>
      );
   }

   if (dataFetcherOutput.error) {
      return (
         <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
            <Grid>
               <AlertUI description={`Error: ${dataFetcherOutput.error.message}`} />
            </Grid>
         </Grid>
      );
   }

   return (
      <Grid container spacing={5} justifyContent="center" alignItems="center">
         {/* Encabezado */}
         <Grid size={12}>
            Elemento: Encabezado
            <HeaderUI />
         </Grid>

         {/* Alertas */}
         <Grid size={12} container justifyContent="right" alignItems="center">
            <AlertUI description="No se preveen lluvias" />
         </Grid>

         {/* Selector */}
         <Grid size={{ xs: 12, md: 3 }}>
            Elemento: Selector <SelectorUI />
         </Grid>

         {/* Indicadores */}
         <Grid container size={{ xs: 12, md: 9 }}>

            <Grid size={{ xs: 12, md: 3 }}>
               {dataFetcherOutput.data && (
                  <IndicatorUI
                     title="Temperatura (2m)"
                     description={`${dataFetcherOutput.data.current.temperature_2m} ${dataFetcherOutput.data.current_units.temperature_2m}`}
                  />
               )}
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
               {dataFetcherOutput.data &&
                  (<IndicatorUI
                     title='Temperatura aparente °C'
                     description={`${dataFetcherOutput.data.current.apparent_temperature} ${dataFetcherOutput.data.current_units.apparent_temperature}`}
                  />)
               }

            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
               {
                  /* IndicatorUI con la Velocidad del viento en km/h' */
                  dataFetcherOutput.data &&
                  (<IndicatorUI
                     title='Velocidad de viento(km/h)'
                     description={`${dataFetcherOutput.data.current.wind_speed_10m} ${dataFetcherOutput.data.current_units.wind_speed_10m}`}
                  />)
               }
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
               {/* IndicatorUI con la Humedad relativa en %' */
                  dataFetcherOutput.data &&
                  (<IndicatorUI title='Humedad relativa'
                     description={`${dataFetcherOutput.data.current.relative_humidity_2m} ${dataFetcherOutput.data.current_units.relative_humidity_2m}`}
                  />)
               }
            </Grid>




            {/* Gráfico */}
            <Grid
               size={{ xs: 12, md: 6 }}
               sx={{ display: { xs: "none", md: "block" } }}
            >
               Elemento: Gráfico
            </Grid>

            {/* Tabla */}
            <Grid
               size={{ xs: 12, md: 6 }}
               sx={{ display: { xs: "none", md: "block" } }}
            >
               Elemento: Tabla
            </Grid>

            {/* Información adicional */}
            <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>
         </Grid>
      </Grid>
   );
}

export default App;
