import React, {useEffect, useState} from 'react';
import { Button, Paper, TableCell, TableRow } from '@mui/material';
import TabelaSimples from '../TabelaSimples';

export default function Tabela(props) {
  return (
    <div>
      <Paper elevation={3} style={{padding: 10}}><Button variant="contained" onClick={(e) => props.onClickCadastrar(e)}>Cadastrar</Button></Paper>
      <TabelaSimples columns={["Id", "Nome", "Valor", "", ""]}
        rows={props.projetos.map(projeto => (
          <TableRow key={projeto.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell align="center">{projeto.id}</TableCell>
            <TableCell align="center">{projeto.nome}</TableCell>
            <TableCell align="center">{projeto.valor}</TableCell>
            <TableCell align="center"><Button variant="contained" onClick={(e) => props.onClickEditar(e, projeto)}>Editar</Button></TableCell>
            <TableCell align="center"><Button variant="contained" onClick={(e) => props.onClickExcluir(e, projeto)}>Excluir</Button></TableCell>
          </TableRow>
        ))}/>
    </div>
  );
}