import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import styles from "./index.module.css";
import logo from "../../../assets/logo.png";

import { fazerLogin } from "../../../services/auth";


function Login01() {

    const navigate = useNavigate();

    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
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


            // Salvar token
            localStorage.setItem(
                "token",
                dados.token
            );


            // Salvar informações do usuário
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


            // Redirecionamento
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

            <div className={styles.barra_Principal}>

                <div className={styles.barra_Logo}>

                    <img
                        src={logo}
                        className={styles.barra_Imagem}
                        alt="Logo"
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

            </div>


            <div className={styles.login_Conteudo}>

                <div className={styles.login_Margem}>

                    <div className={styles.home_imagem_container}>

                        <img
                            src={logo}
                            className={styles.login_imagem}
                            alt="Logo"
                        />

                    </div>


                    {/* AGORA É UM FORM */}
                    <form
                        className={styles.login_boxs}
                        onSubmit={entrar}
                    >

                        <label className={styles.login_titulo}>
                            Login Administrador:
                        </label>


                        <div className={styles.login_caixas}>

                            <div className={styles.login_caixa02}>

                                <label className={styles.login_label}>
                                    Usuario:
                                </label>

                                <input
                                    type="text"
                                    placeholder="Usuário"
                                    value={usuario}
                                    onChange={(event) =>
                                        setUsuario(
                                            event.target.value
                                        )
                                    }
                                />

                            </div>


                            <div className={styles.login_caixa02}>

                                <label className={styles.login_label}>
                                    Senha:
                                </label>

                                <input
                                    type="password"
                                    placeholder="Senha"
                                    value={senha}
                                    onChange={(event) =>
                                        setSenha(
                                            event.target.value
                                        )
                                    }
                                />

                            </div>


                            {/* ERRO FORA DO BOTÃO */}
                            {
                                erro && (

                                    <p>
                                        {erro}
                                    </p>

                                )
                            }


                            <div className={styles.home_botoes}>

                                <button
                                    type="submit"
                                    disabled={carregando}
                                >

                                    {
                                        carregando
                                            ? "Entrando..."
                                            : "Entrar"
                                    }

                                </button>

                            </div>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}


export default Login01;