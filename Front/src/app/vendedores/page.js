import ResponsiveAppBar from '../../components/Appbar';
import Tabela from '../../components/vendedor/Tabela';
import Formulario from '../../components/vendedor/Formulario';
import './page.css';
import React, {useEffect, useState} from 'react';

function Vendedores() {

  const tabela = 'tabela'
  const formulario = 'formulario'
  const novoVendedor = {id:'', usuario:null}

  const[vendedorSelecionado,setVendedorSelecionado] = useState(novoVendedor)
  const[vendedores,setVendedores] = useState([])
  const[render,setRender] = useState(tabela)

  const handleClickSalvar=(vendedor) => {
    console.log(vendedor)
    if(vendedor.id != '') {
      editar(vendedor)
    } else {
      salvar(vendedor)
    }
    setRender(tabela)
  }

  const handleClickCadastrar=(e) => {
    e.preventDefault()
    setVendedorSelecionado(novoVendedor)
    setRender(formulario)
  }

  const handleClickEditar=(e, vendedor) => {
    e.preventDefault()
    console.log(vendedor)
    setVendedorSelecionado({id:vendedor.id, usuario:vendedor.usuario})
    setRender(formulario)
  }

  const handleClickExcluir=(e, vendedor) => {
    e.preventDefault()
    console.log(vendedor)
    excluir(vendedor)
  }

  function excluir(vendedor) {
    fetch("http://localhost:8080/vendedor/" + vendedor.id, {
        method:"DELETE",
        headers:{"Content-Type" : "application/json"}
      }
    ).then(() => {
      console.log("Excluido")
      obterVendedores();
    })
  }

  function editar(vendedor) {
    fetch("http://localhost:8080/vendedor/" + vendedor.id, {
        method:"PUT",
        headers:{"Content-Type" : "application/json"},
        body: JSON.stringify(vendedor)
      }
    ).then(() => {
      console.log("Editado")
      obterVendedores();
      limparVendedor()
    })
  }

  function salvar(vendedor) {
    fetch("http://localhost:8080/vendedor", {
        method:"POST",
        headers:{"Content-Type" : "application/json"},
        body: JSON.stringify(vendedor)
      }
    ).then(() => {
      console.log("Adicionado")
      obterVendedores();
      limparVendedor()
    })
  }

  function limparVendedor() {
    setVendedorSelecionado(novoVendedor)
  }

  useEffect(() => {
    obterVendedores();
  }, [])

  function obterVendedores() {
    fetch("http://localhost:8080/vendedor")
      .then(res => res.json())
      .then((result) => {
        setVendedores(result);
      });
  }

  return (
    <div className="App">
      <ResponsiveAppBar/>
      {
        render === tabela ? (
          <Tabela onClickEditar={handleClickEditar} onClickExcluir={handleClickExcluir} vendedores={vendedores}
              onClickCadastrar={handleClickCadastrar}/>
        ) : (
          <Formulario onClickSalvar={handleClickSalvar} vendedor={vendedorSelecionado}/>
        )
      }
    </div>
  );
}

export default Vendedores;
