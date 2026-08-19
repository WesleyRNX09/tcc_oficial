const API_URL = 'http://localhost:3333';


export async function fazerLogin(
    usuario,
    senha
) {

    const response = await fetch(
        `${API_URL}/login`,
        {
            method: 'POST',

            headers: {
                'Content-Type':
                    'application/json'
            },

            body: JSON.stringify({
                usuario,
                senha
            })
        }
    );


    const dados =
        await response.json();


    if (!response.ok) {

        throw new Error(
            dados.mensagem ||
            'Erro ao realizar login.'
        );

    }


    return dados;

}