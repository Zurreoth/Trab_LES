import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function TabelaSimples(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="Usuarios">
        <TableHead>
          <TableRow>
            {props.columns.map(column => <TableCell align="center">{column}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows}
        </TableBody>
      </Table>
    </TableContainer>
  );
}