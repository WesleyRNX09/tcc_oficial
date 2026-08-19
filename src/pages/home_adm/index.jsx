import { useEffect, useState } from 'react';
import Botao from './botao'
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';

import ordemServiço from "../../assets/historico_de_ordem.png";
import adicionarFuncionario from "../../assets/adicionar_funcionario.png";
import carro from "../../assets/carro.png";
import relatorio from "../../assets/relatorio.png";

import { useNavigate } from "react-router-dom";

import styles from './index.module.css';

import apiRequest from '../../services/api'

function Home() {

  const [ordens, setOrdens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');


  useEffect(() => {

      async function carregarOrdens() {

          try {

              const resposta = await apiRequest(
                  '/ordens-servico'
              );

              setOrdens(
                  resposta.dados || []
              );

          } catch (error) {

              console.log(error);

              setErro(
                  error.message
              );

          } finally {

              setCarregando(false);

          }

      }


      carregarOrdens();

  }, []);

  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const [busca, setBusca] = useState('');

  const usuarioLogado = JSON.parse(
      localStorage.getItem('usuario')
      || '{}'
  );

  const ordensFiltradas = ordens.filter((ordem) => {

      const textoBusca = busca
          .toLowerCase()
          .trim();

      if (!textoBusca) {
          return true;
      }

      return (
          String(ordem.id_os)
              .includes(textoBusca) ||

          ordem.nome_cliente
              ?.toLowerCase()
              .includes(textoBusca) ||

          ordem.placa
              ?.toLowerCase()
              .includes(textoBusca) ||

          ordem.status
              ?.toLowerCase()
              .includes(textoBusca)
      );

  });

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

        {/*<div className={styles.barra_conteudo}>
          <Link to="/login" className={styles.barra_botao}>Serviços</Link>
          <Link to="/" className={styles.barra_botao}>Acompanhar Veiculo</Link>
          <Link to="/login" className={styles.barra_botao}>Fazer Login</Link>
        </div>*/}
        <div className={styles.barra_perfil}>

          <div className={styles.barra_perfil_icone}>
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}>
                <circle cx="12" cy="8" r="4"/>
                <path strokeLinecap="round" d="M4 20c0-4 3.582-7 8-7s8 3 8 7"/>
              </svg>
          </div>
          
          <div className={styles.barra_perfil_info}>
              <span className={styles.barra_perfil_nome}>
                  {usuarioLogado.usuario || 'Admin'}
              </span>
              <span className={styles.barra_perfil_cargo}>
                  {
                      usuarioLogado.tipo_usuario === 'administrador'
                          ? 'Administrador'
                          : 'Funcionário'
                  }
              </span>
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
            <Botao texto="FINANCEIRO" acao={'vermelho'} aoClicar={() => navigate("/financeiro")} />

            <div className={styles.home_margin1_btn}>
              <img src={ordemServiço} className={styles.home_margin1_img} />
              <Link to="/os" className={styles.home_margin1_text}>HISTORICO DE ORDEM DE SERVIÇO</Link>
            </div>

            <div className={styles.home_margin1_btn}>
              <img src={adicionarFuncionario} className={styles.home_margin1_img} />
              <Link to="/login" className={styles.home_margin1_text}>ADICIONAR FUNCIONARIO</Link>
            </div>

            <div className={styles.home_margin1_btn}>
              <img src={carro} className={styles.home_margin1_img} />
              <Link to="/atualizar_veiculo" className={styles.home_margin1_text}>ATUALIZAR VEÍCULO</Link>
            </div>

            <div className={styles.home_margin1_btn}>
              <img src={carro} className={styles.home_margin1_img} />
              <Link to="/cadastroV" className={styles.home_margin1_text}>CADASTRAR VEÍCULO</Link>
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
              <button
                  className={styles.gs_btnGerenciar}
                  onClick={() => navigate('/os')}
              >
                  GERENCIAR SERVIÇOS
              </button>

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

              {carregando && (
                  <div className={styles.gs_bloco}>
                      <p>Carregando ordens de serviço...</p>
                  </div>
              )}


              {erro && (
                  <div className={styles.gs_bloco}>
                      <p>{erro}</p>
                  </div>
              )}


              {!carregando &&
              !erro &&
              ordensFiltradas.length === 0 && (

                  <div className={styles.gs_bloco}>
                      <p>Nenhuma ordem de serviço encontrada.</p>
                  </div>

              )}


              {!carregando &&
              !erro &&
              ordensFiltradas.map((ordem) => (

                  <div
                      className={styles.gs_bloco}
                      key={ordem.id_os}
                  >

                      <div>
                          <strong>
                              OS #{ordem.id_os}
                          </strong>
                      </div>


                      <div>
                          <span>Cliente:</span>

                          <strong>
                              {ordem.nome_cliente}
                          </strong>
                      </div>


                      <div>
                          <span>Veículo:</span>

                          <strong>
                              {ordem.marca} {ordem.modelo}
                          </strong>
                      </div>


                      <div>
                          <span>Placa:</span>

                          <strong>
                              {ordem.placa}
                          </strong>
                      </div>


                      <div>
                          <span>Status:</span>

                          <strong>
                              {ordem.status}
                          </strong>
                      </div>


                      <div>
                          <span>Valor:</span>

                          <strong>
                              {Number(
                                  ordem.valor_total || 0
                              ).toLocaleString(
                                  'pt-BR',
                                  {
                                      style: 'currency',
                                      currency: 'BRL'
                                  }
                              )}
                          </strong>
                      </div>


                      <button
                          type="button"
                          onClick={() =>
                              navigate(
                                  `/os/${ordem.id_os}`
                              )
                          }
                      >
                          VER DETALHES
                      </button>

                  </div>

              ))}

          </div>

          </div>
        </div>

      </div>

      
    </div>
  );
}

export default Home;
