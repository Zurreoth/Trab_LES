import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/pagina-inicial/page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './app/login/page';
import Usuarios from './app/usuario/page';
import Contratantes from './app/contratante/page';
import Vendedores from './app/vendedores/page';
import Admins from './app/admin/page';
import Projetos from './app/projeto/page';
import Contratos from './app/contrato/page';
import ProtectedRoutes from './components/ProtectedRoutes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
          <Route exact path="/" Component={App}/>
          <Route Component={ProtectedRoutes}>
            <Route exact path="/usuarios" Component={Usuarios}/>
            <Route exact path="/contratantes" Component={Contratantes}/>
            <Route exact path="/vendedores" Component={Vendedores}/>
            <Route exact path="/admin" Component={Admins}/>
            <Route exact path="/projetos" Component={Projetos}/>
            <Route exact path="/contratos" Component={Contratos}/>
          </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
