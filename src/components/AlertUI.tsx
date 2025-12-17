import Alert from '@mui/material/Alert';

interface AlertConfig{
    description: string;
}

export default function AlertConfig(config:AlertConfig){
    return(
        <Alert 
            variant='standard' 
            severity='info'
            sx={{
                backdropFilter: 'blur(5px)',
                backgroundColor: 'rgba(227, 242, 253, 0.7)', // Light Blue/Info glass
                color: '#0d47a1', // Deep blue text
                borderRadius: '20px',
                border: '1px solid rgba(144, 202, 249, 0.5)' // Subtle blue border
            }}
        >
            {config.description}
        </Alert>
    )
}