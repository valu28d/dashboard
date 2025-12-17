import { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box, CircularProgress } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SendIcon from '@mui/icons-material/Send';
import { useCohere } from '../hooks/useCohere';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

interface AssistantUIProps {
    data: OpenMeteoResponse;
}

export default function AssistantUI({ data }: AssistantUIProps) {
    const [question, setQuestion] = useState('');
    const { loading, response, error, askAssistant } = useCohere();

    const handleAsk = () => {
        if (!question.trim()) return;
        
        // Prepare context from data
        const context = `
            Temperatura actual: ${data.current.temperature_2m}°C.
            Humedad: ${data.current.relative_humidity_2m}%.
            Viento: ${data.current.wind_speed_10m} km/h.
            Sensación: ${data.current.apparent_temperature}°C.
        `;
        
        askAssistant(question, context);
    };

    return (
        <Card className="glass-card" sx={{ height: '100%' }}>
            <CardContent>
                <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                    <AutoAwesomeIcon sx={{ color: '#0d47a1', mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#0d47a1' }}>
                        Asistente IA
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <TextField 
                        fullWidth 
                        variant="outlined" 
                        placeholder="Pregúntame sobre el clima..." 
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAsk()}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '15px',
                                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            }
                        }}
                    />
                    <Button 
                        variant="contained" 
                        onClick={handleAsk}
                        disabled={loading}
                        sx={{ 
                            borderRadius: '15px', 
                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                            color: 'white'
                        }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                    </Button>
                </Box>

                {response && (
                    <Box sx={{ 
                        p: 2, 
                        borderRadius: '15px', 
                        backgroundColor: 'rgba(255, 255, 255, 0.6)', 
                        border: '1px solid rgba(255, 255, 255, 0.8)' 
                    }}>
                        <Typography variant="body1" sx={{ fontStyle: 'italic', color: '#333' }}>
                            "{response}"
                        </Typography>
                    </Box>
                )}

                {error && (
                   <Typography variant="body2" color="error" align="center" sx={{ mt: 1 }}>
                        {error}
                   </Typography>
                )}
            </CardContent>
        </Card>
    );
}
