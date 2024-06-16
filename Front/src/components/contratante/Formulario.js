import React, {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import TextFieldBasico from '../TextField';

export default function Formulario(props) {

  const[id,setId] = useState(props.contratante?.id)
  const[email,setEmail] = useState(props.contratante?.usuario?.email)
  const[senha,setSenha] = useState(props.contratante?.usuario?.senha)

  function handleClickSalvar(e) {
    e.preventDefault()
    const contratante = {id:id, usuarioDTO:{email:email, senha:senha}}
    props.onClickSalvar(contratante)
  }

  return (
    <div>
      <form style={{padding: 10}}>
        <TextFieldBasico id="email" label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
        <TextFieldBasico id="senha" label="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}/>

        <Button variant="contained" onClick={(e) => handleClickSalvar(e)}>Salvar</Button>
      </form>
    </div>
  );
}