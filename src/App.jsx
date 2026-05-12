
import { Routes, Route } from 'react-router-dom'

import Home from './pages/home'
import Login01 from './pages/telas/login';
import TempoReal01 from './pages/telas/tempo_real';
import Cadastro from './pages/telas/cadastro';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />   
      <Route path="/login" element={<Login01 />} /> 
      <Route path="/tempo_real" element={<TempoReal01 />} />
      <Route path="/cadastro" element={<Cadastro />} /> 
    </Routes>
  )
}

export default App;
