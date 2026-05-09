import Botao from './botao'
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';
import fundo01 from '../../assets/pagina_inicial01.png';
import fundo02 from '../../assets/fundoHOM3.png';
import { useNavigate } from "react-router-dom";

import styles from './index.module.css';

function Home() {

   const navigate = useNavigate();

  return (
    <div className={styles.container}>

      <div className={styles.barra_Principal}>

        <div className={styles.barra_Logo}>
          <img src={logo} className={styles.barra_Imagem} />
        </div>

        <div className={styles.barra_conteudo}>
        
                <button className={styles.barra_botao}>Fazer 1</button>
                <button className={styles.barra_botao}>Fazer 1</button>
                <button className={styles.barra_botao}>Fazer 1</button>
                <Link to="/login" className={styles.barra_botao}>
                    Fazer Login
                </Link>

           
        </div>
      </div>

      <div className={styles.home_conteudo}>

        <div className={styles.home_margin1}>
          <Botao texto="CADASTRE-SE" acao={'vermelho'} />
          <img src={fundo01} className={styles.home_imagem01} />
          <Botao texto="CADASTRE-SE" acao={'branco'} />
        </div>
        
        <div className={styles.home_margin2}>

          <div className={styles.home_box}>

            <img src={fundo02} className={styles.home_imagem02} />

            <div className={styles.home_box02}>

            </div>
          </div>
        </div>

      </div>
      

        
        

      <div className={styles.rodape_principal}></div>

      
           
    </div>
  )
}

export default Home;
