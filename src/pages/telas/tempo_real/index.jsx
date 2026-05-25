import { useState } from 'react';
import Botao from './botao'
import { Link } from "react-router-dom";
import logo from '../../../assets/logo.png';

import entrada from "../../../assets/entrada.png";
import analise from "../../../assets/analise.png";
import diagnostico from "../../../assets/diagnostico.png";
import processo from "../../../assets/processo.png";
import finalizado from "../../../assets/finalizado.png";
import rastreio from "../../../assets/rastreio.png";


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
            </div>

            <div className={styles.tempo_Conteudo}>

                <div className={styles.voltar}>
                     <Botao texto="←" acao={'preto'} aoClicar={() => navigate("/procurar_veiculo")} />
                </div>


                <div className={styles.tempo_Margem}>

                    <div className={styles.tempo_imagem_container}>
                        <img src={logo} className={styles.tempo_imagem} />     
                    </div>

                    <label className={styles.tempo_titulo}>Acompanhe seu Veículo:</label>

                    <div className={styles.tempo_linha}>
                    
                        <div className={`${styles.tempo_etapa} ${styles.ativo}`}>
                            <img src={entrada} className={styles.tempo_bolinha_img} />
                            <span className={styles.tempo_bolinha}></span>
                            <p className={styles.tempo_linha_letras}>ENTRADA</p>
                            <small>00/00/0000</small>
                        </div>
                    
                        <div className={styles.tempo_etapa}>
                            <img src={analise} className={styles.tempo_bolinha_img} />
                            <span className={styles.tempo_bolinha}></span>
                            <p className={styles.tempo_linha_letras}>EM ANÁLISE</p>
                        </div>
                    
                        <div className={styles.tempo_etapa}>
                            <img src={diagnostico} className={styles.tempo_bolinha_img} /> 
                            <span className={styles.tempo_bolinha}></span>
                            <p className={styles.tempo_linha_letras}>DIAGNÓSTICO</p>
                        </div>
                    
                        <div className={`${styles.tempo_etapa} ${styles.progresso}`}>
                            <img src={processo} className={styles.tempo_bolinha_img_processo} />
                            <span className={styles.tempo_bolinha}></span>
                            <p className={styles.tempo_linha_letras}>EM PROCESSO</p>
                        </div>
                    
                        <div className={styles.tempo_etapa}>
                            <img src={finalizado} className={styles.tempo_bolinha_img} /> 
                            <span className={styles.tempo_bolinha}></span>
                            <p className={styles.tempo_linha_letras}>FINALIZADO</p>
                        </div>
                    </div>

                    <div className={styles.tempo_imagem_container01 }>
                        <img src={rastreio} className={styles.tempo_imagem01} />
                    </div>

                    <div className={styles.login_box}>
                        <p className={styles.login_textbox01}>DIAGNÓSTICO: Suspensão danificada</p>
                        <br></br>
                        <p className={styles.login_textbox02}>PREVISÃO DE ENTREGA 00/00/0000</p>
                    </div>

                    <Botao texto="VERIFICAR ORÇAMENTO" acao={'vermelho'} />

                    
                    
                </div>

            </div>

            <div className={styles.rodape_principal}></div>
            
        </div>
    )
}

export default tempo_real;