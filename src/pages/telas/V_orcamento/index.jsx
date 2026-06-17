import { useState } from 'react';
import Botao from './botao'
import { Link } from "react-router-dom";
import logo from '../../../assets/logo.png';

import entrada from "../../../assets/entrada.png";
import analise from "../../../assets/analise.png";
import diagnostico from "../../../assets/diagnostico.png";
import processo from "../../../assets/processo.png";
import finalizado from "../../../assets/finalizado.png";
import carro from "../../../assets/carro.png";

import notificacao from "../../../assets/notificacao.png";


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
                    
                                  <h2 className={styles.gs_bloco_titulo}>DADOS DO VEÍCULO</h2>
                    
                                  <div className={styles.gs_bloco}>
                    
                                    <div className={styles.gs_bloco_label}>
                    
                                      <div className={styles.gs_bloco_box}>
                                        <h1 className={styles.gs_bloco_text}>CLIENTE</h1>
                                        <p className={styles.gs_bloco_text02}>Guilherme Luiz</p>
                                      </div>
                    
                                      <div className={styles.gs_bloco_box}>
                                          <h1 className={styles.gs_bloco_text}>VEÍCULO</h1>
                                          <p className={styles.gs_bloco_text02}>Jetta 2.0 TSI</p>
                                      </div>
                    
                                      <div className={styles.gs_bloco_box}>
                                        <h1 className={styles.gs_bloco_text}>PLACA</h1>
                                        <p className={styles.gs_bloco_text02}>GLZ-2A08</p>
                                      </div>
                                    </div>
                    
                                    <div className={styles.gs_bloco_label}>
                    
                                      <div className={styles.gs_bloco_box}>
                                        <h1 className={styles.gs_bloco_text}>DATA DE ENTRADA</h1>
                                        <p className={styles.gs_bloco_text02}>27/07/2026</p>
                                      </div>
                    
                                      <div className={styles.gs_bloco_box}>
                                          <h1 className={styles.gs_bloco_text}>PREVISÃO DE ENTREGA</h1>
                                          <p className={styles.gs_bloco_text02}>29/07/2026</p>
                                      </div>
                    
                                      <div className={styles.gs_bloco_box}>
                                        <h1 className={styles.gs_bloco_text}>ORDEM DE SERVIÇO</h1>
                                        <p className={styles.gs_bloco_text02}>OS-000123</p>
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