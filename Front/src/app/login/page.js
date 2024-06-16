import { Button } from '@mui/material';
import './page.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import TextFieldBasico from '../../components/TextField';
import ProtectedRoutes from '../../components/ProtectedRoutes';

function Login(props) {

  const[email,setEmail] = useState('')
  const[senha,setSenha] = useState('')

  const navigate = useNavigate();

  const handleClickEntrar=(e) => {
    e.preventDefault()
    fetch("http://localhost:8080/usuario/login", {
        method:"POST",
        headers:{"Content-Type" : "application/json"},
        body: JSON.stringify({email:email, senha:senha})
      }
    ).then(response => response.text())
    .then((res) => {
      console.log(res)
      if(res == 'true') {
        props.onLogin(res)
        navigate('/usuarios')
      }
    }).catch((error) => {
      console.log(error)
    });
  }

  return (
    <div style={{padding:200}}>
      <form style={{padding: 10}}>
        <TextFieldBasico id="email" label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
        <TextFieldBasico id="senha" label="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}/>

        <Button variant="contained" onClick={handleClickEntrar}>Entrar</Button>
      </form>
    </div>
  );
}

export default Login;
