
import { Routes, Route } from 'react-router-dom'

import Home from './pages/home'
import Login01 from './pages/telas/login';
import TempoReal01 from './pages/telas/tempo_real';
import Cadastro from './pages/telas//cadastro';
import Login_adm from './pages/telas/login_adm';
import Home_adm from './pages/home_adm';
import Atualizar_adm from './pages/telas/atualizar_veiculo';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />   
      <Route path="/login" element={<Login01 />} /> 
      <Route path="/tempo_real" element={<TempoReal01 />} />
      <Route path="/cadastro" element={<Cadastro />} /> 
      <Route path="/login_adm" element={<Login_adm />} /> 
      <Route path="/Home_adm" element={<Home_adm />} />
      <Route path="/atualizar_adm" element={<Atualizar_adm />} />
    </Routes>
  )
}

export default App;
