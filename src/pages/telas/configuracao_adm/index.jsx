import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import Botao from './botao';
import logo from '../../../assets/logo.png';

import ordemServico from "../../../assets/historico_de_ordem.png";
import adicionarFuncionario from "../../../assets/adicionar_funcionario.png";
import carro from "../../../assets/carro.png";
import relatorio from "../../../assets/relatorio.png";

import styles from './index.module.css';

function Configuracao_adm() {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.barra_Principal}>
        <div className={styles.barra_Logo}>
          <button
            className={`${styles.barra_menu_btn} ${
              menuAberto ? styles.barra_menu_btn_aberto : ''
            }`}
            onClick={() => setMenuAberto(!menuAberto)}
          >
            <span className={styles.barra_linha}></span>
            <span className={styles.barra_linha}></span>
            <span className={styles.barra_linha}></span>
          </button>

          <img src={logo} alt="Logo" className={styles.barra_Imagem} />
        </div>

        <div className={styles.barra_conteudo}>
          <Link to="/os" className={styles.barra_botao}>
            Serviços
          </Link>

          <Link to="/" className={styles.barra_botao}>
            Acompanhar Veículo
          </Link>

          <Link to="/login" className={styles.barra_botao}>
            Fazer Login
          </Link>
        </div>
      </div>

      <div className={styles.home_conteudo}>
        {menuAberto && (
          <div
            className={styles.home_overlay}
            onClick={() => setMenuAberto(false)}
          />
        )}

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
            <Botao
              texto="FINANCEIRO"
              acao="vermelho"
              aoClicar={() => navigate("/financeiro")}
            />

            <div className={styles.home_margin1_btn}>
              <img
                src={ordemServico}
                alt=""
                className={styles.home_margin1_img}
              />
              <Link to="/os" className={styles.home_margin1_text}>
                HISTÓRICO DE ORDEM DE SERVIÇO
              </Link>
            </div>

            <div className={styles.home_margin1_btn}>
              <img
                src={adicionarFuncionario}
                alt=""
                className={styles.home_margin1_img}
              />
              <Link to="/login" className={styles.home_margin1_text}>
                ADICIONAR FUNCIONÁRIO
              </Link>
            </div>

            <div className={styles.home_margin1_btn}>
              <img
                src={carro}
                alt=""
                className={styles.home_margin1_img}
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
                alt=""
                className={styles.home_margin1_img}
              />
              <Link
                to="/cadastroV"
                className={styles.home_margin1_text}
              >
                CADASTRAR VEÍCULO
              </Link>
            </div>

            <div className={styles.home_margin1_btn}>
              <img
                src={relatorio}
                alt=""
                className={styles.home_margin1_img}
              />
              <Link to="/login" className={styles.home_margin1_text}>
                RELATÓRIOS
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.home_margin2}>
          <div className={styles.home_box}>
            <h1 style={{ color: "white" }}>
              Configuração Administrativa
            </h1>
          </div>
        </div>
      </div>

      <div className={styles.rodape_principal}></div>
    </div>
  );
}

export default Configuracao_adm;