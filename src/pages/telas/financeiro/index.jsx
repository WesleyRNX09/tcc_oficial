import { useState } from 'react';
import Botao from './botao'
import { Link } from "react-router-dom";
import logo from '../../../assets/logo.png';

import ordemServiço from "../../../assets/historico_de_ordem.png";
import adicionarFuncionario from "../../../assets/adicionar_funcionario.png";
import carro from "../../../assets/carro.png";
import relatorio from "../../../assets/relatorio.png";

import seta from "../../../assets/seta_esquerda1.png";
import fiat from "../../../assets/punto_os.png";
import pneu from "../../../assets/pneus.png";

import entrada from "../../../assets/entrada.png";
import analise from "../../../assets/analise.png";
import diagnostico from "../../../assets/diagnostico.png";
import processo from "../../../assets/processo.png";
import finalizado from "../../../assets/finalizado.png";

import { useNavigate } from "react-router-dom";

import styles from './index.module.css';

function atualizar() {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const [busca, setBusca] = useState('');

  return (
    <div className={styles.container}>

      <div className={styles.barra_Principal}>
        <div className={styles.barra_Logo}>
          <button
            className={`${styles.barra_menu_btn} ${menuAberto ? styles.barra_menu_btn_aberto : ''}`}
            onClick={() => setMenuAberto(!menuAberto)}
            aria-label="Abrir menu"
          >
            <span className={styles.barra_linha}></span>
            <span className={styles.barra_linha}></span>
            <span className={styles.barra_linha}></span>
          </button>
          <img src={logo} className={styles.barra_Imagem} />
        </div>

        <div className={styles.barra_conteudo}>
          <Link to="/login" className={styles.barra_botao}>Serviços</Link>
          <Link to="/" className={styles.barra_botao}>Acompanhar Veiculo</Link>
          <Link to="/login" className={styles.barra_botao}>Fazer Login</Link>
        </div>
      </div>

      <div className={styles.home_conteudo}>

        {menuAberto && (
          <div className={styles.home_overlay} onClick={() => setMenuAberto(false)} />
        )}

        {/* Sidebar */}
        <div className={`${styles.home_margin1} ${menuAberto ? styles.home_margin1_aberto : ''}`} style={{ width: menuAberto ? '50rem' : '0', minWidth: menuAberto ? '50rem' : '0' }}>
          <div className={styles.home_margin1_inner}>
            <Botao texto="FINANCEIRO" acao={'vermelho'} aoClicar={() => navigate("/cadastro")} />

            <div className={styles.home_margin1_btn}>
              <img src={ordemServiço} className={styles.home_margin1_img} />
              <Link to="/login" className={styles.home_margin1_text}>HISTORICO DE ORDEM DE SERVIÇO</Link>
            </div>

            <div className={styles.home_margin1_btn}>
              <img src={adicionarFuncionario} className={styles.home_margin1_img} />
              <Link to="/login" className={styles.home_margin1_text}>ADICIONAR FUNCIONARIO</Link>
            </div>

            <div className={styles.home_margin1_btn}>
              <img src={carro} className={styles.home_margin1_img} />
              <Link to="/login" className={styles.home_margin1_text}>ATUALIZAR VEÍCULO</Link>
            </div>

            <div className={styles.home_margin1_btn}>
              <img src={carro} className={styles.home_margin1_img} />
              <Link to="/login" className={styles.home_margin1_text}>CADASTRAR VEÍCULO</Link>
            </div>

            <div className={styles.home_margin1_btn}>
              <img src={relatorio} className={styles.home_margin1_img} />
              <Link to="/login" className={styles.home_margin1_text}>RELATORIOS</Link>
            </div>
          </div>
        </div> 
      </div>

      <div className={styles.rodape_principal}></div>
      
    </div>
  );
}

export default atualizar;
