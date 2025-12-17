import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import Card from '@mui/material/Card';

// Defina la interfaz del prop
interface SelectorProps {
   onOptionSelect: (option: string) => void;
   selectedCity: string;
}

// Defina el prop en el componente
export default function SelectorUI({ onOptionSelect, selectedCity }: SelectorProps) {

   const handleChange = (event: SelectChangeEvent<string>) => {
        const selectedValue = event.target.value;
        
        // Comunique los cambios al componente padre
        onOptionSelect(selectedValue);
    };

   return (
    <Card className="glass-card" sx={{ p: 2, mb: 2 }}>
      <FormControl fullWidth variant="standard">
         <InputLabel id="city-select-label" sx={{ color: 'primary.main' }}>Ciudad</InputLabel>
         <Select
            labelId="city-select-label"
            id="city-simple-select"
            label="Ciudad"
            onChange={handleChange}
            value={selectedCity}
            sx={{
                color: 'text.primary',
                ':before': { borderBottomColor: 'rgba(0,0,0,0.2)' },
                ':after': { borderBottomColor: 'primary.main' },
                '& .MuiSvgIcon-root': { color: 'action.active' }
            }}
            MenuProps={{
                PaperProps: {
                    style: {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                    }
                }
            }}
         >
        
            <MenuItem disabled value=""><em>Seleccione una ciudad</em></MenuItem>
            <MenuItem value={"guayaquil"}>Guayaquil</MenuItem>
            <MenuItem value={"quito"}>Quito</MenuItem>
            <MenuItem value={"manta"}>Manta</MenuItem>
            <MenuItem value={"cuenca"}>Cuenca</MenuItem>
            
            
         </Select>
         <p style={{ color: 'text.secondary' }}>
            Información del clima en <span style={{textTransform: 'capitalize', fontWeight: 'bold', color: 'primary.main'}}>{selectedCity}</span>
         </p>
         
      </FormControl>
    </Card>
   );
}