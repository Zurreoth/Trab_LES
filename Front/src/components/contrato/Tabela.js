import React, {useEffect, useState} from 'react';
import { Button, Paper, TableCell, TableRow } from '@mui/material';
import TabelaSimples from '../TabelaSimples';

export default function Tabela(props) {
  return (
    <div>
      <Paper elevation={3} style={{padding: 10}}><Button variant="contained" onClick={(e) => props.onClickCadastrar(e)}>Cadastrar</Button></Paper>
      <TabelaSimples columns={["Id", "Data Emissão", "Valor Total", "Status", "Contratante", "Vendedor", "", ""]}
        rows={props.contratos.map(contrato => (
          <TableRow key={contrato.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell align="center">{contrato.id}</TableCell>
            <TableCell align="center">{contrato.dataEmissao}</TableCell>
            <TableCell align="center">{contrato.valor}</TableCell>
            <TableCell align="center">{contrato.status}</TableCell>
            <TableCell align="center">{contrato.contratante?.usuario?.email}</TableCell>
            <TableCell align="center">{contrato.vendedor?.usuario?.email}</TableCell>
            <TableCell align="center"><Button variant="contained" onClick={(e) => props.onClickEditar(e, contrato)}>Editar</Button></TableCell>
            <TableCell align="center"><Button variant="contained" onClick={(e) => props.onClickExcluir(e, contrato)}>Excluir</Button></TableCell>
          </TableRow>
        ))}/>
    </div>
  );
}