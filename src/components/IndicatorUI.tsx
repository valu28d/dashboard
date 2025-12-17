import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface IndicatorUIProps {
    title?: string;
    description?: string;
    icon?: React.ReactNode;
}

export default function IndicatorUI(props: IndicatorUIProps) {
    return (
        <Card className="glass-card" sx={{ height: '100%', position: 'relative' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                {props.icon && (
                    <Box sx={{ mb: 1, color: 'primary.main' }}>
                        {props.icon}
                    </Box>
                )}
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                    {props.description}
                </Typography>
                <Typography variant="body2" component="p" color="text.secondary" sx={{ mt: 1 }}>
                    {props.title}
                </Typography>
            </CardContent>
        </Card>
    )
}