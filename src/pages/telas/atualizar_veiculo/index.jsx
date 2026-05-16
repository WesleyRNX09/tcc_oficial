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

        {/* Conteúdo principal */}
        <div className={styles.home_margin2} style={{ width: menuAberto ? '75%' : '100%' }}>
          <div className={styles.home_box}>

            {/* ── Topbar: botão + busca ── */}
            <div className={styles.gs_topbar}>

              <div className={styles.gs_seta}>
                  <button className={styles.gs_btnGerenciar}><img src={seta}/></button>
                  <div className={styles.gs_letras}>
                      <h2 className={styles.gs_letra01}>ATUALIZAR VEÍCULO</h2>
                      <p className={styles.gs_letra02}>Atualize  status e as informações do veículo em tempo real</p>
                  </div>
              </div>

              <div className={styles.gs_buscaWrapper}>
                <input
                  type="text"
                  className={styles.gs_buscaInput}
                  placeholder="Procurar por OS"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
                <span className={styles.gs_buscaIcone}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </span>
              </div>
            </div>

            {/* ── Área de blocos ── */}
            <div className={styles.gs_areaBlocos}>

              <h2 className={styles.gs_bloco_titulo}>DADOS DO VEÍCULO</h2>

              <div className={styles.gs_bloco}>

                <div className={styles.gs_bloco_label}>

                  <div className={styles.gs_bloco_box}>
                    <h1 className={styles.gs_bloco_text}>CLIENTE</h1>
                    <p className={styles.gs_bloco_text02}>Guilherme Luiz</p>
                  </div>

                  <div className={styles.gs_bloco_box}>
                      <h1 className={styles.gs_bloco_text}>VEÍCULO</h1>
                      <p className={styles.gs_bloco_text02}>Jetta 2.0 TSI</p>
                  </div>

                  <div className={styles.gs_bloco_box}>
                    <h1 className={styles.gs_bloco_text}>PLACA</h1>
                    <p className={styles.gs_bloco_text02}>GLZ-2A08</p>
                  </div>
                </div>

                <div className={styles.gs_bloco_label}>

                  <div className={styles.gs_bloco_box}>
                    <h1 className={styles.gs_bloco_text}>DATA DE ENTRADA</h1>
                    <p className={styles.gs_bloco_text02}>27/07/2026</p>
                  </div>

                  <div className={styles.gs_bloco_box}>
                      <h1 className={styles.gs_bloco_text}>PREVISÃO DE ENTREGA</h1>
                      <p className={styles.gs_bloco_text02}>29/07/2026</p>
                  </div>

                  <div className={styles.gs_bloco_box}>
                    <h1 className={styles.gs_bloco_text}>ORDEM DE SERVIÇO</h1>
                    <p className={styles.gs_bloco_text02}>OS-000123</p>
                  </div>
                </div>

                <div className={styles.gs_bloco_box_img}>
                  <img src={fiat} className={styles.gs_bloco_img}/>
                </div>
                  
              </div>

              

              <div className={styles.gs_bloco02}>

                <h2 className={styles.gs_bloco_titulo}>STATUS DO SERVIÇO</h2>

                    <div className={styles.tempo_box_linha}>

                      <div className={styles.tempo_linha}>

                        <div className={`${styles.tempo_etapa} ${styles.ativo}`}>
                            <img src={pneu} className={styles.tempo_bolinha_img} />
                            <span className={styles.tempo_bolinha}></span>
                            <p className={styles.tempo_linha_letras}>ENTRADA</p>
                            <small>00/00/0000</small>
                        </div>

                        <div className={styles.tempo_etapa}>
                            <img src={pneu} className={styles.tempo_bolinha_img} />
                            <span className={styles.tempo_bolinha}></span>
                            <p className={styles.tempo_linha_letras}>EM ANÁLISE</p>
                        </div>

                        <div className={styles.tempo_etapa}>
                            <img src={pneu} className={styles.tempo_bolinha_img} /> 
                            <span className={styles.tempo_bolinha}></span>
                            <p className={styles.tempo_linha_letras}>DIAGNÓSTICO</p>
                        </div>

                        <div className={`${styles.tempo_etapa} ${styles.progresso}`}>
                            <img src={pneu} className={styles.tempo_bolinha_img} />
                            <span className={styles.tempo_bolinha}></span>
                            <p className={styles.tempo_linha_letras}>EM PROCESSO</p>
                        </div>

                        <div className={styles.tempo_etapa}>
                            <img src={pneu} className={styles.tempo_bolinha_img} /> 
                            <span className={styles.tempo_bolinha}></span>
                            <p className={styles.tempo_linha_letras}>FINALIZADO</p>
                        </div>
                      </div>    

                    </div>
              </div>
              
            </div>

          </div>
        </div>

      </div>

      <div className={styles.rodape_principal}></div>
    </div>
  );
}

export default atualizar;
