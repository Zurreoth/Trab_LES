import ResponsiveAppBar from '../../components/Appbar';
import Tabela from '../../components/usuario/Tabela';
import Formulario from '../../components/usuario/Formulario';
import './page.css';
import React, {useEffect, useState} from 'react';

function Usuarios() {

  const tabela = 'tabela'
  const formulario = 'formulario'
  const novoUsuario = {id:'', email:'', senha:''}

  const[usuarioSelecionado,setUsuarioSelecionado] = useState(novoUsuario)
  const[usuarios,setUsuarios] = useState([])
  const[render,setRender] = useState(tabela)

  const handleClickSalvar=(usuario) => {
    console.log(usuario)
    if(usuario.id != '') {
      editar(usuario)
    } else {
      salvar(usuario)
    }
    setRender(tabela)
  }

  const handleClickCadastrar=(e) => {
    e.preventDefault()
    setUsuarioSelecionado(novoUsuario)
    setRender(formulario)
  }

  const handleClickEditar=(e, usuario) => {
    e.preventDefault()
    console.log(usuario)
    setUsuarioSelecionado({id:usuario.id, email:usuario.email, senha:usuario.senha})
    setRender(formulario)
  }

  const handleClickExcluir=(e, usuario) => {
    e.preventDefault()
    console.log(usuario)
    excluir(usuario)
  }

  function excluir(usuario) {
    fetch("http://localhost:8080/usuario/" + usuario.id, {
        method:"DELETE",
        headers:{"Content-Type" : "application/json"}
      }
    ).then(() => {
      console.log("Excluido")
      obterUsuarios();
    })
  }

  function editar(usuario) {
    fetch("http://localhost:8080/usuario/" + usuario.id, {
        method:"PUT",
        headers:{"Content-Type" : "application/json"},
        body: JSON.stringify(usuario)
      }
    ).then(() => {
      console.log("Editado")
      obterUsuarios();
      limparUsuario()
    })
  }

  function salvar(usuario) {
    fetch("http://localhost:8080/usuario", {
        method:"POST",
        headers:{"Content-Type" : "application/json"},
        body: JSON.stringify(usuario)
      }
    ).then(() => {
      console.log("Adicionado")
      obterUsuarios();
      limparUsuario()
    })
  }

  function limparUsuario() {
    setUsuarioSelecionado(novoUsuario)
  }

  useEffect(() => {
    obterUsuarios();
  }, [])

  function obterUsuarios() {
    fetch("http://localhost:8080/usuario")
      .then(res => res.json())
      .then((result) => {
        setUsuarios(result);
      });
  }

  return (
    <div className="App">
      <ResponsiveAppBar/>
      {
        render === tabela ? (
          <Tabela onClickEditar={handleClickEditar} onClickExcluir={handleClickExcluir} usuarios={usuarios}
              onClickCadastrar={handleClickCadastrar}/>
        ) : (
          <Formulario onClickSalvar={handleClickSalvar} usuario={usuarioSelecionado}/>
        )
      }
    </div>
  );
}

export default Usuarios;
