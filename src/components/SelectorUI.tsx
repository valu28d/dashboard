import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

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
      <FormControl fullWidth>
         <InputLabel id="city-select-label">Ciudad</InputLabel>
         <Select
            labelId="city-select-label"
            id="city-simple-select"
            label="Ciudad"
            onChange={handleChange}
            value={selectedCity}>
        
            <MenuItem disabled><em>Seleccione una ciudad</em></MenuItem>
            <MenuItem value={"guayaquil"}>Guayaquil</MenuItem>
            <MenuItem value={"quito"}>Quito</MenuItem>
            <MenuItem value={"manta"}>Manta</MenuItem>
            <MenuItem value={"cuenca"}>Cuenca</MenuItem>
            
            
         </Select>
         <p>
            Información del clima en <span style={{textTransform: 'capitalize', fontWeight: 'bold'}}>{selectedCity}</span>
         </p>
         
      </FormControl>
   );
}