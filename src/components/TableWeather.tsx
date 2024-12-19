import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// Interfaz para los elementos del arreglo
import Item from '../interface/Item';


// Interfaz para los props
interface MyProp {
  itemsIn: Item[];
}

// Componente principal
export default function TableWeather(props: MyProp) {
  // Estado para los datos de la tabla
  let [rows, setRows] = useState<Item[]>([]);

  // Actualiza los datos del estado cuando cambian los props
  useEffect(() => {
    setRows(props.itemsIn);
  }, [props.itemsIn]);

  return (
    <TableContainer component={Paper} className="table-weather-container">
      <Table sx={{ minWidth: 650 }} aria-label="weather table">
        {/* Encabezados de la tabla */}
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Hora de inicio</TableCell>
            <TableCell sx={{ fontSize: '1.5rem', fontWeight: 'bold' }} align="right">Hora de fin</TableCell>
            <TableCell sx={{ fontSize: '1.5rem', fontWeight: 'bold' }} align="right">Precipitación</TableCell>
            <TableCell sx={{ fontSize: '1.5rem', fontWeight: 'bold' }} align="right">Humedad</TableCell>
            <TableCell sx={{ fontSize: '1.5rem', fontWeight: 'bold' }} align="right">Nubosidad</TableCell>
          </TableRow>
        </TableHead>

        {/* Cuerpo de la tabla */}
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow
              key={idx}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.dateStart}
              </TableCell>
              <TableCell sx={{ fontSize: '1.2rem' }}>{row.dateStart}</TableCell>
              <TableCell sx={{ fontSize: '1.2rem' }} align="right">{row.dateEnd}</TableCell>
              <TableCell sx={{ fontSize: '1.2rem' }} align="right">{row.precipitation}</TableCell>
              <TableCell sx={{ fontSize: '1.2rem' }} align="right">{row.humidity}</TableCell>
              <TableCell sx={{ fontSize: '1.2rem' }} align="right">{row.clouds}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
