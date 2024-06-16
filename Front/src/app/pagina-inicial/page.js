import { Button } from '@mui/material';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './page.css';

function App() {

  const navigate = useNavigate();

  const handleClickLogin=(e) => {
    e.preventDefault()
    navigate('/usuarios')
  }

  return (
    <div style={{padding:300}}>
      <h1>Bem Vindo</h1>
      <Button variant="contained" onClick={handleClickLogin}>Login</Button>
    </div>
  );
}

export default App;
