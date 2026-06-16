import { useState } from 'react';
import Botao from './botao'
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';
import fundo01 from '../../assets/pagina_inicial01.png';
import fundo02 from '../../assets/fundoHOM3.png';
import { useNavigate } from "react-router-dom";
import imagem01 from '../../assets/Revisao.png';
import imagem02 from '../../assets/suspensao.png';
import imagem03 from '../../assets/freios.png';
import imagem04 from '../../assets/pneus.png';
import imagem05 from '../../assets/oleo.png';

import styles from './index.module.css';

function Home() {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <div className={styles.container}>

      <div className={styles.barra_Principal}>

        <div className={styles.barra_Logo}>
          {/* 👇 Botão hambúrguer que abre/fecha */}
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
          <Link   className={styles.barra_botao} onClick={() => setModalAberto(true)}>Acompanhar Veiculo</Link>
          <Link to="/login_adm" className={styles.barra_botao}>Logar Como Adiministrador</Link>
        </div>
      </div>

      <div className={styles.home_conteudo}>

        {/* 👇 Overlay escurecido clicável para fechar o menu */}
        {menuAberto && (
          <div
            className={styles.home_overlay}
            onClick={() => setMenuAberto(false)}
          />
        )}

        {/* 👇 Sidebar — abre/fecha com classe dinâmica */}
        {/* Sidebar */}
        <div
          className={`${styles.home_margin1} ${
            menuAberto ? styles.home_margin1_aberto : ''
          }`}
          style={{
            width: menuAberto ? '50rem' : '0',
            minWidth: menuAberto ? '50rem' : '0',
          }}
        >
            <div className={styles.home_margin1_inner}>
              <Botao texto="ENTRE EM CONTATO CONOSCO" acao={'vermelho'} />
              <img src={fundo01} className={styles.home_imagem01} />
            </div>
        </div>

        {/* 👇 Conteúdo principal — expande quando menu fecha */}
        <div
  className={styles.home_margin2} style={{width: menuAberto ? '75%' : '100%',}}>
          <div className={styles.home_box}>
            <div className={styles.controlImg}>
              <img src={fundo02} className={styles.home_imagem02} />
            </div>

            <div className={styles.home_box02}>
              <h1>Serviços</h1>
              <div className={styles.home_caixas}>
                <div className={styles.home_caixa}>
                  <img src={imagem01} className={styles.home_caixa_imagem} />
                  <h3>Revisão Geral</h3>
                </div>
                <div className={styles.home_caixa}>
                  <img src={imagem02} className={styles.home_caixa_imagem} />
                  <h3>Suspensão</h3>
                </div>
                <div className={styles.home_caixa}>
                  <img src={imagem03} className={styles.home_caixa_imagem} />
                  <h3>Freios</h3>
                </div>
                <div className={styles.home_caixa}>
                  <img src={imagem04} className={styles.home_caixa_imagem} />
                  <h3>Pneus</h3>
                </div>
                <div className={styles.home_caixa}>
                  <img src={imagem05} className={styles.home_caixa_imagem} />
                  <h3>Óleo</h3>
                </div>
              </div>
              <Botao
                texto="ACOMPANHAR VEÍCULO" acao={'vermelho'} aoClicar={() => setModalAberto(true)}/>
            </div>
          </div>
        </div>

      </div>
      
      {modalAberto && (
          <div className={styles.modal_overlay}onClick={() => setModalAberto(false)}>

            <div className={styles.modal_box}onClick={(e) => e.stopPropagation()}>

              <button className={styles.modal_fechar}onClick={() => setModalAberto(false)}>✕</button>
              
              <img src={logo} className={styles.modal_logo} />

              <h1>
                Pesquisar por <span>Veículo</span>
              </h1>

              <label>Insira o Código do Veículo:</label>

              <input type="text" className={styles.modal_input}/>

              <div className={styles.modal_botao}>
                <Botao texto="Confirmar" acao={'vermelho'} aoClicar={() => navigate("/tempo_real")}/>         
              </div>
            </div>
          </div>
        )}

      
    </div>
  )
}

export default Home;