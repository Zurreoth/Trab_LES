import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';

const pages = [{nome:'Usuarios', url:'/usuarios'}, 
              {nome:'Contratantes', url:'/contratantes'},
              {nome:'Vendedores', url:'/vendedores'},
              {nome:'Admin', url:'/admin'},
              {nome:'Projetos', url:'/projetos'},
              {nome:'Contratos', url:'/contratos'}];

function ResponsiveAppBar() {

  const navigate = useNavigate();

  const handleClickNavbar=(e,url) => {
    e.preventDefault();
    navigate(url)
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Roboto',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ConstruContract
          </Typography>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.nome}
                onClick={(e) => handleClickNavbar(e, page.url)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.nome}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;