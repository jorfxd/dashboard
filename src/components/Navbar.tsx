import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud'; // Icono similar a tu imagen

const Navbar: React.FC = () => {
    return (
        <AppBar position="fixed" style={{ backgroundColor: '#0B4175' }}>
            <Toolbar>
                <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
                    <CloudIcon style={{ color: 'white', marginRight: '8px' }} />
                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                        Ecuador meteorologico
                    </Typography>
                </Box>

                <Button
                    color="inherit"
                    sx={{
                        '&:hover': {
                            textDecoration: 'underline',
                            color: '#FFEB3B',
                        }
                    }}
                    href="#inicio" // Usamos href con el ID correspondiente
                >
                    Inicio
                </Button>
                
                <Button
                    color="inherit"
                    sx={{
                        '&:hover': {
                            textDecoration: 'underline',
                            color: '#FFEB3B',
                        }
                    }}
                    href="#detalles" // Usamos href con el ID correspondiente
                >
                    Detalles
                </Button>

                <Button
                    color="inherit"
                    sx={{
                        '&:hover': {
                            textDecoration: 'underline',
                            color: '#FFEB3B',
                        }
                    }}
                    href="#historial" // Usamos href con el ID correspondiente
                >
                    Historial
                </Button>

                <Button
                    color="inherit"
                    sx={{
                        '&:hover': {
                            textDecoration: 'underline',
                            color: '#FFEB3B',
                        }
                    }}
                    href="#grafico" // Usamos href con el ID correspondiente
                >
                    Gráfico
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
