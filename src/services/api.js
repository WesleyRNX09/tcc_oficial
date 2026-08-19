const API_URL = 'http://localhost:3333';


async function apiRequest(endpoint, options = {}) {

    const token = localStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };


    if (token) {

        headers.Authorization = `Bearer ${token}`;

    }


    const response = await fetch(
        `${API_URL}${endpoint}`,
        {
            ...options,
            headers
        }
    );


    let dados;

    try {

        dados = await response.json();

    } catch {

        dados = null;

    }


    if (!response.ok) {

        const erro = new Error(
            dados?.mensagem ||
            'Erro na requisição.'
        );

        erro.status = response.status;
        erro.dados = dados;

        throw erro;

    }


    return dados;

}


export default apiRequest;