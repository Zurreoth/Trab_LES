import ResponsiveAppBar from '../../components/Appbar';
import Tabela from '../../components/projeto/Tabela';
import Formulario from '../../components/projeto/Formulario';
import './page.css';
import React, {useEffect, useState} from 'react';

function Projetos() {

  const tabela = 'tabela'
  const formulario = 'formulario'
  const novoProjeto = {id:'', nome:'', valor:0, imagens:[]}

  const[projetoSelecionado,setProjetoSelecionado] = useState(novoProjeto)
  const[projetos,setProjetos] = useState([])
  const[render,setRender] = useState(tabela)

  const handleClickSalvar=(projeto) => {
    console.log(projeto)
    if(projeto.id != '') {
      editar(projeto)
    } else {
      salvar(projeto)
    }
    setRender(tabela)
  }

  const handleClickCadastrar=(e) => {
    e.preventDefault()
    setProjetoSelecionado(novoProjeto)
    setRender(formulario)
  }

  const handleClickEditar=(e, projeto) => {
    e.preventDefault()
    console.log(projeto)
    setProjetoSelecionado({id:projeto.id, usuario:projeto.usuario})
    setRender(formulario)
  }

  const handleClickExcluir=(e, projeto) => {
    e.preventDefault()
    console.log(projeto)
    excluir(projeto)
  }

  function excluir(projeto) {
    fetch("http://localhost:8080/projeto/" + projeto.id, {
        method:"DELETE",
        headers:{"Content-Type" : "application/json"}
      }
    ).then(() => {
      console.log("Excluido")
      obterProjetos();
    })
  }

  function editar(projeto) {
    fetch("http://localhost:8080/projeto/" + projeto.id, {
        method:"PUT",
        headers:{"Content-Type" : "application/json"},
        body: JSON.stringify(projeto)
      }
    ).then(() => {
      console.log("Editado")
      obterProjetos();
      limparProjeto()
    })
  }

  function salvar(projeto) {
    fetch("http://localhost:8080/projeto", {
        method:"POST",
        headers:{"Content-Type" : "application/json"},
        body: JSON.stringify(projeto)
      }
    ).then(() => {
      console.log("Adicionado")
      obterProjetos();
      limparProjeto()
    })
  }

  function limparProjeto() {
    setProjetoSelecionado(novoProjeto)
  }

  useEffect(() => {
    obterProjetos();
  }, [])

  function obterProjetos() {
    fetch("http://localhost:8080/projeto")
      .then(res => res.json())
      .then((result) => {
        setProjetos(result);
      });
  }

  return (
    <div className="App">
      <ResponsiveAppBar/>
      {
        render === tabela ? (
          <Tabela onClickEditar={handleClickEditar} onClickExcluir={handleClickExcluir} projetos={projetos}
              onClickCadastrar={handleClickCadastrar}/>
        ) : (
          <Formulario onClickSalvar={handleClickSalvar} projeto={projetoSelecionado}/>
        )
      }
    </div>
  );
}

export default Projetos;
