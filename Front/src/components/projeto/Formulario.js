import React, {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import TextFieldBasico from '../TextField';
import InputFileUpload from '../UploadButton';

export default function Formulario(props) {

  const[id,setId] = useState(props.projeto?.id)
  const[nome,setNome] = useState(props.projeto?.nome)
  const[valor,setValor] = useState(props.projeto?.valor)
  const[imagens,setImagens] = useState(props.projeto?.imagens)

  let base64String = "";

  function handleClickSalvar(e) {
    e.preventDefault()
    const projeto = {id:id, nome:nome, valor:valor, imagens:imagens}
    props.onClickSalvar(projeto)
  }

  function handleInputImg(e) {
    e.preventDefault()
  }

  return (
    <div>
      <form style={{padding: 10}}>
        <TextFieldBasico id="nome" label="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)} />
        <TextFieldBasico id="valor" label="Valor"
            value={valor}
            onChange={(e) => setValor(e.target.value)}/>

        <InputFileUpload onChange={handleInputImg} accept="image/*" />

        <Button variant="contained" onClick={(e) => handleClickSalvar(e)}>Salvar</Button>
      </form>
    </div>
  );
}