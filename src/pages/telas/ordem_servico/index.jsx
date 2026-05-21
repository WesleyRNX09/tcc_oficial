import { useState } from 'react';
import Botao from './botao'
import { Link } from "react-router-dom";
import logo from '../../../assets/logo.png';

import ordemServiço from "../../../assets/historico_de_ordem.png";
import adicionarFuncionario from "../../../assets/adicionar_funcionario.png";
import carro from "../../../assets/carro.png";
import relatorio from "../../../assets/relatorio.png";
import notificacao from "../../../assets/notificacao.png";

import seta from "../../../assets/seta_esquerda1.png";

import { useNavigate } from "react-router-dom";
import styles from './index.module.css';

function os() {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const [busca, setBusca] = useState('');

  // Mock de dados para renderizar a tabela dinamicamente igual à imagem
  const ordensServico = [
    { data: '13/02/2026', os: 'OS-00001', cliente: 'Guilherme Luiz', veiculo: 'BMW M3 G80', servico: 'Troca de Pneus', status: 'Concluido' },
    { data: '15/05/2026', os: 'OS-00002', cliente: 'Bruno Luan', veiculo: 'Jetta GLI', servico: 'Alinhamento', status: 'Pendente' },
    { data: '24/02/2026', os: 'OS-00003', cliente: 'Cauã Takasaki', veiculo: '911 GT3 RS', servico: 'Reparo de Freios', status: 'Concluido' },
    { data: '18/09/2026', os: 'OS-00004', cliente: 'Matheus', veiculo: 'Onix LT 2021', servico: 'Troca de Filtros', status: 'Concluido' },
    { data: '31/12/2026', os: 'OS-00005', cliente: 'João Pedro', veiculo: 'Gol 2017', servico: 'Troca de Oleo', status: 'Pendente' },
    { data: '29/05/2026', os: 'OS-00006', cliente: 'Wesley Beraldi', veiculo: 'Tracker 2022', servico: 'Balanceamento', status: 'Concluido' },
    { data: '01/01/2026', os: 'OS-00007', cliente: 'Richard Guerra', veiculo: 'Peugot 206', servico: 'Troca de filtros', status: 'Concluido' },
  ];

  return (
    <div className={styles.container}>

      <div className={styles.barra_Principal}>

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
        

        {/* ── DIREITA: Sino + Perfil Admin ── */}
        <div className={styles.barra_direita}>

          {/* Ícone de notificação — COLOQUE SEU ÍCONE/IMAGEM AQUI se quiser */}
          <button className={styles.barra_sino} aria-label="Notificações">
            {/* <img src={iconeSino} alt="Notificações" /> */}
            <img src={notificacao}></img>
          </button>

          {/* Card de perfil */}
          <div className={styles.barra_perfil}>
            {/* ÍCONE DO USUÁRIO — troque por <img src={iconePerfil} /> se tiver */}
            <div className={styles.barra_perfil_icone}>
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}>
                <circle cx="12" cy="8" r="4"/>
                <path strokeLinecap="round" d="M4 20c0-4 3.582-7 8-7s8 3 8 7"/>
              </svg>
            </div>

            <div className={styles.barra_perfil_info}>
              <span className={styles.barra_perfil_nome}>Admin</span>
              <span className={styles.barra_perfil_cargo}>Administrador</span>
            </div>

            {/* Seta dropdown — troque por <img src={setaDropdown} /> se quiser */}
            <svg className={styles.barra_seta} src={notificacao} width="16" height="16" fill="none"
                viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>

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

            <div className={styles.home_margin1_btn_os}>
              <img src={ordemServiço} className={styles.home_margin1_img} alt="" />
              <Link to="/login" className={styles.home_margin1_text_os}>HISTORICO DE ORDEM DE SERVIÇO</Link>
            </div>

            <div className={styles.home_margin1_btn}>
              <img src={adicionarFuncionario} className={styles.home_margin1_img} alt="" />
              <Link to="/login" className={styles.home_margin1_text}>ADICIONAR FUNCIONARIO</Link>
            </div>

            <div className={styles.home_margin1_btn}>
              <img src={carro} className={styles.home_margin1_img} alt="" />
              <Link to="/login" className={styles.home_margin1_text}>ATUALIZAR VEÍCULO</Link>
            </div>

            <div className={styles.home_margin1_btn}>
              <img src={carro} className={styles.home_margin1_img} alt="" />
              <Link to="/login" className={styles.home_margin1_text}>CADASTRAR VEÍCULO</Link>
            </div>

            <div className={styles.home_margin1_btn}>
              <img src={relatorio} className={styles.home_margin1_img} alt="" />
              <Link to="/login" className={styles.home_margin1_text}>RELATORIOS</Link>
            </div>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className={styles.home_margin2} style={{ width: menuAberto ? '75%' : '100%' }}>
          <div className={styles.home_box}>

          
            {/* NOVO: Filtros Rápidos (Cards Superiores) */}
            <div className={styles.gs_filtros_rapidos}>
              <div className={styles.gs_card_filtro}></div>
              <div className={styles.gs_card_filtro}></div>
              <div className={styles.gs_card_filtro}></div>
              <div className={styles.gs_card_filtro}></div>
            </div>

            
              {/* ── Área de Listagem com Sombra ── */}
              <div className={styles.gs_areaBlocos}>
                <h2 className={styles.gs_bloco_titulo}>DADOS DO VEÍCULO</h2>
                
                {/* ───────── NOVO CONTEÚDO DENTRO DA gs_areaBlocos ───────── */}

                <div className={styles.os_header}>
                  <div className={styles.os_data}>
                    <span>📅</span>
                    <p>01/01/2026 - 31/01/2026</p>
                  </div>

                  <div className={styles.os_busca}>
                    <input
                      type="text"
                      placeholder="Buscar por cliente, serviço ou placa"
                    />

                    <span className={styles.os_busca_icon}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                    </span>
                  </div>
                </div>

                <div className={styles.os_cards}>
                  <div className={styles.os_card}></div>
                  <div className={styles.os_card}></div>
                  <div className={styles.os_card}></div>
                  <div className={styles.os_card}></div>
                </div>

                <div className={styles.os_tabela}>
                  <table>
                    <thead>
                      <tr>
                        <th>Data</th>
                        <th>OS</th>
                        <th>Cliente</th>
                        <th>Veículo / Placa</th>
                        <th>Serviço</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>13/02/2026</td>
                        <td className={styles.os_codigo}>OS-00001</td>
                        <td>Guilherme Luiz</td>
                        <td>BMW M3 G80</td>
                        <td>Troca de Pneus</td>
                        <td>
                          <span className={styles.status_concluido}>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <circle cx="7" cy="7" r="7" fill="#5de86e" fillOpacity="0.25"/>
                              <path d="M4 7l2 2 4-4" stroke="#5de86e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Concluido
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td>15/05/2026</td>
                        <td className={styles.os_codigo}>OS-00002</td>
                        <td>Bruno Luan</td>
                        <td>Jetta GLI</td>
                        <td>Alinhamento</td>
                        <td>
                          <span className={styles.status_andamento}>Em andamento</span>
                        </td>
                      </tr>

                      <tr>
                        <td>24/02/2026</td>
                        <td className={styles.os_codigo}>OS-00003</td>
                        <td>Cauã Takasaki</td>
                        <td>911 GT3 RS</td>
                        <td>Reparo de Freios</td>
                        <td>
                          <span className={styles.status_concluido}>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <circle cx="7" cy="7" r="7" fill="#5de86e" fillOpacity="0.25"/>
                              <path d="M4 7l2 2 4-4" stroke="#5de86e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Concluido
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td>18/09/2026</td>
                        <td className={styles.os_codigo}>OS-00004</td>
                        <td>Matheus</td>
                        <td>Onix LT 2021</td>
                        <td>Troca de Filtros</td>
                        <td>
                          <span className={styles.status_concluido}>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <circle cx="7" cy="7" r="7" fill="#5de86e" fillOpacity="0.25"/>
                              <path d="M4 7l2 2 4-4" stroke="#5de86e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Concluido
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td>31/12/2026</td>
                        <td className={styles.os_codigo}>OS-00005</td>
                        <td>João Pedro</td>
                        <td>Gol 2017</td>
                        <td>Troca de Óleo</td>
                        <td>
                          <span className={styles.status_andamento}>Em andamento</span>
                        </td>
                      </tr>

                      <tr>
                        <td>29/05/2026</td>
                        <td className={styles.os_codigo}>OS-00006</td>
                        <td>Wesley Beraldi</td>
                        <td>Tracker 2022</td>
                        <td>Balanceamento</td>
                        <td>
                          <span className={styles.status_concluido}>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <circle cx="7" cy="7" r="7" fill="#5de86e" fillOpacity="0.25"/>
                              <path d="M4 7l2 2 4-4" stroke="#5de86e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Concluido
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td>01/01/2026</td>
                        <td className={styles.os_codigo}>OS-00007</td>
                        <td>Richard Guerra</td>
                        <td>Peugeot 206</td>
                        <td>Troca de filtros</td>
                        <td>
                          <span className={styles.status_concluido}>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <circle cx="7" cy="7" r="7" fill="#5de86e" fillOpacity="0.25"/>
                              <path d="M4 7l2 2 4-4" stroke="#5de86e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Concluido
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className={styles.os_footer}>
                    <p>Mostando 1 a 7 de 8 registros</p>

                    <div className={styles.os_paginacao}>
                      <button>{'<'}</button>
                      <button className={styles.os_pagina_ativa}>1</button>
                      <button>2</button>
                      <button>{'>'}</button>
                    </div>

                    <select>
                      <option>10</option>
                    </select>
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

export default os;