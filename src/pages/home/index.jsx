import Botao from './botao'
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';
import fundo01 from '../../assets/pagina_inicial01.png';
import fundo02 from '../../assets/fundoHOM3.png';
import { useNavigate } from "react-router-dom";
import imagem01 from '../../assets/Revisao.png';
import imagem02 from '../../assets/suspensao.png';
import imagem03 from '../../assets/freios.png';
import imagem04 from '../../assets/pneus.png';
import imagem05 from '../../assets/oleo.png';

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
        
                <Link to="/login" className={styles.barra_botao}>Serviços</Link>
                <Link to="/" className={styles.barra_botao}>Acompanhar Veiculo</Link>
                <Link to="/login" className={styles.barra_botao}>Fazer Login</Link>

        </div>
      </div>

      <div className={styles.home_conteudo}>

        <div className={styles.home_margin1}>
          <Botao texto="CADASTRE-SE" acao={'vermelho'} aoClicar={() => navigate("/cadastro")}/>
          <img src={fundo01} className={styles.home_imagem01} />
          <Botao texto="ENTRE EM CONTATO CONOSCO" acao={'branco'} />
        </div>
        
        <div className={styles.home_margin2}>

          <div className={styles.home_box}>

            <img src={fundo02} className={styles.home_imagem02} />

            <div className={styles.home_box02}>
              
              <h1>Serviços</h1>

                <div className={styles.home_caixas}>

                  <div className={styles.home_caixa}>
                    <img src={imagem01} className={styles.home_caixa_imagem} />
                    <h3>Revisão Geral</h3>
                  </div>

                  <div className={styles.home_caixa}>
                    <img src={imagem02} className={styles.home_caixa_imagem} />
                    <h3>Suspensão</h3>
                  </div>

                  <div className={styles.home_caixa}>
                    <img src={imagem03} className={styles.home_caixa_imagem} />
                    <h3>Freios</h3>
                  </div>

                  <div className={styles.home_caixa}>
                    <img src={imagem04} className={styles.home_caixa_imagem} />
                    <h3>Pneus</h3>
                  </div>

                  <div className={styles.home_caixa}>
                    <img src={imagem05} className={styles.home_caixa_imagem} />
                    <h3>Óleo</h3>
                  </div>

                </div>
                
                <Botao texto="ACOMPANHAR VEÍCULO" acao={'vermelho'} aoClicar={() => navigate("/procurar_veiculo")}  />
            </div>
          </div>

        </div>

      </div>  
      

        
        

      <div className={styles.rodape_principal}></div>

      
           
    </div>
  )
}

export default Home;
