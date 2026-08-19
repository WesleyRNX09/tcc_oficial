import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import styles from "./index.module.css";
import logo from "../../../assets/logo.png";

import { fazerLogin } from "../../../services/auth";


function Login01() {

    const navigate = useNavigate();

    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);


    async function entrar(event) {

        event.preventDefault();

        setErro("");
        setCarregando(true);

        try {

            const resposta = await fazerLogin(
                usuario,
                senha
            );

            const dados = resposta.dados;


            localStorage.setItem(
                "token",
                dados.token
            );


            localStorage.setItem(
                "usuario",
                JSON.stringify({
                    id_login: dados.id_login,
                    id_funcionario: dados.id_funcionario,
                    usuario: dados.usuario,
                    tipo_usuario: dados.tipo_usuario,
                    nome_funcionario: dados.nome_funcionario,
                    especialidade: dados.especialidade
                })
            );


            if (dados.tipo_usuario === "administrador") {

                navigate("/home_adm");

            } else {

                navigate("/home_adm");

            }

        } catch (error) {

            setErro(error.message);

        } finally {

            setCarregando(false);

        }

    }


    return (

        <div className={styles.container}>


            {/* =========================
                NAVBAR
            ========================== */}

            <header className={styles.barra_Principal}>


                <div className={styles.barra_Logo}>

                    <img
                        src={logo}
                        className={styles.barra_Imagem}
                        alt="MaxCar"
                    />

                </div>


                <div className={styles.barra_conteudo}>

                    <Link
                        to="/"
                        className={styles.barra_botao}
                    >
                        Inicio
                    </Link>

                </div>


            </header>



            {/* =========================
                CONTEÚDO DO LOGIN
            ========================== */}

            <main className={styles.login_Conteudo}>


                <div className={styles.login_card}>


                    {/* LOGO */}

                    <div className={styles.logo_container}>

                        <img
                            src={logo}
                            className={styles.login_logo}
                            alt="Logo MaxCar"
                        />

                    </div>



                    {/* TÍTULO */}

                    <h1 className={styles.login_titulo}>
                        LOGIN ADMINISTRADOR
                    </h1>



                    {/* FORMULÁRIO */}

                    <form
                        className={styles.login_form}
                        onSubmit={entrar}
                    >


                        {/* USUÁRIO */}

                        <div className={styles.campo}>

                            <label>
                                Usuário
                            </label>

                            <input
                                type="text"
                                placeholder="Digite seu usuário"
                                value={usuario}
                                onChange={(event) =>
                                    setUsuario(event.target.value)
                                }
                                autoComplete="username"
                            />

                        </div>



                        {/* SENHA */}

                        <div className={styles.campo}>

                            <label>
                                Senha
                            </label>


                            <div className={styles.senha_container}>

                                <input
                                    type={
                                        mostrarSenha
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Digite sua senha"
                                    value={senha}
                                    onChange={(event) =>
                                        setSenha(event.target.value)
                                    }
                                    autoComplete="current-password"
                                />


                                <button
                                    type="button"
                                    className={styles.botao_senha}
                                    onClick={() =>
                                        setMostrarSenha(!mostrarSenha)
                                    }
                                    aria-label={
                                        mostrarSenha
                                            ? "Ocultar senha"
                                            : "Mostrar senha"
                                    }
                                >

                                    {
                                        mostrarSenha
                                            ? (

                                                <svg
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.8"
                                                >

                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M3 3l18 18"
                                                    />

                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M10.6 10.6a2 2 0 002.8 2.8"
                                                    />

                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M9.8 4.2A10.8 10.8 0 0112 4c5.5 0 9 5 9 5a16 16 0 01-3.2 3.7M6.2 6.2C4.2 7.5 3 9 3 9s3.5 5 9 5c1.1 0 2.1-.2 3-.5"
                                                    />

                                                </svg>

                                            )
                                            : (

                                                <svg
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.8"
                                                >

                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"
                                                    />

                                                    <circle
                                                        cx="12"
                                                        cy="12"
                                                        r="2.5"
                                                    />

                                                </svg>

                                            )
                                    }

                                </button>

                            </div>

                        </div>



                        {/* ERRO */}

                        {
                            erro && (

                                <div className={styles.login_erro}>
                                    {erro}
                                </div>

                            )
                        }



                        {/* BOTÃO */}

                        <button
                            type="submit"
                            className={styles.botao_entrar}
                            disabled={carregando}
                        >

                            {
                                carregando
                                    ? "ENTRANDO..."
                                    : "ENTRAR"
                            }

                        </button>


                    </form>


                </div>


            </main>


        </div>

    );

}


export default Login01;