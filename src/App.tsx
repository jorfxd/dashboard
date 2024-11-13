import { useState } from 'react'

import './App.css'

import Grid from '@mui/material/Grid2'

function App() {
  const [] = useState(0)
  return (
    <Grid container spacing={5}>

        <Grid size={{ xs: 12, xl: 3 }}>Elemento: Indicador 1</Grid>
        <Grid size={{ xs: 12, xl: 3 }}>Elemento: Indicador 2</Grid>
        <Grid size={{ xs: 12, xl: 3 }}>Elemento: Indicador 3</Grid>
        <Grid size={{ xs: 12, xl: 3 }}>Elemento: Indicador 4</Grid>

        <Grid size={{ xs: 12, xl: 8 }}>Elemento: Tabla</Grid>

        <Grid size={{ xs: 12, xl: 4 }}>Elemento: Gráfico 1</Grid>
       
    </Grid>
)
}

export default App
