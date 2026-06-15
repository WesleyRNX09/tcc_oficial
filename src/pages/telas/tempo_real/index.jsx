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

                <div className={styles.barra_direita}>
            
                      {/* Ícone de notificação — COLOQUE SEU ÍCONE/IMAGEM AQUI se quiser */}
                      <button className={styles.barra_sino} aria-label="Notificações">
                        {/* <img src={iconeSino} alt="Notificações" /> */}
                        <img src={notificacao}></img>
                      </button>
            
                      {/* Card de perfil */}
                      <div className={styles.barra_perfil}>
                        {/* ÍCONE DO USUÁRIO — troque por <img src={iconePerfil} /> se tiver */}
                        <div className={styles.barra_perfil_icone}>
                          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}>
                            <circle cx="12" cy="8" r="4"/>
                            <path strokeLinecap="round" d="M4 20c0-4 3.582-7 8-7s8 3 8 7"/>
                          </svg>
                        </div>
            
                        <div className={styles.barra_perfil_info}>
                          <span className={styles.barra_perfil_nome}>Usuario</span>
                          <span className={styles.barra_perfil_cargo}>Cliente</span>
                        </div>
            
                        {/* Seta dropdown — troque por <img src={setaDropdown} /> se quiser */}
                        <svg className={styles.barra_seta} src={notificacao} width="16" height="16" fill="none"
                            viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </div>
            
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
                        <img src={carro} className={styles.tempo_imagem01} />
                    </div>

                    <div className={styles.login_box}>
                        <p className={styles.login_textbox01}>DIAGNÓSTICO: Suspensão danificada</p>
                        <br></br>
                        <p className={styles.login_textbox02}>PREVISÃO DE ENTREGA 00/00/0000</p>
                    </div>

                    <Botao texto="VERIFICAR ORÇAMENTO" acao={'vermelho'} />

                    
                    
                </div>

            </div>

        
            
        </div>
    )
}

export default tempo_real;