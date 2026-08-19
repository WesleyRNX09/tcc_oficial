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
                    <div className={styles.gs_mensagem}>
                        <p>Carregando ordens de serviço...</p>
                    </div>
                )}

                {erro && (
                    <div className={styles.gs_mensagem}>
                        <p>{erro}</p>
                    </div>
                )}

                {!carregando &&
                !erro &&
                ordensFiltradas.length === 0 && (
                    <div className={styles.gs_mensagem}>
                        <p>Nenhuma ordem de serviço encontrada.</p>
                    </div>
                )}

                {!carregando &&
                !erro &&
                ordensFiltradas.map((ordem) => (

                    <div
                        className={styles.gs_card}
                        key={ordem.id_os}
                    >

                        {/* FOTO DO VEÍCULO */}
                        <div className={styles.gs_cardImagem}>
                            <img
                                src={ordem.imagem_veiculo || carro}
                                alt={`${ordem.marca || ''} ${ordem.modelo || ''}`}
                            />
                        </div>


                        {/* INFORMAÇÕES */}
                        <div className={styles.gs_cardInformacoes}>

                            <div className={styles.gs_cardCampo}>
                                <span className={styles.gs_cardTitulo}>
                                    CLIENTE
                                </span>

                                <span className={styles.gs_cardValor}>
                                    {ordem.nome_cliente || 'Não informado'}
                                </span>
                            </div>


                            <div className={styles.gs_cardCampo}>
                                <span className={styles.gs_cardTitulo}>
                                    VEÍCULO
                                </span>

                                <span className={styles.gs_cardValor}>
                                    {ordem.marca || ''} {ordem.modelo || ''}
                                </span>
                            </div>


                            <div className={styles.gs_cardCampo}>
                                <span className={styles.gs_cardTitulo}>
                                    PLACA
                                </span>

                                <span className={styles.gs_cardValor}>
                                    {ordem.placa || 'Não informada'}
                                </span>
                            </div>

                        </div>


                        {/* BOTÃO DE OPÇÕES */}
                        <button
                            type="button"
                            className={styles.gs_cardOpcoes}
                            onClick={() =>
                                navigate(`/os/${ordem.id_os}`)
                            }
                            title="Ver detalhes da OS"
                        >

                            {/* engrenagem */}
                            <svg
                                width="19"
                                height="19"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                            >
                                <circle cx="12" cy="12" r="3" />

                                <path d="
                                    M19.4 15
                                    a1.7 1.7 0 0 0 .34 1.88
                                    l.06.06
                                    a2 2 0 1 1-2.83 2.83
                                    l-.06-.06
                                    A1.7 1.7 0 0 0 15 19.4
                                    a1.7 1.7 0 0 0-1 .6
                                    V20
                                    a2 2 0 1 1-4 0
                                    v-.09
                                    a1.7 1.7 0 0 0-1-.6
                                    1.7 1.7 0 0 0-1.88.34
                                    l-.06.06
                                    a2 2 0 1 1-2.83-2.83
                                    l.06-.06
                                    A1.7 1.7 0 0 0 4.6 15
                                    a1.7 1.7 0 0 0-.6-1
                                    H4
                                    a2 2 0 1 1 0-4
                                    h.09
                                    a1.7 1.7 0 0 0 .6-1
                                    1.7 1.7 0 0 0-.34-1.88
                                    l-.06-.06
                                    a2 2 0 1 1 2.83-2.83
                                    l.06.06
                                    A1.7 1.7 0 0 0 9 4.6
                                    a1.7 1.7 0 0 0 1-.6
                                    V4
                                    a2 2 0 1 1 4 0
                                    v.09
                                    a1.7 1.7 0 0 0 1 .6
                                    1.7 1.7 0 0 0 1.88-.34
                                    l.06-.06
                                    a2 2 0 1 1 2.83 2.83
                                    l-.06.06
                                    A1.7 1.7 0 0 0 19.4 9
                                    c.1.35.3.7.6 1
                                    H20
                                    a2 2 0 1 1 0 4
                                    h-.09
                                    a1.7 1.7 0 0 0-.51 1z
                                "/>
                            </svg>



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
