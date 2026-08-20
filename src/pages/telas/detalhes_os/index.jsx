import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import apiRequest from "../../../services/api";

import styles from "./index.module.css";


function DetalhesOs() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [ordem, setOrdem] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");


    useEffect(() => {

        async function carregarDetalhes() {

            try {

                setCarregando(true);
                setErro("");

                const resposta = await apiRequest(
                    `/ordens-servico/${id}/detalhes`
                );

                setOrdem(resposta.dados);

            } catch (error) {

                console.log(error);

                setErro(error.message);

            } finally {

                setCarregando(false);

            }

        }

        carregarDetalhes();

    }, [id]);


    if (carregando) {

        return (
            <div className={styles.pagina}>
                Carregando OS...
            </div>
        );

    }


    if (erro) {

        return (
            <div className={styles.pagina}>

                <p>{erro}</p>

                <button
                    onClick={() => navigate("/os")}
                >
                    Voltar
                </button>

            </div>
        );

    }


    return (

        <div className={styles.pagina}>

            <div className={styles.container}>

                <button
                    className={styles.voltar}
                    onClick={() => navigate("/os")}
                >
                    ← Voltar
                </button>


                <h1>
                    OS-
                    {
                        String(
                            ordem.id_os
                        ).padStart(
                            5,
                            "0"
                        )
                    }
                </h1>


                <div className={styles.card}>

                    <h2>Cliente</h2>

                    <p>
                        Nome: {ordem.cliente?.nome_cliente}
                    </p>

                    <p>
                        Telefone: {ordem.cliente?.telefone}
                    </p>

                    <p>
                        CPF: {ordem.cliente?.cpf}
                    </p>

                </div>


                <div className={styles.card}>

                    <h2>Veículo</h2>

                    <p>
                        {ordem.veiculo?.marca}{" "}
                        {ordem.veiculo?.modelo}
                    </p>

                    <p>
                        Placa: {ordem.veiculo?.placa}
                    </p>

                    <p>
                        Ano: {ordem.veiculo?.ano}
                    </p>

                </div>


                <div className={styles.card}>

                    <h2>Ordem de Serviço</h2>

                    <p>
                        Status: {ordem.status}
                    </p>

                    <p>
                        Valor: R$ {ordem.valor_total}
                    </p>

                    <p>
                        Observações: {ordem.observacoes}
                    </p>

                </div>

            </div>

        </div>

    );

}


export default DetalhesOs;