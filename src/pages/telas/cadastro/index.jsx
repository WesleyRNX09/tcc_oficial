import { Link } from "react-router-dom";
import styles from './index.module.css';
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import Botao from './botao';

function cadastro (){
    return (
        
        <div className={styles.container}>
      
            <div className={styles.barra_Principal}> 
                <div className={styles.barra_Logo}>
                <img src={logo} className={styles.barra_Imagem} />
                </div>
            </div>

            <div className={styles.cadastro_Conteudo}>
                <div className={styles.cadastro_Margem}>
                
                    <div className={styles.home_imagem_container}>
                        <img src={logo} className={styles.cadastro_imagem} />     
                    </div>

                    <div className={styles.cadastro_boxs}>
                
                        <label className={styles.cadastro_titulo}>Faça ssssssssss seu Login:</label>

                        <div className={styles.cadastro_caixas}>

                            <div className={styles.cadastro_caixa01}>

                                <label className={styles.cadastro_label}>Nome Completo:</label>
                                <input className={styles.cadastro_textarea} placeholder="Digite aqui..."></input>

                            </div>

                            <div className={styles.cadastro_caixa02}>

                                <label className={styles.cadastro_label}>Email:</label>
                                <input className={styles.cadastro_textarea} placeholder="Digite aqui..."></input>
                                
                            </div>

                            <div className={styles.cadastro_caixa02}>

                                <label className={styles.cadastro_label}>Telefone:</label>
                                <input className={styles.cadastro_textarea} placeholder="Digite aqui..."></input>
                                
                            </div>

                            <div className={styles.cadastro_caixa02}>

                                <label className={styles.cadastro_label}>Senha:</label>
                                <input className={styles.cadastro_textarea} placeholder="Digite aqui..."></input>
                                
                            </div>

                            <div className={styles.cadastro_caixa02}>

                                <label className={styles.cadastro_label}>Confirme a Senha:</label>
                                <input className={styles.cadastro_textarea} placeholder="Digite aqui..."></input>
                                
                            </div>

                            <div className={styles.home_botoes}>
                                <Botao texto="Cadastrar" acao={'vermelho'} />
                            </div>
              
                        </div>
    
                    </div>

                </div>

            </div>

            <div className={styles.rodape_principal}></div>

        </div>
    )
}

export default cadastro;