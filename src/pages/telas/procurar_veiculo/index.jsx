import { Link } from "react-router-dom";
import styles from './index.module.css';
import logo from "../../../assets/logo.png";
import Botao from './botao';
import { useNavigate } from "react-router-dom";


function veiculo01 (){

    const navigate = useNavigate();

    return(
        <div className={styles.container}>

            <div className={styles.barra_Principal}> 
                <div className={styles.barra_Logo}>
                    <img src={logo} className={styles.barra_Imagem} />
                </div>
            </div>

            <div className={styles.procurar_Conteudo}>

                <div className={styles.voltar}>
                    <Botao texto="←" acao={'preto'} aoClicar={() => navigate("/")} />
                </div>

                <div className={styles.procurar_Margem}>

                   
                
                    <div className={styles.procurar_imagem_container}>
                        <img src={logo} className={styles.procurar_imagem} />     
                    </div>

                    <div className={styles.procurar_boxs}>

                        <label className={styles.procurar_titulo}>Pesquisar por Veículo:</label>

                        <div className={styles.procurar_caixas}>
                            
                            <div className={styles.procurar_caixa01}>
                            
                                <label className={styles.procurar_label}>Insira o Codigo do Veículo:</label>
                                <input className={styles.procurar_textarea} placeholder="Digite aqui..."></input>
                            
                            </div>

                            <div className={styles.procurar_botoes}>
                                <Botao texto="Confirmar" acao={'vermelho'} aoClicar={() => navigate("/tempo_real")}  />
                            </div>


                        </div>


                    </div>

                    


                </div>

                <div className={styles.rodape_principal}></div>

            </div>
           
        </div>
    )
}

export default veiculo01;