import { Routes, Route } from 'react-router-dom'

import Home from './pages/home/index'
import Login01 from './pages/telas/login/index'
import TempoReal01 from './pages/telas/tempo_real/index'
import Cadastro from './pages/telas/cadastro/index'
import Login_adm from './pages/telas/login_adm/index'
import Home_adm from './pages/home_adm/index'
import Atualizar_adm from './pages/telas/atualizar_veiculo/index'
import Financeiro_adm from './pages/telas/financeiro/index'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login01 />} />
      <Route path="/tempo_real" element={<TempoReal01 />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/login_adm" element={<Login_adm />} />
      <Route path="/home_adm" element={<Home_adm />} />
      <Route path="/atualizar_veiculo" element={<Atualizar_adm />} />
      <Route path="/financeiro" element={<Financeiro_adm />} />
    </Routes>
  )
}

export default App