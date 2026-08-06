import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Botao from './botao';
import logo from '../../../assets/logo.png';

import ordemServico from '../../../assets/historico_de_ordem.png';
import adicionarFuncionario from '../../../assets/adicionar_funcionario.png';
import carro from '../../../assets/carro.png';
import relatorio from '../../../assets/relatorio.png';
import notificacao from '../../../assets/notificacao.png';

import styles from './index.module.css';

function Relatorios() {
  const navigate = useNavigate();

  const [menuAberto, setMenuAberto] = useState(false);
  const [busca, setBusca] = useState('');
  
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina, setItensPorPagina] = useState(10);

  const veiculos = [
    {
      id: 1,
      veiculo: 'VW Jetta 2.0 TSI',
      placa: 'ABC1D23',
      cliente: 'Guilherme Luiz',
      ultimaOs: '13/02/2026',
      totalOs: 3,
      imagem: carro
    },
    {
      id: 2,
      veiculo: 'BMW 320i',
      placa: 'DEF4G56',
      cliente: 'Bruno Luan',
      ultimaOs: '15/05/2026',
      totalOs: 2,
      imagem: carro
    },
    {
      id: 3,
      veiculo: 'Audi A3',
      placa: 'HIJ7K89',
      cliente: 'Cauã Takasaki',
      ultimaOs: '24/02/2026',
      totalOs: 4,
      imagem: carro
    },
    {
      id: 4,
      veiculo: 'Fiat Punto',
      placa: 'LMN8O90',
      cliente: 'Wesley Beraldi',
      ultimaOs: '18/09/2026',
      totalOs: 1,
      imagem: carro
    },
    {
      id: 5,
      veiculo: 'Mitsubishi L-200',
      placa: 'PQR2S34',
      cliente: 'Caroline Ferraz',
      ultimaOs: '31/12/2026',
      totalOs: 2,
      imagem: carro
    },
    {
      id: 6,
      veiculo: 'Jeep Compass',
      placa: 'TUV5W67',
      cliente: 'Enzo Verluzzy',
      ultimaOs: '29/05/2026',
      totalOs: 3,
      imagem: carro
    },
    {
      id: 7,
      veiculo: 'Peugeot 206',
      placa: 'XYZ9A12',
      cliente: 'Richard Guerra',
      ultimaOs: '01/01/2026',
      totalOs: 1,
      imagem: carro
    }
  ];

  const veiculosFiltrados = veiculos.filter((item) => {
    const textoPesquisado = busca.toLowerCase().trim();

    return (
      item.veiculo.toLowerCase().includes(textoPesquisado) ||
      item.placa.toLowerCase().includes(textoPesquisado) ||
      item.cliente.toLowerCase().includes(textoPesquisado)
    );
  });

  const totalPaginas = Math.max(
    1,
    Math.ceil(veiculosFiltrados.length / itensPorPagina)
  );

  const paginas = Array.from(
    { length: totalPaginas },
    (_, indice) => indice + 1
  );

  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = indiceInicial + itensPorPagina;

  const veiculosExibidos = veiculosFiltrados.slice(
    indiceInicial,
    indiceFinal
  );

  function alterarBusca(evento) {
    setBusca(evento.target.value);
    setPaginaAtual(1);
  }

  function paginaAnterior() {
    setPaginaAtual((pagina) => Math.max(1, pagina - 1));
  }

  function proximaPagina() {
    setPaginaAtual((pagina) => Math.min(totalPaginas, pagina + 1));
  }

  return (
    <div className={styles.container}>
      {/* Navbar */}
      <div className={styles.barra_Principal}>
        <div className={styles.barra_Logo}>
          <button
            className={`${styles.barra_menu_btn} ${
              menuAberto ? styles.barra_menu_btn_aberto : ''
            }`}
            onClick={() => setMenuAberto(!menuAberto)}
            aria-label="Abrir menu"
          >
            <span className={styles.barra_linha}></span>
            <span className={styles.barra_linha}></span>
            <span className={styles.barra_linha}></span>
          </button>

          <img
            src={logo}
            className={styles.barra_Imagem}
            alt="Logo"
          />
        </div>

        <div className={styles.barra_direita}>
          <button
            className={styles.barra_sino}
            aria-label="Notificações"
          >
            <img src={notificacao} alt="Notificações" />
          </button>

          <div className={styles.barra_perfil}>
            <div className={styles.barra_perfil_icone}>
              <svg
                width="22"
                height="22"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth={1.8}
              >
                <circle cx="12" cy="8" r="4" />

                <path
                  strokeLinecap="round"
                  d="M4 20c0-4 3.582-7 8-7s8 3 8 7"
                />
              </svg>
            </div>

            <div className={styles.barra_perfil_info}>
              <span className={styles.barra_perfil_nome}>
                Admin
              </span>

              <span className={styles.barra_perfil_cargo}>
                Administrador
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.home_conteudo}>
        {menuAberto && (
          <div
            className={styles.home_overlay}
            onClick={() => setMenuAberto(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`${styles.home_margin1} ${
            menuAberto ? styles.home_margin1_aberto : ''
          }`}
          style={{
            width: menuAberto ? '50rem' : '0',
            minWidth: menuAberto ? '50rem' : '0'
          }}
        >
          <div className={styles.home_margin1_inner}>
            <Botao
              texto="FINANCEIRO"
              acao="vermelho"
              aoClicar={() => navigate('/financeiro')}
            />

            <div className={styles.home_margin1_btn}>
              <img
                src={ordemServico}
                className={styles.home_margin1_img}
                alt=""
              />

              <Link
                to="/os"
                className={styles.home_margin1_text}
              >
                HISTÓRICO DE ORDEM DE SERVIÇO
              </Link>
            </div>

            <div className={styles.home_margin1_btn}>
              <img
                src={adicionarFuncionario}
                className={styles.home_margin1_img}
                alt=""
              />

              <Link
                to="/adicionar-funcionario"
                className={styles.home_margin1_text}
              >
                ADICIONAR FUNCIONÁRIO
              </Link>
            </div>

            <div className={styles.home_margin1_btn}>
              <img
                src={carro}
                className={styles.home_margin1_img}
                alt=""
              />

              <Link
                to="/atualizar_veiculo"
                className={styles.home_margin1_text}
              >
                ATUALIZAR VEÍCULO
              </Link>
            </div>

            <div className={styles.home_margin1_btn}>
              <img
                src={carro}
                className={styles.home_margin1_img}
                alt=""
              />

              <Link
                to="/cadastroV"
                className={styles.home_margin1_text}
              >
                CADASTRAR VEÍCULO
              </Link>
            </div>

            <div
              className={`${styles.home_margin1_btn} ${styles.home_margin1_btn_ativo}`}
            >
              <img
                src={relatorio}
                className={styles.home_margin1_img}
                alt=""
              />

              <Link
                to="/relatorios"
                className={styles.home_margin1_text}
              >
                RELATÓRIOS
              </Link>
            </div>
          </div>
        </div>

        {/* Conteúdo dos relatórios */}
        <main className={styles.relatorios_conteudo}>
          <header className={styles.relatorios_cabecalho}>
            <h1>RELATÓRIOS</h1>

            <p>
              Selecione um veículo para visualizar o relatório
            </p>
          </header>

          <div className={styles.relatorios_busca}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>

            <input
              type="text"
              value={busca}
              onChange={alterarBusca}
              placeholder="Buscar por cliente, veículo ou placa"
            />
          </div>

          <section className={styles.relatorios_tabela_container}>
            <div className={styles.relatorios_tabela_scroll}>
              <table className={styles.relatorios_tabela}>
                <thead>
                  <tr>
                    <th>Veículo</th>
                    <th>Placa</th>
                    <th>Cliente</th>
                    <th>Última OS</th>
                    <th>Total de OS</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {veiculosExibidos.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className={styles.relatorios_veiculo}>
                          <img
                            src={item.imagem}
                            alt={item.veiculo}
                          />

                          <span>{item.veiculo}</span>
                        </div>
                      </td>

                      <td>{item.placa}</td>
                      <td>{item.cliente}</td>
                      <td>{item.ultimaOs}</td>

                      <td className={styles.relatorios_total}>
                        {item.totalOs}
                      </td>

                      <td>
                        <button
                          type="button"
                          className={styles.relatorios_acoes}
                          aria-label={`Abrir ações de ${item.veiculo}`}
                          onClick={() =>
                            navigate(`/relatorios/${item.id}`)
                          }
                        >
                          <span></span>
                          <span></span>
                          <span></span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {veiculosExibidos.length === 0 && (
                <div className={styles.relatorios_vazio}>
                  Nenhum veículo encontrado.
                </div>
              )}
            </div>

            <footer className={styles.relatorios_rodape}>
              <p>
                Mostrando{' '}
                {veiculosFiltrados.length === 0
                  ? 0
                  : indiceInicial + 1}{' '}
                a {Math.min(indiceFinal, veiculosFiltrados.length)} de{' '}
                {veiculosFiltrados.length} veículos
              </p>

              <div className={styles.relatorios_paginacao}>
                <button
                  type="button"
                  onClick={paginaAnterior}
                  disabled={paginaAtual === 1}
                  aria-label="Página anterior"
                >
                  {'<'}
                </button>

                {paginas.map((pagina) => (
                  <button
                    key={pagina}
                    type="button"
                    onClick={() => setPaginaAtual(pagina)}
                    className={
                      paginaAtual === pagina
                        ? styles.relatorios_pagina_ativa
                        : ''
                    }
                    aria-label={`Ir para a página ${pagina}`}
                  >
                    {pagina}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={proximaPagina}
                  disabled={paginaAtual === totalPaginas}
                  aria-label="Próxima página"
                >
                  {'>'}
                </button>
              </div>

              <select
                value={itensPorPagina}
                onChange={(evento) => {
                  setItensPorPagina(Number(evento.target.value));
                  setPaginaAtual(1);
                }}
                aria-label="Quantidade de veículos por página"
              >
                <option value={5}>5</option>
                <option value={7}>7</option>
                <option value={10}>10</option>
              </select>
            </footer>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Relatorios;