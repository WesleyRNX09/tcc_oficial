import Botao from './botao'
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';
import fundo from '../../assets/fundoHOM3.png';
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
      

        <div className={styles.home_Conteudo}>

          <div className={styles.home_Margem}>

            <div className={styles.home_imagem_container}>
              <img src={fundo} className={styles.home_imagem} />     
            </div>

            <div className={styles.home_linha}>
              <p className={styles.home_linha_letras}>Revisão Geral</p>
              <p className={styles.home_linha_letras}>Suspensão</p>
              <p className={styles.home_linha_letras}>Freios</p>
              <p className={styles.home_linha_letras}>Pneus</p>
              <p className={styles.home_linha_letras}>Óleo</p>  
            </div>
      
            <div className={styles.home_botoes}>

                <Botao texto="ENTRE EM CONTATO CONOSCO" acao={'branco'} />
                <Botao texto="ACOMPANHAR VEÍCULO" acao={'vermelho'} aoClicar={() => navigate("/procurar_veiculo")} />
                
            </div>
          </div>

          <div className={styles.rodape_principal}></div>

        </div>
           
    </div>
  )
}

export default Home;
