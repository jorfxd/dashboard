import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// Interfaz para los elementos del arreglo
export interface Item {
  dateStart: string;
  dateEnd: string;
  precipitation: number;
  humidity: number;
  clouds: number;
}

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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="weather table">
        {/* Encabezados de la tabla */}
        <TableHead>
          <TableRow>
            <TableCell>Hora de inicio</TableCell>
            <TableCell align="right">Hora de fin</TableCell>
            <TableCell align="right">Precipitación</TableCell>
            <TableCell align="right">Humedad</TableCell>
            <TableCell align="right">Nubosidad</TableCell>
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
              <TableCell align="right">{row.dateEnd}</TableCell>
              <TableCell align="right">{row.precipitation}</TableCell>
              <TableCell align="right">{row.humidity}</TableCell>
              <TableCell align="right">{row.clouds}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
