import { Link } from "react-router-dom";
import styles from './index.module.css';
import logo from "../../../assets/logo.png";
import Botao from './botao';
import { useNavigate } from "react-router-dom";


function Login01() {

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      
      <div className={styles.barra_Principal}> 
        <div className={styles.barra_Logo}>
          <img src={logo} className={styles.barra_Imagem} />
        </div>

        <div className={styles.barra_conteudo}>
          <Link to="/" className={styles.barra_botao}>Inicio</Link>
          <Link to="/login_adm" className={styles.barra_botao}>Logar como Funcionarios</Link>
        </div>
      </div>

      <div className={styles.login_Conteudo}>
        <div className={styles.login_Margem}>
          
          <div className={styles.home_imagem_container}>
            <img src={logo} className={styles.login_imagem} />     
          </div>

          <div className={styles.login_boxs}>

           
            <label className={styles.login_titulo}>Faça seu Login:</label>

            <div className={styles.login_caixas}>

              <div className={styles.login_caixa01}>

                <label className={styles.login_label}>E-mail:</label>
                <input className={styles.login_textarea} placeholder="Digite aqui..."></input>

              </div>

              <div className={styles.login_caixa02}>

                <label className={styles.login_label}>Senha:</label>
                <input className={styles.login_textarea} placeholder="Digite aqui..."></input>
                <Link to="/login" className={styles.login_senha}>Esqueceu a Senha ?</Link>

              </div>

              <div className={styles.home_botoes}>
                <Botao texto="Entrar" acao={'vermelho'} />
              </div>

              <div className={styles.login_linha}> </div>

              <div className={styles.home_botoes2}>
                <Botao texto="Criar uma Conta " acao={'Branco'} aoClicar={() => navigate("/cadastro")} />
              </div>

            </div>

            

          </div>

        </div>

      </div>
      
      
    </div>
  );
}

export default Login01;