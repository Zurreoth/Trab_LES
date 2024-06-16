import ResponsiveAppBar from '../../components/Appbar';
import Tabela from '../../components/contratante/Tabela';
import Formulario from '../../components/contratante/Formulario';
import './page.css';
import React, {useEffect, useState} from 'react';

function Contratantes() {

  const tabela = 'tabela'
  const formulario = 'formulario'
  const novoContratante = {id:'', usuario:null}

  const[contratanteSelecionado,setContratanteSelecionado] = useState(novoContratante)
  const[contratantes,setContratantes] = useState([])
  const[render,setRender] = useState(tabela)

  const handleClickSalvar=(contratante) => {
    console.log(contratante)
    if(contratante.id != '') {
      editar(contratante)
    } else {
      salvar(contratante)
    }
    setRender(tabela)
  }

  const handleClickCadastrar=(e) => {
    e.preventDefault()
    setContratanteSelecionado(novoContratante)
    setRender(formulario)
  }

  const handleClickEditar=(e, contratante) => {
    e.preventDefault()
    console.log(contratante)
    setContratanteSelecionado({id:contratante.id, usuario:contratante.usuario})
    setRender(formulario)
  }

  const handleClickExcluir=(e, contratante) => {
    e.preventDefault()
    console.log(contratante)
    excluir(contratante)
  }

  function excluir(contratante) {
    fetch("http://localhost:8080/contratante/" + contratante.id, {
        method:"DELETE",
        headers:{"Content-Type" : "application/json"}
      }
    ).then(() => {
      console.log("Excluido")
      obterContratantes();
    })
  }

  function editar(contratante) {
    fetch("http://localhost:8080/contratante/" + contratante.id, {
        method:"PUT",
        headers:{"Content-Type" : "application/json"},
        body: JSON.stringify(contratante)
      }
    ).then(() => {
      console.log("Editado")
      obterContratantes();
      limparContratante()
    })
  }

  function salvar(contratante) {
    fetch("http://localhost:8080/contratante", {
        method:"POST",
        headers:{"Content-Type" : "application/json"},
        body: JSON.stringify(contratante)
      }
    ).then(() => {
      console.log("Adicionado")
      obterContratantes();
      limparContratante()
    })
  }

  function limparContratante() {
    setContratanteSelecionado(novoContratante)
  }

  useEffect(() => {
    obterContratantes();
  }, [])

  function obterContratantes() {
    fetch("http://localhost:8080/contratante")
      .then(res => res.json())
      .then((result) => {
        setContratantes(result);
      });
  }

  return (
    <div className="App">
      <ResponsiveAppBar/>
      {
        render === tabela ? (
          <Tabela onClickEditar={handleClickEditar} onClickExcluir={handleClickExcluir} contratantes={contratantes}
              onClickCadastrar={handleClickCadastrar}/>
        ) : (
          <Formulario onClickSalvar={handleClickSalvar} contratante={contratanteSelecionado}/>
        )
      }
    </div>
  );
}

export default Contratantes;
