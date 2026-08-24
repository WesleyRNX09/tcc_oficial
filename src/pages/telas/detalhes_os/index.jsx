import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import apiRequest from "../../../services/api";

import logo from "../../../assets/logo.png";
import notificacao from "../../../assets/notificacao.png";

import styles from "./index.module.css";


function DetalhesOs() {

    const { id } = useParams();
    const navigate = useNavigate();


    const [ordem, setOrdem] = useState(null);

    const [carregando, setCarregando] = useState(true);

    const [erro, setErro] = useState("");

    const [mensagem, setMensagem] = useState("");


    // Campos que poderão ser editados
    const [statusEditavel, setStatusEditavel] = useState("");

    const [valorEditavel, setValorEditavel] = useState("");


    const [salvandoStatus, setSalvandoStatus] = useState(false);

    const [salvandoValor, setSalvandoValor] = useState(false);

    // =====================================================
    // SERVIÇOS
    // =====================================================

    const [problemaSelecionado, setProblemaSelecionado] = useState("");

    // =====================================================
    // PEÇAS
    // =====================================================

    const [pecas, setPecas] = useState([]);

    const [pecaSelecionada, setPecaSelecionada] = useState("");

    const [quantidadePeca, setQuantidadePeca] = useState(1);

    const [adicionandoPeca, setAdicionandoPeca] = useState(false);


    const usuarioLogado = JSON.parse(
        localStorage.getItem("usuario") || "{}"
    );

    const [descricaoProblema, setDescricaoProblema] = useState("");
    const [prioridadeProblema, setPrioridadeProblema] = useState("Média");
    

    const [cadastrandoProblema, setCadastrandoProblema] =
        useState(false);


    // =====================================================
    // CADASTRAR SERVIÇO
    // =====================================================

    const [descricaoServico, setDescricaoServico] = useState("");

    const [tempoServico, setTempoServico] = useState("");

    const [valorServico, setValorServico] = useState("");

    const [cadastrandoServico, setCadastrandoServico] =
        useState(false);

    



    // =====================================================
    // CARREGAR DETALHES
    // =====================================================

    async function carregarDetalhes() {

        try {

            setCarregando(true);
            setErro("");


            const resposta = await apiRequest(
                `/ordens-servico/${id}/detalhes`
            );


            const dados = resposta.dados;


            setOrdem(dados);


            setStatusEditavel(
                dados.status || ""
            );


            setValorEditavel(
                dados.valor_total ?? 0
            );


        } catch (error) {

            console.log(error);

            setErro(
                error.message
            );

        } finally {

            setCarregando(false);

        }

    }

    async function cadastrarEAdicionarServico() {

        try {

            setErro("");
            setMensagem("");


            // PROBLEMA

            if (!problemaSelecionado) {

                setErro(
                    "Selecione o problema."
                );

                return;

            }


            // DESCRIÇÃO

            if (!descricaoServico.trim()) {

                setErro(
                    "Digite o serviço realizado."
                );

                return;

            }


            // TEMPO

            const tempoNumero =
                Number(tempoServico);


            if (
                !Number.isInteger(tempoNumero) ||
                tempoNumero <= 0
            ) {

                setErro(
                    "Informe um tempo válido."
                );

                return;

            }


            // VALOR

            const valorNumero =
                Number(valorServico);


            if (
                Number.isNaN(valorNumero) ||
                valorNumero < 0
            ) {

                setErro(
                    "Informe um valor válido."
                );

                return;

            }


            setCadastrandoServico(true);


            // =========================================
            // 1. CADASTRAR SERVIÇO
            // =========================================

            const respostaServico =
                await apiRequest(
                    "/servicos",
                    {
                        method: "POST",

                        body: JSON.stringify({

                            id_problema:
                                Number(
                                    problemaSelecionado
                                ),

                            descricao_serv:
                                descricaoServico.trim(),

                            tempo_estimado:
                                tempoNumero,

                            valor_mao_obra:
                                valorNumero

                        })
                    }
                );


            const idServico =
                respostaServico.dados?.id_servico;


            if (!idServico) {

                throw new Error(
                    "Não foi possível obter o serviço criado."
                );

            }


            // =========================================
            // 2. ADICIONAR SERVIÇO À OS
            // =========================================

            await apiRequest(
                "/itens-os",
                {
                    method: "POST",

                    body: JSON.stringify({

                        id_os:
                            Number(id),

                        id_servico:
                            Number(idServico),

                        quantidade: 1,

                        valor_unitario:
                            valorNumero

                    })
                }
            );


            // =========================================
            // 3. RECALCULAR TOTAL
            // =========================================

            await apiRequest(
                `/ordens-servico/${id}/recalcular-total`,
                {
                    method: "PATCH"
                }
            );


            // LIMPAR

            setDescricaoServico("");
            setTempoServico("");
            setValorServico("");


            setMensagem(
                "Serviço cadastrado e adicionado à OS."
            );


            await carregarDetalhes();


        } catch (error) {

            console.log(error);

            setErro(error.message);

        } finally {

            setCadastrandoServico(false);

        }

    }

    // =====================================================
    // CARREGAR PEÇAS
    // =====================================================

    async function carregarPecas() {

        try {

            const resposta = await apiRequest(
                "/pecas"
            );

            setPecas(
                resposta.dados || []
            );

        } catch (error) {

            console.log(
                "Erro ao carregar peças:",
                error
            );

        }

    }


    useEffect(() => {

        carregarDetalhes();

        carregarPecas();

    }, [id]);


    // =====================================================
    // FORMATAR VALOR
    // =====================================================

    function formatarValor(valor) {

        return Number(
            valor || 0
        ).toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );

    }


    // =====================================================
    // FORMATAR DATA
    // =====================================================

    function formatarData(data) {

        if (!data) {

            return "-";

        }


        return new Date(
            data
        ).toLocaleDateString(
            "pt-BR"
        );

    }


    // =====================================================
    // ALTERAR STATUS
    // =====================================================

    async function atualizarStatus() {

        try {

            setSalvandoStatus(true);

            setErro("");
            setMensagem("");


            await apiRequest(
                `/ordens-servico/${id}`,
                {
                    method: "PATCH",

                    body: JSON.stringify({
                        status: statusEditavel
                    })
                }
            );


            setMensagem(
                "Status atualizado com sucesso."
            );


            await carregarDetalhes();


        } catch (error) {

            console.log(error);

            setErro(
                error.message
            );

        } finally {

            setSalvandoStatus(false);

        }

    }


    // =====================================================
    // ALTERAR VALOR
    // =====================================================

    async function atualizarValor() {

        try {

            setSalvandoValor(true);

            setErro("");
            setMensagem("");


            const valorNumero =
                Number(valorEditavel);


            if (
                Number.isNaN(valorNumero) ||
                valorNumero < 0
            ) {

                setErro(
                    "Informe um valor válido."
                );

                return;

            }


            await apiRequest(
                `/ordens-servico/${id}`,
                {
                    method: "PATCH",

                    body: JSON.stringify({
                        valor_total: valorNumero
                    })
                }
            );


            setMensagem(
                "Valor atualizado com sucesso."
            );


            await carregarDetalhes();


        } catch (error) {

            console.log(error);

            setErro(
                error.message
            );

        } finally {

            setSalvandoValor(false);

        }

    }


    // =====================================================
    // RECALCULAR VALOR PELOS ITENS
    // =====================================================

    async function recalcularValor() {

        try {

            setErro("");
            setMensagem("");


            await apiRequest(
                `/ordens-servico/${id}/recalcular-total`,
                {
                    method: "PATCH"
                }
            );


            setMensagem(
                "Valor recalculado com sucesso."
            );


            await carregarDetalhes();


        } catch (error) {

            console.log(error);

            setErro(
                error.message
            );

        }

    }

    // =====================================================
    // ADICIONAR PEÇA À OS
    // =====================================================

    async function adicionarPeca() {

        try {

            setErro("");
            setMensagem("");


            // =============================================
            // VALIDAR PEÇA
            // =============================================

            if (!pecaSelecionada) {

                setErro(
                    "Selecione uma peça."
                );

                return;

            }


            const peca = pecas.find(

                (item) =>
                    Number(item.id_peca) ===
                    Number(pecaSelecionada)

            );


            if (!peca) {

                setErro(
                    "Peça não encontrada."
                );

                return;

            }


            // =============================================
            // VALIDAR QUANTIDADE
            // =============================================

            const quantidade =
                Number(quantidadePeca);


            if (
                !Number.isInteger(quantidade) ||
                quantidade <= 0
            ) {

                setErro(
                    "A quantidade deve ser maior que zero."
                );

                return;

            }


            // =============================================
            // VALIDAR ESTOQUE
            // =============================================

            if (
                quantidade >
                Number(peca.estoque)
            ) {

                setErro(
                    `Estoque insuficiente. Disponível: ${peca.estoque}.`
                );

                return;

            }


            setAdicionandoPeca(true);


            // =============================================
            // CADASTRAR ITEM NA OS
            // =============================================

            await apiRequest(
                "/itens-os",
                {
                    method: "POST",

                    body: JSON.stringify({

                        id_os:
                            Number(id),

                        id_peca:
                            Number(
                                peca.id_peca
                            ),

                        quantidade:
                            quantidade,

                        valor_unitario:
                            Number(
                                peca.preco_unitario
                            )

                    })
                }
            );


            // =============================================
            // RECALCULAR TOTAL DA OS
            // =============================================

            await apiRequest(
                `/ordens-servico/${id}/recalcular-total`,
                {
                    method: "PATCH"
                }
            );


            // =============================================
            // LIMPAR FORMULÁRIO
            // =============================================

            setPecaSelecionada("");

            setQuantidadePeca(1);


            setMensagem(
                "Peça adicionada à ordem de serviço com sucesso."
            );


            // =============================================
            // ATUALIZAR TELA
            // =============================================

            await carregarDetalhes();


        } catch (error) {

            console.log(error);

            setErro(
                error.message
            );

        } finally {

            setAdicionandoPeca(false);

        }

    }


    // =====================================================
    // CARREGANDO
    // =====================================================

    if (carregando && !ordem) {

        return (

            <div className={styles.carregando}>
                Carregando ordem de serviço...
            </div>

        );

    }


    // =====================================================
    // ERRO SEM OS
    // =====================================================

    if (erro && !ordem) {

        return (

            <div className={styles.carregando}>

                <p>
                    {erro}
                </p>


                <button
                    onClick={() =>
                        navigate("/os")
                    }
                >
                    Voltar
                </button>

            </div>

        );

    }

    const dadosPecaSelecionada = pecas.find(

        (peca) =>
            Number(peca.id_peca) ===
            Number(pecaSelecionada)

    );


    const totalPeca =

        Number(
            dadosPecaSelecionada?.preco_unitario || 0
        )

        *

        Number(
            quantidadePeca || 0
        );

    async function removerItem(idItem) {

        const confirmar = window.confirm(
            "Deseja realmente excluir este item da OS?"
        );

        if (!confirmar) {
            return;
        }


        try {

            setErro("");
            setMensagem("");


            await apiRequest(
                `/itens-os/${idItem}`,
                {
                    method: "DELETE"
                }
            );


            // Recalcula o valor total da OS
            await apiRequest(
                `/ordens-servico/${id}/recalcular-total`,
                {
                    method: "PATCH"
                }
            );


            setMensagem(
                "Item excluído com sucesso."
            );


            // Atualiza os itens da OS
            await carregarDetalhes();


            // Atualiza estoque disponível
            await carregarPecas();


        } catch (error) {

            console.log(error);

            setErro(
                error.message
            );

        }

    }

    const dadosProblemaSelecionado =
        ordem?.problemas?.find(
            (problema) =>
                Number(problema.id_problema) ===
                Number(problemaSelecionado)
        );


    const servicosDoProblema =
        dadosProblemaSelecionado?.servicos || [];


    const dadosServicoSelecionado =
        servicosDoProblema.find(
            (servico) =>
                Number(servico.id_servico) ===
                Number(servicoSelecionado)
        );

    

    // =====================================================
    // ADICIONAR SERVIÇO À OS
    // =====================================================

    async function adicionarServico() {

            try {

                setErro("");
                setMensagem("");


                // =====================================================
                // VALIDAR PROBLEMA
                // =====================================================

                if (!problemaSelecionado) {

                    setErro(
                        "Selecione um problema."
                    );

                    return;

                }


                // =====================================================
                // VALIDAR SERVIÇO
                // =====================================================

                if (!servicoSelecionado) {

                    setErro(
                        "Selecione um serviço."
                    );

                    return;

                }


                if (!dadosServicoSelecionado) {

                    setErro(
                        "Serviço não encontrado."
                    );

                    return;

                }


                setAdicionandoServico(true);


                // =====================================================
                // ADICIONAR AO ITEM_OS
                // =====================================================

                await apiRequest(
                    "/itens-os",
                    {
                        method: "POST",

                        body: JSON.stringify({

                            id_os:
                                Number(id),

                            id_servico:
                                Number(
                                    dadosServicoSelecionado.id_servico
                                ),

                            quantidade: 1,

                            valor_unitario:
                                Number(
                                    dadosServicoSelecionado.valor_mao_obra
                                )

                        })
                    }
                );


                // =====================================================
                // RECALCULAR TOTAL
                // =====================================================

                await apiRequest(
                    `/ordens-servico/${id}/recalcular-total`,
                    {
                        method: "PATCH"
                    }
                );


                // =====================================================
                // LIMPAR CAMPOS
                // =====================================================

                setProblemaSelecionado("");

                setServicoSelecionado("");


                setMensagem(
                    "Serviço adicionado à ordem de serviço com sucesso."
                );


                // Atualiza toda a OS
                await carregarDetalhes();


            } catch (error) {

                console.log(error);

                setErro(
                    error.message
                );

            } finally {

                setAdicionandoServico(false);

            }

        }

        async function excluirProblema(idProblema) {

            const confirmar = window.confirm(
                "Deseja realmente excluir este problema e os serviços relacionados?"
            );

            if (!confirmar) {
                return;
            }


            try {

                setErro("");
                setMensagem("");


                await apiRequest(
                    `/problemas/${idProblema}`,
                    {
                        method: "DELETE"
                    }
                );


                // Recalcular valor da OS depois da exclusão
                await apiRequest(
                    `/ordens-servico/${id}/recalcular-total`,
                    {
                        method: "PATCH"
                    }
                );


                setMensagem(
                    "Problema excluído com sucesso."
                );


                // Atualizar a tela
                await carregarDetalhes();


            } catch (error) {

                console.log(error);

                setErro(
                    error.message
                );

            }

        }

        async function adicionarProblema() {

            try {

                setErro("");
                setMensagem("");


                if (!descricaoProblema.trim()) {

                    setErro(
                        "Digite a descrição do problema."
                    );

                    return;

                }


                setCadastrandoProblema(true);


                const resposta = await apiRequest(
                    "/problemas",
                    {
                        method: "POST",

                        body: JSON.stringify({

                            id_os: Number(id),

                            descricao_prob:
                                descricaoProblema.trim(),

                            prioridade:
                                prioridadeProblema,

                            status: "Aberto"

                        })
                    }
                );


                // Seleciona automaticamente o problema criado
                if (resposta.dados?.id_problema) {

                    setProblemaSelecionado(
                        String(
                            resposta.dados.id_problema
                        )
                    );

                }


                setDescricaoProblema("");

                setPrioridadeProblema("Média");


                setMensagem(
                    "Problema adicionado com sucesso."
                );


                await carregarDetalhes();


            } catch (error) {

                console.log(error);

                setErro(error.message);

            } finally {

                setCadastrandoProblema(false);

            }

        }


    return (

        <div className={styles.container}>


            {/* ============================================= */}
            {/* NAVBAR */}
            {/* ============================================= */}

            <div className={styles.barra_Principal}>


                <div className={styles.barra_Logo}>


                    <button
                        className={styles.barra_menu_btn}
                        onClick={() =>
                            navigate("/admin")
                        }
                        title="Voltar ao painel"
                    >

                        <span className={styles.barra_linha}></span>
                        <span className={styles.barra_linha}></span>
                        <span className={styles.barra_linha}></span>

                    </button>


                    <img
                        src={logo}
                        className={styles.barra_Imagem}
                        alt="Logo"
                    />


                </div>


                <div className={styles.barra_direita}>


                    <button
                        className={styles.barra_sino}
                        aria-label="Notificações"
                    >

                        <img
                            src={notificacao}
                            alt="Notificações"
                        />

                    </button>


                    <div className={styles.barra_perfil}>


                        <div className={styles.barra_perfil_icone}>

                            <svg
                                width="22"
                                height="22"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="white"
                                strokeWidth={1.8}
                            >

                                <circle
                                    cx="12"
                                    cy="8"
                                    r="4"
                                />

                                <path
                                    strokeLinecap="round"
                                    d="M4 20c0-4 3.582-7 8-7s8 3 8 7"
                                />

                            </svg>

                        </div>


                        <div className={styles.barra_perfil_info}>

                            <span className={styles.barra_perfil_nome}>

                                {
                                    usuarioLogado.usuario ||
                                    "Admin"
                                }

                            </span>


                            <span className={styles.barra_perfil_cargo}>

                                {
                                    usuarioLogado.tipo_usuario ===
                                    "administrador"
                                        ? "Administrador"
                                        : "Funcionário"
                                }

                            </span>

                        </div>


                    </div>


                </div>


            </div>


            {/* ============================================= */}
            {/* CONTEÚDO */}
            {/* ============================================= */}

            <main className={styles.conteudo}>


                <div className={styles.painel}>


                    {/* TOPO */}

                    <div className={styles.topo}>


                        <div className={styles.topo_esquerda}>


                            <button
                                className={styles.botao_voltar}
                                onClick={() =>
                                    navigate("/os")
                                }
                            >
                                ←
                            </button>


                            <div>

                                <span className={styles.subtitulo}>
                                    DETALHES DA ORDEM DE SERVIÇO
                                </span>


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

                            </div>


                        </div>


                        <span
                            className={
                                ordem.status === "Finalizada"
                                    ? styles.status_finalizada
                                    : ordem.status === "Cancelada"
                                    ? styles.status_cancelada
                                    : styles.status_andamento
                            }
                        >

                            {ordem.status}

                        </span>


                    </div>


                    {/* MENSAGENS */}

                    {
                        mensagem && (

                            <div className={styles.mensagem_sucesso}>
                                {mensagem}
                            </div>

                        )
                    }


                    {
                        erro && (

                            <div className={styles.mensagem_erro}>
                                {erro}
                            </div>

                        )
                    }


                    {/* ============================================= */}
                    {/* CARDS PRINCIPAIS */}
                    {/* ============================================= */}

                    <div className={styles.cards}>


                        {/* CLIENTE */}

                        <div className={styles.card}>


                            <div className={styles.card_titulo}>

                                <span className={styles.card_icone}>
                                    👤
                                </span>

                                <h2>
                                    Cliente
                                </h2>

                            </div>


                            <div className={styles.linha_info}>

                                <span>
                                    Nome
                                </span>

                                <strong>
                                    {ordem.cliente?.nome_cliente}
                                </strong>

                            </div>


                            <div className={styles.linha_info}>

                                <span>
                                    CPF
                                </span>

                                <strong>
                                    {ordem.cliente?.cpf}
                                </strong>

                            </div>


                            <div className={styles.linha_info}>

                                <span>
                                    Telefone
                                </span>

                                <strong>
                                    {ordem.cliente?.telefone}
                                </strong>

                            </div>


                            <div className={styles.linha_info}>

                                <span>
                                    Email
                                </span>

                                <strong>
                                    {
                                        ordem.cliente?.email ||
                                        "-"
                                    }
                                </strong>

                            </div>


                        </div>


                        {/* VEÍCULO */}

                        <div className={styles.card}>


                            <div className={styles.card_titulo}>

                                <span className={styles.card_icone}>
                                    🚗
                                </span>

                                <h2>
                                    Veículo
                                </h2>

                            </div>


                            <div className={styles.linha_info}>

                                <span>
                                    Veículo
                                </span>

                                <strong>

                                    {
                                        ordem.veiculo?.marca
                                    }

                                    {" "}

                                    {
                                        ordem.veiculo?.modelo
                                    }

                                </strong>

                            </div>


                            <div className={styles.linha_info}>

                                <span>
                                    Placa
                                </span>

                                <strong className={styles.placa}>

                                    {
                                        ordem.veiculo?.placa
                                    }

                                </strong>

                            </div>


                            <div className={styles.linha_info}>

                                <span>
                                    Ano
                                </span>

                                <strong>
                                    {ordem.veiculo?.ano}
                                </strong>

                            </div>


                            <div className={styles.linha_info}>

                                <span>
                                    Quilometragem
                                </span>

                                <strong>

                                    {
                                        ordem.veiculo?.quilometragem
                                    } km

                                </strong>

                            </div>


                        </div>


                        {/* OS */}

                        <div className={styles.card}>


                            <div className={styles.card_titulo}>

                                <span className={styles.card_icone}>
                                    📋
                                </span>

                                <h2>
                                    Ordem de Serviço
                                </h2>

                            </div>


                            <div className={styles.linha_info}>

                                <span>
                                    Entrada
                                </span>

                                <strong>

                                    {
                                        formatarData(
                                            ordem.data_entrada
                                        )
                                    }

                                </strong>

                            </div>


                            <div className={styles.linha_info}>

                                <span>
                                    Previsão
                                </span>

                                <strong>

                                    {
                                        formatarData(
                                            ordem.data_previsao
                                        )
                                    }

                                </strong>

                            </div>


                            <div className={styles.linha_info}>

                                <span>
                                    Entrega
                                </span>

                                <strong>

                                    {
                                        formatarData(
                                            ordem.data_entrega
                                        )
                                    }

                                </strong>

                            </div>


                            <div className={styles.linha_info}>

                                <span>
                                    Valor atual
                                </span>

                                <strong className={styles.valor}>

                                    {
                                        formatarValor(
                                            ordem.valor_total
                                        )
                                    }

                                </strong>

                            </div>


                        </div>


                    </div>


                    {/* ============================================= */}
                    {/* GERENCIAR OS */}
                    {/* ============================================= */}

                    <section className={styles.secao}>


                        <div className={styles.secao_titulo}>

                            <div>

                                <span className={styles.secao_subtitulo}>
                                    CONTROLE
                                </span>

                                <h2>
                                    Gerenciar Ordem de Serviço
                                </h2>

                            </div>

                        </div>


                        <div className={styles.gerenciamento}>


                            {/* STATUS */}

                            <div className={styles.gerenciar_card}>


                                <h3>
                                    Alterar Status
                                </h3>


                                <p>
                                    Status atual:
                                    <strong>
                                        {" "}
                                        {ordem.status}
                                    </strong>
                                </p>


                                <select
                                    value={statusEditavel}
                                    onChange={(event) =>
                                        setStatusEditavel(
                                            event.target.value
                                        )
                                    }
                                >

                                    <option value="Aberta">
                                        Aberta
                                    </option>

                                    <option value="Em andamento">
                                        Em andamento
                                    </option>

                                    <option value="Finalizada">
                                        Finalizada
                                    </option>

                                    <option value="Cancelada">
                                        Cancelada
                                    </option>

                                </select>


                                <button
                                    className={styles.botao_salvar}
                                    onClick={atualizarStatus}
                                    disabled={salvandoStatus}
                                >

                                    {
                                        salvandoStatus
                                            ? "SALVANDO..."
                                            : "ATUALIZAR STATUS"
                                    }

                                </button>


                            </div>


                            {/* PREÇO */}

                            <div className={styles.gerenciar_card}>


                                <h3>
                                    Alterar Valor
                                </h3>


                                <p>
                                    Valor atual:

                                    <strong className={styles.valor_atual}>

                                        {" "}

                                        {
                                            formatarValor(
                                                ordem.valor_total
                                            )
                                        }

                                    </strong>

                                </p>


                                <div className={styles.input_valor}>

                                    <span>
                                        R$
                                    </span>


                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={valorEditavel}
                                        onChange={(event) =>
                                            setValorEditavel(
                                                event.target.value
                                            )
                                        }
                                    />

                                </div>


                                <div className={styles.botoes_valor}>


                                    <button
                                        className={styles.botao_salvar}
                                        onClick={atualizarValor}
                                        disabled={salvandoValor}
                                    >

                                        {
                                            salvandoValor
                                                ? "SALVANDO..."
                                                : "ATUALIZAR VALOR"
                                        }

                                    </button>


                                    <button
                                        className={styles.botao_secundario}
                                        onClick={recalcularValor}
                                    >

                                        RECALCULAR PELOS ITENS

                                    </button>


                                </div>


                            </div>


                        </div>


                    </section>


                    {/* ============================================= */}
                    {/* OBSERVAÇÕES */}
                    {/* ============================================= */}

                    <section className={styles.secao}>


                        <div className={styles.secao_titulo}>

                            <div>

                                <span className={styles.secao_subtitulo}>
                                    INFORMAÇÕES
                                </span>

                                <h2>
                                    Observações
                                </h2>

                            </div>

                        </div>


                        <div className={styles.observacoes}>

                            {
                                ordem.observacoes ||
                                "Nenhuma observação cadastrada."
                            }

                        </div>


                    </section>


                    {/* ============================================= */}
                    {/* PROBLEMAS */}
                    {/* ============================================= */}

                    <section className={styles.secao}>


                        <div className={styles.secao_titulo}>

                            <div>

                                <span className={styles.secao_subtitulo}>
                                    MANUTENÇÃO
                                </span>

                                <h2>
                                    Problemas e Serviços
                                </h2>

                            </div>

                        </div>

                        
                        <div className={styles.manutencao_acoes}>

                            {/* ====================================== */}
                            {/* NOVO PROBLEMA */}
                            {/* ====================================== */}

                            <div className={styles.acao_compacta}>

                                <div className={styles.acao_titulo}>

                                    <span>
                                        +
                                    </span>

                                    <strong>
                                        Novo problema
                                    </strong>

                                </div>


                                <div className={styles.problema_compacto}>


                                    <input
                                        type="text"
                                        placeholder="Descreva o problema"
                                        value={descricaoProblema}
                                        onChange={(event) =>
                                            setDescricaoProblema(
                                                event.target.value
                                            )
                                        }
                                    />


                                    <select
                                        value={prioridadeProblema}
                                        onChange={(event) =>
                                            setPrioridadeProblema(
                                                event.target.value
                                            )
                                        }
                                    >

                                        <option value="Baixa">
                                            Baixa
                                        </option>

                                        <option value="Média">
                                            Média
                                        </option>

                                        <option value="Alta">
                                            Alta
                                        </option>

                                    </select>


                                    <button
                                        type="button"
                                        onClick={adicionarProblema}
                                        disabled={cadastrandoProblema}
                                    >

                                        {
                                            cadastrandoProblema
                                                ? "ADICIONANDO..."
                                                : "ADICIONAR"
                                        }

                                    </button>


                                </div>

                            </div>


                            {/* ====================================== */}
                            {/* NOVO SERVIÇO */}
                            {/* ====================================== */}

                            <div className={styles.acao_compacta}>

                                <div className={styles.acao_titulo}>

                                    <span>
                                        +
                                    </span>

                                    <strong>
                                        Novo serviço
                                    </strong>

                                </div>


                                <div className={styles.servico_compacto}>


                                    {/* PROBLEMA */}

                                    <select
                                        value={problemaSelecionado}
                                        onChange={(event) =>
                                            setProblemaSelecionado(
                                                event.target.value
                                            )
                                        }
                                    >

                                        <option value="">
                                            Problema
                                        </option>


                                        {
                                            ordem.problemas?.map(
                                                (problema) => (

                                                    <option
                                                        key={
                                                            problema.id_problema
                                                        }
                                                        value={
                                                            problema.id_problema
                                                        }
                                                    >

                                                        {
                                                            problema.descricao
                                                        }

                                                    </option>

                                                )
                                            )
                                        }

                                    </select>


                                    {/* SERVIÇO */}

                                    <input
                                        type="text"
                                        placeholder="Serviço realizado"
                                        value={descricaoServico}
                                        onChange={(event) =>
                                            setDescricaoServico(
                                                event.target.value
                                            )
                                        }
                                    />


                                    {/* TEMPO */}

                                    <input
                                        type="number"
                                        min="1"
                                        placeholder="Minutos"
                                        value={tempoServico}
                                        onChange={(event) =>
                                            setTempoServico(
                                                event.target.value
                                            )
                                        }
                                    />


                                    {/* VALOR */}

                                    <div className={styles.valor_compacto}>

                                        <span>
                                            R$
                                        </span>

                                        <input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            placeholder="Valor"
                                            value={valorServico}
                                            onChange={(event) =>
                                                setValorServico(
                                                    event.target.value
                                                )
                                            }
                                        />

                                    </div>


                                    <button
                                        type="button"
                                        onClick={
                                            cadastrarEAdicionarServico
                                        }
                                        disabled={
                                            cadastrandoServico
                                        }
                                    >

                                        {
                                            cadastrandoServico
                                                ? "SALVANDO..."
                                                : "ADICIONAR"
                                        }

                                    </button>


                                </div>

                            </div>


                        </div>
                        


                        {
                            ordem.problemas?.length === 0
                                ? (

                                    <div className={styles.vazio}>
                                        Nenhum problema cadastrado.
                                    </div>

                                )
                                : (

                                    ordem.problemas?.map(
                                        (problema) => (

                                            <div
                                                className={styles.problema}
                                                key={
                                                    problema.id_problema
                                                }
                                            >


                                                <div className={styles.problema_topo}>


                                                    <div>

                                                        <span className={styles.problema_id}>

                                                            PROBLEMA #
                                                            {
                                                                problema.id_problema
                                                            }

                                                        </span>


                                                        <h3>
                                                            {
                                                                problema.descricao
                                                            }
                                                        </h3>

                                                    </div>


                                                    <div className={styles.badges}>

                                                        <span className={styles.badge_prioridade}>
                                                            {problema.prioridade}
                                                        </span>


                                                        <span className={styles.badge_status}>
                                                            {problema.status}
                                                        </span>


                                                        <button
                                                            type="button"
                                                            className={styles.botao_excluir_problema}
                                                            onClick={() =>
                                                                excluirProblema(
                                                                    problema.id_problema
                                                                )
                                                            }
                                                        >
                                                            EXCLUIR
                                                        </button>

                                                    </div>


                                                </div>


                                                {/* SERVIÇOS */}

                                                <div className={styles.servicos}>


                                                    <h4>
                                                        Serviços
                                                    </h4>


                                                    {
                                                        problema.servicos?.length === 0
                                                            ? (

                                                                <p>
                                                                    Nenhum serviço cadastrado.
                                                                </p>

                                                            )
                                                            : (

                                                                problema.servicos?.map(
                                                                    (servico) => (

                                                                        <div
                                                                            className={styles.servico}
                                                                            key={
                                                                                servico.id_servico
                                                                            }
                                                                        >

                                                                            <span>
                                                                                {
                                                                                    servico.descricao
                                                                                }
                                                                            </span>


                                                                            <span>
                                                                                {
                                                                                    servico.tempo_estimado
                                                                                } min
                                                                            </span>


                                                                            <strong>
                                                                                {
                                                                                    formatarValor(
                                                                                        servico.valor_mao_obra
                                                                                    )
                                                                                }
                                                                            </strong>

                                                                        </div>

                                                                    )
                                                                )

                                                            )
                                                    }


                                                </div>


                                                {/* EXECUÇÃO */}

                                                {
                                                    problema.execucao && (

                                                        <div className={styles.execucao}>

                                                            <h4>
                                                                Execução
                                                            </h4>


                                                            <span>

                                                                Funcionário:

                                                                <strong>

                                                                    {" "}

                                                                    {
                                                                        problema
                                                                            .execucao
                                                                            .funcionario
                                                                            ?.nome ||
                                                                        "-"
                                                                    }

                                                                </strong>

                                                            </span>


                                                            <span>

                                                                Status:

                                                                <strong>

                                                                    {" "}

                                                                    {
                                                                        problema
                                                                            .execucao
                                                                            .status
                                                                    }

                                                                </strong>

                                                            </span>

                                                        </div>

                                                    )
                                                }


                                            </div>

                                        )
                                    )

                                )
                        }


                    </section>


                    {/* ============================================= */}
                    {/* ITENS */}
                    {/* ============================================= */}

                    <section className={styles.secao}>


                        <div className={styles.secao_titulo}>

                            <div>

                                <span className={styles.secao_subtitulo}>
                                    VALORES
                                </span>

                                <h2>
                                    Itens da OS
                                </h2>

                            </div>

                        </div>

                        {/* ============================================= */}
                        {/* ADICIONAR PEÇA */}
                        {/* ============================================= */}

                        <div className={styles.adicionar_peca}>


                            <div className={styles.adicionar_peca_topo}>

                                <div>

                                    <span className={styles.secao_subtitulo}>
                                        NOVO ITEM
                                    </span>

                                    <h3>
                                        Adicionar Peça
                                    </h3>

                                </div>

                            </div>


                            <div className={styles.peca_form}>


                                {/* PEÇA */}

                                <div className={styles.campo_peca}>

                                    <label>
                                        Peça
                                    </label>

                                    <select
                                        value={pecaSelecionada}
                                        onChange={(event) =>
                                            setPecaSelecionada(
                                                event.target.value
                                            )
                                        }
                                    >

                                        <option value="">
                                            Selecione uma peça
                                        </option>


                                        {
                                            pecas.map(
                                                (peca) => (

                                                    <option
                                                        key={peca.id_peca}
                                                        value={peca.id_peca}
                                                    >

                                                        {peca.nome_peca}

                                                    </option>

                                                )
                                            )
                                        }

                                    </select>

                                </div>


                                {/* QUANTIDADE */}

                                <div className={styles.campo_peca}>

                                    <label>
                                        Quantidade
                                    </label>

                                    <input
                                        type="number"
                                        min="1"
                                        value={quantidadePeca}
                                        onChange={(event) =>
                                            setQuantidadePeca(
                                                event.target.value
                                            )
                                        }
                                    />

                                </div>


                                {/* ESTOQUE */}

                                <div className={styles.peca_informacao}>

                                    <span>
                                        Estoque disponível
                                    </span>

                                    <strong>

                                        {
                                            dadosPecaSelecionada
                                                ? dadosPecaSelecionada.estoque
                                                : "-"
                                        }

                                    </strong>

                                </div>


                                {/* VALOR UNITÁRIO */}

                                <div className={styles.peca_informacao}>

                                    <span>
                                        Valor unitário
                                    </span>

                                    <strong>

                                        {
                                            dadosPecaSelecionada
                                                ? formatarValor(
                                                    dadosPecaSelecionada
                                                        .preco_unitario
                                                )
                                                : "-"
                                        }

                                    </strong>

                                </div>


                            </div>


                            {/* RODAPÉ */}

                            <div className={styles.peca_rodape}>


                                <div className={styles.peca_total}>

                                    <span>
                                        Total
                                    </span>

                                    <strong>

                                        {
                                            formatarValor(
                                                totalPeca
                                            )
                                        }

                                    </strong>

                                </div>


                                <button
                                    type="button"
                                    className={styles.botao_adicionar_peca}
                                    onClick={adicionarPeca}
                                    disabled={adicionandoPeca}
                                >

                                    {
                                        adicionandoPeca
                                            ? "ADICIONANDO..."
                                            : "+ ADICIONAR PEÇA"
                                    }

                                </button>


                            </div>


                        </div>


                        <div className={styles.tabela_wrapper}>


                            <table>


                                <thead>

                                    <tr>

                                        <th>
                                            Item
                                        </th>

                                        <th>
                                            Quantidade
                                        </th>

                                        <th>
                                            Valor unitário
                                        </th>

                                        <th>
                                            Total
                                        </th>

                                        <th>
                                            Ações
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>


                                    {
                                        ordem.itens?.length === 0
                                            ? (

                                                <tr>

                                                    <td colSpan="4">
                                                        Nenhum item cadastrado.
                                                    </td>

                                                </tr>

                                            )
                                            : (

                                                ordem.itens?.map(
                                                    (item) => (

                                                        <tr
                                                            key={
                                                                item.id_item
                                                            }
                                                        >

                                                            <td>

                                                                {
                                                                    item.peca
                                                                        ?.nome ||

                                                                    item.servico
                                                                        ?.descricao ||

                                                                    "-"
                                                                }

                                                            </td>


                                                            <td>
                                                                {
                                                                    item.quantidade
                                                                }
                                                            </td>


                                                            <td>

                                                                {
                                                                    formatarValor(
                                                                        item.valor_unitario
                                                                    )
                                                                }

                                                            </td>


                                                            <td className={styles.total_item}>

                                                                {
                                                                    formatarValor(
                                                                        item.valor_total
                                                                    )
                                                                }

                                                            </td>

                                                            <td>

                                                                <button
                                                                    type="button"
                                                                    className={styles.botao_excluir_item}
                                                                    onClick={() =>
                                                                        removerItem(item.id_item)
                                                                    }
                                                                >
                                                                    EXCLUIR
                                                                </button>

                                                            </td>


                                                        </tr>

                                                    )
                                                )

                                            )
                                    }


                                </tbody>


                            </table>


                        </div>


                    </section>


                    {/* ============================================= */}
                    {/* PAGAMENTOS */}
                    {/* ============================================= */}

                    <section className={styles.secao}>


                        <div className={styles.secao_titulo}>

                            <div>

                                <span className={styles.secao_subtitulo}>
                                    FINANCEIRO
                                </span>

                                <h2>
                                    Pagamentos
                                </h2>

                            </div>

                        </div>


                        {
                            ordem.pagamentos?.length === 0
                                ? (

                                    <div className={styles.vazio}>
                                        Nenhum pagamento cadastrado.
                                    </div>

                                )
                                : (

                                    <div className={styles.pagamentos}>

                                        {
                                            ordem.pagamentos?.map(
                                                (pagamento) => (

                                                    <div
                                                        className={styles.pagamento}
                                                        key={
                                                            pagamento.id_pagamento
                                                        }
                                                    >

                                                        <div>

                                                            <span>
                                                                Forma
                                                            </span>

                                                            <strong>
                                                                {
                                                                    pagamento.forma_pagamento
                                                                }
                                                            </strong>

                                                        </div>


                                                        <div>

                                                            <span>
                                                                Valor
                                                            </span>

                                                            <strong>
                                                                {
                                                                    formatarValor(
                                                                        pagamento.valor
                                                                    )
                                                                }
                                                            </strong>

                                                        </div>


                                                        <div>

                                                            <span>
                                                                Status
                                                            </span>

                                                            <strong>
                                                                {
                                                                    pagamento.status
                                                                }
                                                            </strong>

                                                        </div>


                                                        <div>

                                                            <span>
                                                                Data
                                                            </span>

                                                            <strong>

                                                                {
                                                                    formatarData(
                                                                        pagamento.data_pagamento
                                                                    )
                                                                }

                                                            </strong>

                                                        </div>


                                                    </div>

                                                )
                                            )
                                        }

                                    </div>

                                )
                        }


                    </section>


                </div>


            </main>


        </div>

    );

}


export default DetalhesOs;