import { useState } from 'react';
import Botao from './botao'
import { Link } from "react-router-dom";
import logo from '../../../assets/logo.png';

import punto from '../../../assets/fiat_punto.png';
import diagnostico from '../../../assets/diagnostico.png';



import { useNavigate } from "react-router-dom";

import styles from './index.module.css';

function tempo_real () {

    const navigate = useNavigate();

    return(
        <div className={styles.container}>

            <div className={styles.barra_Principal}> 
                <div className={styles.barra_Logo}>
                    <img src={logo} className={styles.barra_Imagem} />
                </div>

                <div className={styles.barra_conteudo}>
                    <Link to="/" className={styles.barra_botao}>Início</Link>
                </div>

            </div>
            

            <div className={styles.tempo_Conteudo}>

                <div className={styles.tempo_Margem}>

                    <div className={styles.tempo_topo}>
                        <div className={styles.voltar}>
                            <Botao texto="←" acao={'preto'} aoClicar={() => navigate("/procurar_veiculo")} />
                        </div>

                        <div className={styles.tempo_imagem_container}>
                            <img src={logo} className={styles.tempo_imagem} />
                        </div>

                        <div className={styles.tempo_topo_espacador}></div>
                    </div>

                    <label className={styles.tempo_titulo}>Acompanhe seu Veículo:</label>

                    <div className={styles.gs_areaBlocos}>
                    
                    
                                <div className={styles.gs_blocos}>

                                    <div className={styles.gs_bloco01}>
                    
                                        <img src={punto} className={styles.gs_bloco_img} />
                                        
                                        <div className={styles.gs_bloco_label}>
                        
                                            <div className={styles.gs_bloco_box01}>
                                                <h1 className={styles.gs_bloco_titulo}>VEÍCULO</h1>
                                                <p className={styles.gs_bloco_text02}>Fiat Punto Essence 1.6 Flex 16V</p>
                                            </div>
                            
                                            <div className={styles.gs_bloco_box02}>
                                                <h1 className={styles.gs_bloco_text}>PLACA:</h1>
                                                <p className={styles.gs_bloco_text02}>ABL-5A78</p>
                                            </div>
                            
                                            <div className={styles.gs_bloco_box02}>
                                                <h1 className={styles.gs_bloco_text}>ANO:</h1>
                                                <p className={styles.gs_bloco_text02}>2020</p>
                                            </div>

                                            <div className={styles.gs_bloco_box02}>
                                                <h1 className={styles.gs_bloco_text}>COR:</h1>
                                                <p className={styles.gs_bloco_text02}>Prata</p>
                                            </div>

                                        </div>

                                    </div>

                                    <div className={styles.gs_linha}></div>

                                    <div className={styles.gs_bloco02}>
                                        <div className={styles.gs_bloco_box01}>
                                            <div className={styles.gs_bloco_cabecalho}>
                                                <img src={diagnostico} className={styles.gs_bloco_img02} />
                                                <h1 className={styles.gs_bloco_titulo}>Descrição do serviço</h1>
                                            </div>
                                            <p className={styles.gs_bloco_descricao}>Realizada a revisão do sistema de freios, sendo identificado desgaste nas pastilhas. Efetuada a substituição dos componentes necessários e realizados testes para garantir a eficiência e a segurança da frenagem.</p>
                                        </div>
                                    </div>

                                </div>

                                
                    </div>

                    
                </div>

            </div>

        
            
        </div>
    )
}

export default tempo_real;