import { LoginType } from "./LoginType";


export const cadastrarUsuario = async(dados: any): Promise<any> => {

    const url: string = "http://10.0.0.181:8080/v1/usuarios";
    const dadosUsuario = {
        apelido: dados.apelido,
        email: dados.dadosLogin.email?dados.dadosLogin.email : "email",
        codigoAcesso: dados.dadosLogin.id,
        idAuth: dados.dadosLogin.id,
        loginType: LoginType.GitHub
    }
    
    const responseFetch = await fetch(url, {
        method: "POST", 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosUsuario)
    });

    const responseJSON = responseFetch.json();
    return responseJSON;
}
