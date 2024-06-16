import React, {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import { Button, CircularProgress } from '@mui/material';
import TextFieldBasico from '../TextField';
import BasicSelect from '../SelectBasico.js';

export default function Formulario(props) {

  const[id,setId] = useState(props.contrato?.id)
  const[dataEmissao,setDataEmissao] = useState(props.contrato?.dataEmissao)
  const[valor,setValor] = useState(props.contrato?.valor)
  const[status,setStatus] = useState(props.contrato?.status)
  const[contratante,setContratante] = useState(props.contrato?.contratante)
  const[vendedor,setVendedor] = useState(props.contrato?.vendedor)
  const[projetos,setProjetos] = useState(props.contrato?.projetos)

  const[optionsContratantes,setOptionsContratantes] = useState([])
  const[optionsVendedores,setOptionsVendedores] = useState([])
  const[optionsProjetos,setOptionsProjetos] = useState([])
  const[loadingVendedores, setLoadingVendedores] = useState(true);
  const[loadingContratantes, setLoadingContratantes] = useState(true);
  const[loadingProjetos, setLoadingProjetos] = useState(true);

  function handleClickSalvar(e) {
    e.preventDefault()
    const contrato = {
      id:id, 
      dataEmissao:dataEmissao,
      valor:valor,
      status:status,
      contratante:contratante,
      vendedor:vendedor,
      projetos:projetos
    }
    console.log(contrato)
    props.onClickSalvar(contrato)
  }

  function handleClickAdicionarProjeto(e) {
    e.preventDefault()
    setProjetos(projetos.concat({}))
  }

  function onChangeProjeto(e, index) {
    e.preventDefault()
    let items = projetos;
    items[index] = e.target.value
    setProjetos(items)

    console.log(items)
    let valorTotal = 0.0
    items.forEach(item => {
      valorTotal += item.value.valor
    });
    setValor(valorTotal)

  }

  useEffect(() => {
    obterItensContratantes();
    obterItensVendedores();
    obterItensProjetos();
  }, [])

  function obterItensContratantes() {
    fetch("http://localhost:8080/contratante")
      .then(res => res.json())
      .then((result) => {
        const formattedOptions = result.map(item => ({
          id: item.id,
          value: item,
          label: item.usuario?.email
        }));
        setOptionsContratantes(formattedOptions)
        setLoadingContratantes(false);
      });
  }

  function obterItensVendedores() {
    fetch("http://localhost:8080/vendedor")
      .then(res => res.json())
      .then((result) => {
        const formattedOptions = result.map(item => ({
          id: item.id,
          value: item,
          label: item.usuario?.email
        }));
        setOptionsVendedores(formattedOptions)
        setLoadingVendedores(false);
      });
  }

  function obterItensProjetos() {
    fetch("http://localhost:8080/projeto")
      .then(res => res.json())
      .then((result) => {
        const formattedOptions = result.map(item => ({
          id: item.id,
          value: item,
          label: item.nome
        }));
        setOptionsProjetos(formattedOptions)
        setLoadingProjetos(false);
      });
  }

  if (loadingContratantes || loadingVendedores || loadingProjetos) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <form style={{padding: 10}}>
        <TextFieldBasico id="dataEmissao" label="Data Emissao"
            value={dataEmissao}
            data-date-format="yyyy-MM-dd"
            onChange={(e) => setDataEmissao(e.target.value)}
            type="date" />

        <TextFieldBasico id="valor" label="Valor"
            value={valor}
            onChange={(e) => setValor(e.target.value)}/>
        
        <TextFieldBasico id="status" label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}/>

        <BasicSelect id="contratante" label="Contratante"
            value={contratante}
            onChange={(e) => setContratante(e.target.value)}
            itens={optionsContratantes}/>

        <BasicSelect id="vendedor" label="Vendedor"
            value={vendedor}
            onChange={(e) => setVendedor(e.target.value)}
            itens={optionsVendedores}/>

        <Button variant="contained" onClick={(e) => handleClickAdicionarProjeto(e)}>Adicionar Projeto</Button>
        <br/>
        {projetos.map(projeto => {
          return <BasicSelect id={"projeto" + projetos.indexOf(projeto)} label="Projeto"
                  value={projeto.nome}
                  onChange={(e) => onChangeProjeto(e, projetos.indexOf(projeto))}
                  itens={optionsProjetos}/>
        })}

        <Button variant="contained" onClick={(e) => handleClickSalvar(e)}>Salvar</Button>
      </form>
    </div>
  );
}