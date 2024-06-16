import React, {useEffect, useState} from 'react';
import { Button, Paper, TableCell, TableRow } from '@mui/material';
import TabelaSimples from '../TabelaSimples';

export default function Tabela(props) {
  return (
    <div>
      <Paper elevation={3} style={{padding: 10}}><Button variant="contained" onClick={(e) => props.onClickCadastrar(e)}>Cadastrar</Button></Paper>
      <TabelaSimples columns={["Id", "Email", "Senha", "", ""]}
        rows={props.admins.map(admin => (
          <TableRow key={admin.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell align="center">{admin.id}</TableCell>
            <TableCell align="center">{admin.usuario.email}</TableCell>
            <TableCell align="center">{admin.usuario.senha}</TableCell>
            <TableCell align="center"><Button variant="contained" onClick={(e) => props.onClickEditar(e, admin)}>Editar</Button></TableCell>
            <TableCell align="center"><Button variant="contained" onClick={(e) => props.onClickExcluir(e, admin)}>Excluir</Button></TableCell>
          </TableRow>
        ))}/>
    </div>
  );
}