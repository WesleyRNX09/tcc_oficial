import { useState } from 'react';
import Botao from './botao';
import { Link } from "react-router-dom";
import logo from '../../../assets/logo.png';

import ordemServiço from "../../../assets/historico_de_ordem.png";
import adicionarFuncionario from "../../../assets/adicionar_funcionario.png";
import carro from "../../../assets/carro.png";
import relatorio from "../../../assets/relatorio.png";

// Se você tiver os ícones dos cards financeiros, pode importá-los aqui:
// import iconePecas from "../../../assets/icone_pecas.png";
// import iconeMaoObra from "../../../assets/icone_chave.png";
// import iconeTotal from "../../../assets/icone_cifrao.png";
// import iconeOrdem from "../../../assets/icone_ordem.png";

import { useNavigate } from "react-router-dom";
import styles from './index.module.css';

function Atualizar() {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const [busca, setBusca] = useState('');
  const [periodoData, setPeriodoData] = useState('01/01/2026 - 31/01/2026');
  const [itensPorPagina, setItensPorPagina] = useState(10);

  // Mock dos dados exibidos na tabela conforme a imagem
  const dadosTabela = [
    { data: '13/02/2026', cliente: 'Guilherme Luiz', veiculo: 'BMW M3 G80', descricao: 'Troca de Pneus', pagamento: 'Pago', total: 'R$120,00' },
    { data: '15/05/2026', cliente: 'Bruno Luan', veiculo: 'Jetta GLI', descricao: 'Alinhamento', pagamento: 'Pendente', total: 'R$120,00' },
    { data: '24/02/2026', cliente: 'Cauã Takasaki', veiculo: '911 GT3 RS', descricao: 'Reparo de Freios', pagamento: 'Pago', total: 'R$120,00' },
    { data: '18/09/2026', cliente: 'Matheus', veiculo: 'Onix LT 2021', descricao: 'Troca de Filtros', pagamento: 'Pago', total: 'R$120,00' },
    { data: '31/12/2026', cliente: 'João Pedro', veiculo: 'Gol 2017', descricao: 'Troca de Oleo', pagamento: 'Pendente', total: 'R$120,00' },
    { data: '29/05/2026', cliente: 'Wesley Beraldi', veiculo: 'Tracker 2022', descricao: 'Balanceamento', pagamento: 'Pendente', total: 'R$120,00' },
    { data: '01/01/2026', cliente: 'Richard Guerra', veiculo: 'Peugot 206', descricao: 'Troca de filtros', pagamento: 'Pago', total: 'R$120,00' }
  ];

  // Filtra os dados com base no que o usuário digitar na busca
  const dadosFiltrados = dadosTabela.filter(item => 
    item.cliente.toLowerCase().includes(busca.toLowerCase()) ||
    item.veiculo.toLowerCase().includes(busca.toLowerCase()) ||
    item.descricao.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className={styles.container}>

      {/* Topbar / Barra Principal */}
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
          <img src={logo} className={styles.barra_Imagem} alt="MaxCar Logo" />
        </div>

        <div className={styles.barra_conteudo}>
          <Link to="/login" className={styles.barra_botao}>Serviços</Link>
          <Link to="/" className={styles.barra_botao}>Acompanhar Veiculo</Link>
          <Link to="/login" className={styles.barra_botao}>Fazer Login</Link>
        </div>
      </div>

      {/* Conteúdo Principal do Dashboard */}
      <div className={styles.home_conteudo}>

        {menuAberto && (
          <div className={styles.home_overlay} onClick={() => setMenuAberto(false)} />
        )}

        {/* Sidebar */}
        <div className={`${styles.home_margin1} ${menuAberto ? styles.home_margin1_aberto : ''}`} style={{ width: menuAberto ? '50rem' : '0', minWidth: menuAberto ? '50rem' : '0' }}>
          <div className={styles.home_margin1_inner}>
            <Botao texto="FINANCEIRO" acao={'vermelho'} aoClicar={() => navigate("/cadastro")} />

            <div className={styles.home_margin1_btn}>
              <img src={ordemServiço} className={styles.home_margin1_img} alt="" />
              <Link to="/login" className={styles.home_margin1_text}>HISTORICO DE ORDEM DE SERVIÇO</Link>
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

        {/* Painel Central Financeiro (Adicionado) */}
        <div className={styles.painel_financeiro}>
          
          {/* Seção de Cards Superiores */}
          <div className={styles.cards_container}>
            <div className={`${styles.card_item} ${styles.card_pecas}`}>
              <div className={styles.card_icone}>📦</div>
              <div className={styles.card_info}>
                <span className={styles.card_label}>Peças</span>
                <span className={styles.card_valor}>R$650,00</span>
                <span className={styles.card_subtext}>Total de Peças</span>
              </div>
            </div>

            <div className={`${styles.card_item} ${styles.card_mao_obra}`}>
              <div className={styles.card_icone}>🔧</div>
              <div className={styles.card_info}>
                <span className={styles.card_label}>Mão de Obra</span>
                <span className={styles.card_valor}>R$300,00</span>
                <span className={styles.card_subtext}>Total de Mao de</span>
              </div>
            </div>

            <div className={`${styles.card_item} ${styles.card_total}`}>
              <div className={styles.card_icone}>💲</div>
              <div className={styles.card_info}>
                <span className={styles.card_label}>Total</span>
                <span className={styles.card_valor}>R$950,00</span>
                <span className={styles.card_subtext}>Total geral</span>
              </div>
            </div>

            <div className={`${styles.card_item} ${styles.card_ordem}`}>
              <div className={styles.card_icone}>📄</div>
              <div className={styles.card_info}>
                <span className={styles.card_label}>Ordem</span>
                <span className={styles.card_valor}>8</span>
                <span className={styles.card_subtext}>Este mês</span>
              </div>
            </div>
          </div>

          {/* Área de Filtros e Busca */}
          <div className={styles.busca_container}>
            <div className={styles.input_data_wrapper}>
              <span className={styles.icone_calendario}>📅</span>
              <input 
                type="text" 
                value={periodoData} 
                onChange={(e) => setPeriodoData(e.target.value)}
                className={styles.input_data} 
              />
            </div>
            
            <div className={styles.input_busca_wrapper}>
              <input 
                type="text" 
                placeholder="Buscar por cliente, serviço ou placa" 
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className={styles.input_busca} 
              />
              <span className={styles.icone_lupa}>🔍</span>
            </div>
          </div>

          {/* Tabela de Registros */}
          <div className={styles.tabela_container}>
            <table className={styles.tabela_financeira}>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Cliente</th>
                  <th>Veículo / Placa</th>
                  <th>Descrição</th>
                  <th>Pagamento</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {dadosFiltrados.map((item, index) => (
                  <tr key={index}>
                    <td>{item.data}</td>
                    <td>{item.cliente}</td>
                    <td>{item.veiculo}</td>
                    <td>{item.descricao}</td>
                    <td>
                      <span className={`${styles.badge_pagamento} ${item.pagamento === 'Pago' ? styles.pago : styles.pendente}`}>
                        {item.pagamento === 'Pago' ? '✓ ' : '🕒 '}{item.pagamento}
                      </span>
                    </td>
                    <td className={styles.coluna_total}>{item.total}</td>
                    <td>
                      <button className={styles.btn_acoes}>•••</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Paginação da Tabela */}
            <div className={styles.paginacao_container}>
              <div className={styles.paginacao_info}>
                Mostrando 1 a {dadosFiltrados.length} de 8 registros
              </div>
              
              <div className={styles.paginacao_controles}>
                <button className={styles.btn_pag} disabled>&lt;</button>
                <button className={`${styles.btn_pag} ${styles.btn_pag_ativo}`}>1</button>
                <button className={styles.btn_pag}>2</button>
                <button className={styles.btn_pag}>&gt;</button>
              </div>

              <div className={styles.seletor_itens}>
                <select 
                  value={itensPorPagina} 
                  onChange={(e) => setItensPorPagina(Number(e.target.value))}
                  className={styles.select_pag}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
          </div>

        </div>

      </div>

      <div className={styles.rodape_principal}></div>
      
    </div>
  );
}

export default Atualizar;