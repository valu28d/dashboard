import Typography from "@mui/material/Typography";

export default function HeaderUI(){
    return (
        <Typography
            variant = "h3"
            component="h1"
            align="center"
            sx={{
                fontWeight: "bold",
                mb: 2,
                color: 'text.primary',
                textTransform: 'uppercase',
                letterSpacing: 2
            }}>
            Dashboard del Clima            
        </Typography>
    )
}