import ResponsiveAppBar from '../../components/Appbar';
import Tabela from '../../components/admin/Tabela';
import Formulario from '../../components/admin/Formulario';
import './page.css';
import React, {useEffect, useState} from 'react';

function Admins() {

  const tabela = 'tabela'
  const formulario = 'formulario'
  const novoAdmin = {id:'', usuario:null}

  const[adminSelecionado,setAdminSelecionado] = useState(novoAdmin)
  const[admins,setAdmins] = useState([])
  const[render,setRender] = useState(tabela)

  const handleClickSalvar=(admin) => {
    console.log(admin)
    if(admin.id != '') {
      editar(admin)
    } else {
      salvar(admin)
    }
    setRender(tabela)
  }

  const handleClickCadastrar=(e) => {
    e.preventDefault()
    setAdminSelecionado(novoAdmin)
    setRender(formulario)
  }

  const handleClickEditar=(e, admin) => {
    e.preventDefault()
    console.log(admin)
    setAdminSelecionado({id:admin.id, usuario:admin.usuario})
    setRender(formulario)
  }

  const handleClickExcluir=(e, admin) => {
    e.preventDefault()
    console.log(admin)
    excluir(admin)
  }

  function excluir(admin) {
    fetch("http://localhost:8080/admin/" + admin.id, {
        method:"DELETE",
        headers:{"Content-Type" : "application/json"}
      }
    ).then(() => {
      console.log("Excluido")
      obterAdmins();
    })
  }

  function editar(admin) {
    fetch("http://localhost:8080/admin/" + admin.id, {
        method:"PUT",
        headers:{"Content-Type" : "application/json"},
        body: JSON.stringify(admin)
      }
    ).then(() => {
      console.log("Editado")
      obterAdmins();
      limparAdmin()
    })
  }

  function salvar(admin) {
    fetch("http://localhost:8080/admin", {
        method:"POST",
        headers:{"Content-Type" : "application/json"},
        body: JSON.stringify(admin)
      }
    ).then(() => {
      console.log("Adicionado")
      obterAdmins();
      limparAdmin()
    })
  }

  function limparAdmin() {
    setAdminSelecionado(novoAdmin)
  }

  useEffect(() => {
    obterAdmins();
  }, [])

  function obterAdmins() {
    fetch("http://localhost:8080/admin")
      .then(res => res.json())
      .then((result) => {
        setAdmins(result);
      });
  }

  return (
    <div className="App">
      <ResponsiveAppBar/>
      {
        render === tabela ? (
          <Tabela onClickEditar={handleClickEditar} onClickExcluir={handleClickExcluir} admins={admins}
              onClickCadastrar={handleClickCadastrar}/>
        ) : (
          <Formulario onClickSalvar={handleClickSalvar} admin={adminSelecionado}/>
        )
      }
    </div>
  );
}

export default Admins;
