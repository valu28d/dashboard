import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

interface TableUIProps {
   data?: OpenMeteoResponse;
}

function prepareTableData(data: OpenMeteoResponse) {
   return data.hourly.time.map((timeStr, index) => {
      const date = new Date(timeStr);
      const formattedTime = `${date.toLocaleDateString()} ${date.getHours()}:00`;
      
      return {
         id: index,
         time: formattedTime,
         temperature: data.hourly.temperature_2m[index],
         windSpeed: data.hourly.wind_speed_10m[index]
      };
   });
}

export default function TableUI({ data }: TableUIProps) {
   // Si no hay datos, mostrar mensaje
   if (!data || !data.hourly) {
      return (
         <Box sx={{ height: 350, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="body2" color="text.secondary">
               No hay datos disponibles para mostrar
            </Typography>
         </Box>
      );
   }

   const columns: GridColDef[] = [
      { field: 'id', headerName: 'ID', width: 40, align: 'center', headerAlign: 'center' },
      {
         field: 'time',
         headerName: 'Fecha y Hora',
         width: 180,
         align: 'center', 
         headerAlign: 'center'
      },
      {
         field: 'temperature',
         headerName: `Temperatura (${data.hourly_units.temperature_2m})`,
         width: 130,
         type: 'number',
         align: 'center', 
         headerAlign: 'center'
      },
      {
         field: 'windSpeed',
         headerName: `Viento (${data.hourly_units.wind_speed_10m})`,
         width: 130,
         type: 'number',
         align: 'center', 
         headerAlign: 'center'
      },
      {
         field: 'resumen',
         headerName: 'Resumen',
         description: 'Resumen de las condiciones meteorológicas.',
         sortable: false,
         hideable: false,
         width: 150,
         align: 'center', 
         headerAlign: 'center',
         valueGetter: (_, row) => `${row.temperature}° - ${row.windSpeed} km/h`,
      },
   ];

   const rows = prepareTableData(data);
   
   return (
      <Box className="glass-card" sx={{ height: 350, width: '100%', p: 2 }}>
         <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
               pagination: {
                  paginationModel: {
                     pageSize: 5,
                  },
               },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            sx={{
               border: 'none',
               '& .MuiDataGrid-cell:hover': {
                  color: 'primary.main',
               },
               '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: 'rgba(0,0,0,0.02)',
               },
            }}
         />
      </Box>
   );
}