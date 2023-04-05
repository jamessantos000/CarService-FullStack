import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home/home';
import Painel from './components/Adm/Painel/painel';
import Carros from './components/Adm/Carros/carros';
import Defeitos from './components/Adm/Defeitos/defeitos';

function RouteApp() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exect path='/' Component={Home} />
      <Route path='/adm/painel' Component={Painel} />
      <Route path='/adm/carros' Component={Carros} />
      <Route path='/adm/defeitos' Component={Defeitos} />
    </Routes>
    </BrowserRouter>
  );
}

export default RouteApp;