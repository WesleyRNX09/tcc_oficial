import { useEffect, useState } from 'react';
import Botao from './botao'
import logo from '../../../assets/logo.png';

import ordemServiço from "../../../assets/historico_de_ordem.png";
import adicionarFuncionario from "../../../assets/adicionar_funcionario.png";
import carro from "../../../assets/carro.png";
import relatorio from "../../../assets/relatorio.png";
import notificacao from "../../../assets/notificacao.png";

import seta from "../../../assets/seta_esquerda1.png";

import { Link, useNavigate } from "react-router-dom";
import styles from './index.module.css';

import apiRequest from '../../../services/api';

function Os() {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const [busca, setBusca] = useState('');

  const [ordensServico, setOrdensServico] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina, setItensPorPagina] = useState(10);

  useEffect(() => {

      async function carregarOrdens() {

          try {

              setCarregando(true);
              setErro("");

              const resposta = await apiRequest(
                  '/ordens-servico?page=1&limit=100'
              );

              setOrdensServico(
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

  const ordensFiltradas = ordensServico.filter((ordem) => {

      const texto = busca
          .toLowerCase()
          .trim();

      if (!texto) {
          return true;
      }

      return (

          String(ordem.id_os)
              .includes(texto)

          ||

          ordem.nome_cliente
              ?.toLowerCase()
              .includes(texto)

          ||

          ordem.placa
              ?.toLowerCase()
              .includes(texto)

          ||

          ordem.marca
              ?.toLowerCase()
              .includes(texto)

          ||

          ordem.modelo
              ?.toLowerCase()
              .includes(texto)

          ||

          ordem.status
              ?.toLowerCase()
              .includes(texto)

      );

  });

  const totalPaginas = Math.max(
      Math.ceil(
          ordensFiltradas.length /
          itensPorPagina
      ),
      1
  );


  const indiceInicial =
      (paginaAtual - 1) *
      itensPorPagina;


  const indiceFinal =
      indiceInicial +
      itensPorPagina;


  const ordensPagina =
      ordensFiltradas.slice(
          indiceInicial,
          indiceFinal
      );

  useEffect(() => {

      setPaginaAtual(1);

  }, [busca, itensPorPagina]);

  function formatarData(data) {

      if (!data) {
          return '-';
      }

      const dataFormatada =
          new Date(data);

      return dataFormatada
          .toLocaleDateString(
              'pt-BR'
          );

  }

  function formatarValor(valor) {

      return Number(
          valor || 0
      ).toLocaleString(
          'pt-BR',
          {
              style: 'currency',
              currency: 'BRL'
          }
      );

  }

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
                          <img src={ordemServiço} className={styles.home_margin1_img} alt="" />
                          <Link to="/os" className={styles.home_margin1_text}>HISTORICO DE ORDEM DE SERVIÇO</Link>
                        </div>
            
                        <div className={styles.home_margin1_btn}>
                          <img src={adicionarFuncionario} className={styles.home_margin1_img} alt="" />
                          <Link to="/login" className={styles.home_margin1_text}>ADICIONAR FUNCIONARIO</Link>
                        </div>
            
                        <div className={styles.home_margin1_btn}>
                          <img src={carro} className={styles.home_margin1_img} alt="" />
                          <Link to="/atualizar_veiculo" className={styles.home_margin1_text}>ATUALIZAR VEÍCULO</Link>
                        </div>
            
                        <div className={styles.home_margin1_btn}>
                          <img src={carro} className={styles.home_margin1_img} alt="" />
                          <Link to="/cadastroV" className={styles.home_margin1_text}>CADASTRAR VEÍCULO</Link>
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
                <h2 className={styles.gs_bloco_titulo}>HISTÓRICO DE OS</h2>
                
                {/* ───────── NOVO CONTEÚDO DENTRO DA gs_areaBlocos ───────── */}

                <div className={styles.os_header}>
                  <div className={styles.os_data}>
                    <span>📅</span>
                    <p className={styles.gs_bloco_text}>Data:</p>
                    <p className={styles.gs_bloco_text}>01/01/2026 - 31/01/2026</p>
                  </div>

                  <div className={styles.os_busca}>
                    <input
                        type="text"
                        placeholder="Buscar por cliente, placa ou OS"
                        value={busca}
                        onChange={(event) =>
                            setBusca(
                                event.target.value
                            )
                        }
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
                  <div className={styles.os_card}>
                    <div className={styles.os_card_icone} style={{ background: '#2a2a2a' }}>📋</div>
                    <div className={styles.os_card_info}>
                      <span className={styles.os_card_label}>Total de Ordens</span>
                      <span className={styles.os_card_valor}>{ordensServico.length}</span>
                      <span className={styles.os_card_sub}>No período selecionado</span>
                    </div>
                  </div>

                  <div className={styles.os_card}>
                    <div className={styles.os_card_icone} style={{ background: '#1a5c24' }}>✅</div>
                    <div className={styles.os_card_info}>
                      <span className={styles.os_card_label}>Concluídas</span>
                      <span className={styles.os_card_valor}>
                        {
                            ordensServico.filter(
                                (ordem) =>
                                    ordem.status === 'Finalizada'
                            ).length
                        }
                      </span>
                    </div>
                  </div>

                  <div className={styles.os_card}>
                    <div className={styles.os_card_icone} style={{ background: '#7a4010' }}>🕐</div>
                    <div className={styles.os_card_info}>
                      <span className={styles.os_card_label}>
                          Abertas
                      </span>

                      <span className={styles.os_card_valor}>
                          {
                              ordensServico.filter(
                                  (ordem) =>
                                      ordem.status === 'Aberta'
                              ).length
                          }
                      </span>
                    </div>
                  </div>

                  <div className={styles.os_card}>
                    <div className={styles.os_card_icone} style={{ background: '#6b0000' }}>🔧</div>
                    <div className={styles.os_card_info}>
                      <span className={styles.os_card_label}>Em Manutenção</span>
                      <span className={styles.os_card_valor}>
                        {
                            ordensServico.filter(
                                (ordem) =>
                                    ordem.status === 'Em andamento'
                            ).length
                        }
                      </span>
                    </div>
                  </div>
                </div>

                <div className={styles.os_tabela}>
                  <table>
                    <thead>
                      <tr>
                        <th>Data</th>
                        <th>OS</th>
                        <th>Cliente</th>
                        <th>Veículo / Placa</th>
                        <th>Valor</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>

                    {carregando && (

                        <tr>

                            <td colSpan="6">
                                Carregando ordens de serviço...
                            </td>

                        </tr>

                    )}


                    {erro && (

                        <tr>

                            <td colSpan="6">
                                {erro}
                            </td>

                        </tr>

                    )}


                    {
                        !carregando &&
                        !erro &&
                        ordensPagina.length === 0 && (

                            <tr>

                                <td colSpan="6">
                                    Nenhuma ordem de serviço encontrada.
                                </td>

                            </tr>

                        )
                    }


                    {
                        !carregando &&
                        !erro &&
                        ordensPagina.map((ordem) => (

                            <tr
                                key={ordem.id_os}
                                onClick={() => navigate(`/os/${ordem.id_os}`)}
                                className={styles.os_linha}
                                title="Clique para ver os detalhes"
                            >

                                <td>

                                    {
                                        formatarData(
                                            ordem.data_entrada
                                        )
                                    }

                                </td>


                                <td
                                    className={
                                        styles.os_codigo
                                    }
                                >

                                    OS-
                                    {
                                        String(
                                            ordem.id_os
                                        ).padStart(
                                            5,
                                            '0'
                                        )
                                    }

                                </td>


                                <td>

                                    {
                                        ordem.nome_cliente
                                    }

                                </td>


                                <td>

                                    {
                                        ordem.marca
                                    }

                                    {' '}

                                    {
                                        ordem.modelo
                                    }

                                    <br />

                                    <small>
                                        {
                                            ordem.placa
                                        }
                                    </small>

                                </td>


                                <td>

                                    {
                                        formatarValor(
                                            ordem.valor_total
                                        )
                                    }

                                </td>


                                <td>

                                    <span
                                        className={
                                            ordem.status === 'Finalizada'
                                                ? styles.status_concluido
                                                : styles.status_andamento
                                        }
                                    >

                                        {
                                            ordem.status
                                        }

                                    </span>

                                </td>

                            </tr>

                        ))
                    }

                </tbody>
                  </table>

                  <div className={styles.os_footer}>
                    <p>

                      Mostrando

                      {' '}

                      {
                          ordensFiltradas.length === 0
                              ? 0
                              : indiceInicial + 1
                      }

                      {' '}a{' '}

                      {
                          Math.min(
                              indiceFinal,
                              ordensFiltradas.length
                          )
                      }

                      {' '}de{' '}

                      {
                          ordensFiltradas.length
                      }

                      {' '}registros

                  </p>

                    <div className={styles.os_paginacao}>
                      <button
                          type="button"
                          disabled={
                              paginaAtual === 1
                          }
                          onClick={() =>
                              setPaginaAtual(
                                  paginaAtual - 1
                              )
                          }
                      >
                          {'<'}
                      </button>


                      <button
                          type="button"
                          className={
                              styles.os_pagina_ativa
                          }
                      >
                          {paginaAtual}
                      </button>


                      <button
                          type="button"
                          disabled={
                              paginaAtual === totalPaginas
                          }
                          onClick={() =>
                              setPaginaAtual(
                                  paginaAtual + 1
                              )
                          }
                      >
                          {'>'}
                      </button>
                    </div>

                    <select
                        value={itensPorPagina}
                        onChange={(event) =>
                            setItensPorPagina(
                                Number(
                                    event.target.value
                                )
                            )
                        }
                    >

                        <option value="5">
                            5
                        </option>

                        <option value="10">
                            10
                        </option>

                        <option value="20">
                            20
                        </option>

                    </select>

                  </div>
                </div>
              </div>

            

          </div>
        </div>

      </div>

    
    </div>
  );
}

export default Os;