import ResponsiveAppBar from '../../components/Appbar';
import Tabela from '../../components/contrato/Tabela';
import Formulario from '../../components/contrato/Formulario';
import './page.css';
import React, {useEffect, useState} from 'react';

function Contratos() {

  const tabela = 'tabela'
  const formulario = 'formulario'
  const novoContrato = {
    id:'', 
    dataEmissao:  new Date().toJSON().slice(0,10),
    valor:0.0,
    status:1,
    contratante:undefined,
    vendedor:undefined,
    projetos:[]
  }

  const[contratoSelecionado,setContratoSelecionado] = useState(novoContrato)
  const[contratos,setContratos] = useState([])
  const[render,setRender] = useState(tabela)

  const handleClickSalvar=(contrato) => {
    console.log(contrato)
    if(contrato.id != '') {
      editar(contrato)
    } else {
      salvar(contrato)
    }
    setRender(tabela)
  }

  const handleClickCadastrar=(e) => {
    e.preventDefault()
    setContratoSelecionado(novoContrato)
    setRender(formulario)
  }

  const handleClickEditar=(e, contrato) => {
    e.preventDefault()
    console.log(contrato)
    setContratoSelecionado({
      id:contrato.id, 
      dataEmissao:contrato.dataEmissao,
      valor:contrato.valor,
      status:contrato.status,
      contratante:contrato.contratante,
      vendedor:contrato.vendedor,
      projetos:contrato.projetos
    })
    setRender(formulario)
  }

  const handleClickExcluir=(e, contrato) => {
    e.preventDefault()
    console.log(contrato)
    excluir(contrato)
  }

  function excluir(contrato) {
    fetch("http://localhost:8080/contrato/" + contrato.id, {
        method:"DELETE",
        headers:{"Content-Type" : "application/json"}
      }
    ).then(() => {
      console.log("Excluido")
      obterContratos();
    })
  }

  function editar(contrato) {
    fetch("http://localhost:8080/contrato/" + contrato.id, {
        method:"PUT",
        headers:{"Content-Type" : "application/json"},
        body: JSON.stringify(contrato)
      }
    ).then(() => {
      console.log("Editado")
      obterContratos();
      limparContrato()
    })
  }

  function salvar(contrato) {
    fetch("http://localhost:8080/contrato", {
        method:"POST",
        headers:{"Content-Type" : "application/json"},
        body: JSON.stringify(contrato)
      }
    ).then(() => {
      console.log("Adicionado")
      obterContratos();
      limparContrato()
    })
  }

  function limparContrato() {
    setContratoSelecionado(novoContrato)
  }

  useEffect(() => {
    obterContratos();
  }, [])

  function obterContratos() {
    fetch("http://localhost:8080/contrato")
      .then(res => res.json())
      .then((result) => {
        setContratos(result);
      });
  }

  return (
    <div className="App">
      <ResponsiveAppBar/>
      {
        render === tabela ? (
          <Tabela onClickEditar={handleClickEditar} onClickExcluir={handleClickExcluir} contratos={contratos}
              onClickCadastrar={handleClickCadastrar}/>
        ) : (
          <Formulario onClickSalvar={handleClickSalvar} contrato={contratoSelecionado}/>
        )
      }
    </div>
  );
}

export default Contratos;
