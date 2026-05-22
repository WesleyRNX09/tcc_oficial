import { Link } from "react-router-dom";
import styles from './index.module.css';
import logo from "../../../assets/logo.png";
import carro from "../../../assets/carro.png";

function Cadastro() {
  return (
    <div className={styles.container}>

      {/* ── BARRA TOPO ── */}
      <div className={styles.barra_Principal}>
        <div className={styles.barra_Logo}>
          <img src={logo} className={styles.barra_Imagem} alt="logo" />
        </div>
        <div className={styles.barra_conteudo}>
          <Link to="/" className={styles.barra_botao}>Inicio</Link>
          <Link to="/login" className={styles.barra_botao}>Fazer login</Link>
        </div>
      </div>

      {/* ── CONTEÚDO CENTRAL ── */}
      <div className={styles.cadastro_Conteudo}>
        <div className={styles.cadastro_Margem}>

          {/* Logo no topo do card */}
          <div className={styles.home_imagem_container}>
            <img src={logo} className={styles.cadastro_imagem} alt="MaxCar" />
          </div>

          {/* Grid principal: 2 colunas de campos + 1 coluna de imagem */}
          <div className={styles.cadastro_boxs}>

            {/* TÍTULO — ocupa as 3 colunas */}
            <label className={styles.cadastro_titulo}>
              Cadastre o <span className={styles.cadastro_cad}>Veículo</span>
            </label>

            {/* ── COL 1 ── */}
            <div className={styles.inputGroup}>
              <label className={styles.inputText}>Placa:</label>
              <input type="text" />
            </div>

            {/* ── COL 2 ── */}
            <div className={styles.inputGroup}>
              <label className={styles.inputText}>Telefone Cliente:</label>
              <input type="text" />
            </div>

            {/* ── COL 1 ── */}
            <div className={styles.inputGroup}>
              <label className={styles.inputText}>Marca:</label>
              <select>
                <option value=""></option>
                <option>Volkswagen</option>
                <option>Fiat</option>
                <option>Chevrolet</option>
                <option>Honda</option>
                <option>Toyota</option>
                <option>Ford</option>
                <option>Hyundai</option>
                <option>Renault</option>
              </select>
            </div>

            {/* ── COL 2 ── */}
            <div className={styles.inputGroup}>
              <label className={styles.inputText}>CPF Cliente:</label>
              <input type="text" />
            </div>

            {/* ── COL 1 ── */}
            <div className={styles.inputGroup}>
              <label className={styles.inputText}>Modelo:</label>
              <input type="text" />
            </div>

            {/* ── COL 2 ── */}
            <div className={styles.inputGroup}>
              <label className={styles.inputText}>Reparo:</label>
              <input type="text" />
            </div>

            {/* Nome do Cliente — só col 1 (metade da largura) */}
            <div className={styles.inputGroupFull}>
              <label className={styles.inputText}>Nome do Cliente:</label>
              <input type="text" />
            </div>

            {/* ── ÁREA DA IMAGEM (col 3, rows 2-6) ── */}
            <div className={styles.imagemArea}>
              <label className={styles.labelImagem}>Adicione uma foto do veículo:</label>

              <div className={styles.uploadBox}>
                <img src={carro} className={styles.uploadIcon} alt="ícone carro" />
              </div>

              <button className={styles.botaoCodigo}>
                Gerar código do veículo
              </button>

              <span className={styles.codigo}>COD: 001</span>
            </div>

            {/* BOTÃO CADASTRAR — cols 1 e 2 */}
            

          </div>{/* fim cadastro_boxs */}
          
            <div className={styles.botaoArea}>
              <button className={styles.botaoCadastrar}>CADASTRAR</button>
            </div>

        </div>{/* fim cadastro_Margem */}
      </div>{/* fim cadastro_Conteudo */}

      {/* ── RODAPÉ ── */}
      <div className={styles.rodape_principal} />

    </div>
  );
}

export default Cadastro;
