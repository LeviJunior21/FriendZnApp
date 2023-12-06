export const cadastrarUsuario = async(dados: any): Promise<boolean> => {
   let response: boolean = false;

    const url: string = "http://10.0.0.181:8080/v1/usuarios";
    const dadosUsuario = {
        apelido: dados.apelido,
        email: dados.dadosLogin.email,
        codigoAcesso: dados.dadosLogin.id,
    }
    

    const responseFetch = await fetch(url, {
        method: "POST", 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosUsuario)
    });
    
    if (responseFetch.ok) {
        response = true;
    }

   return response;
}