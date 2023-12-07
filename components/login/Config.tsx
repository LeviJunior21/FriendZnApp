export const discovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint: 'https://github.com/settings/connections/applications/<CLIENT_ID>',
};

export const criarToken = async (code: string) => {
    const url: string = discovery.tokenEndpoint;
  
    const params = {
        client_id: '78d452f31d2506c3b031',
        client_secret: 'f348c65250ecb1922c7a6561ce4e7ce404b09747',
        code: code,
    };
  
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    });
  
    if (!response.ok) {
        throw new Error(`Erro na solicitação: ${response.status}`);
    }
  
    const responseData = await response.json();
    return responseData;
};

export const buscarInformacoesGitHub = async(code: string) => {
    const { token_type, scope, access_token } = await criarToken(code);

    const response = await fetch('https://api.github.com/user', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
        },
    })

    const data = response.json();
    return data;
}