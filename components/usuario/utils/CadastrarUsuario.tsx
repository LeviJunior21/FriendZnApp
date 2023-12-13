import { dadosIniciaisUsuario } from "../../../data/constants";
import { LoginCadastro, LoginCadastroReturns } from "../cadastro/Interface";

export const cadastrarUsuario = async(dadosUsuario: LoginCadastro): Promise<LoginCadastroReturns> => {
    let responseJSON: LoginCadastroReturns = dadosIniciaisUsuario;

    const url: string = "http://10.0.0.181:8080/v1/usuarios";
    try {    
        const responseFetch = await fetch(url, {
            method: "POST", 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosUsuario)
        });

        if (responseFetch.ok) {
            responseJSON = await responseFetch.json();
            console.log(responseJSON)
        }
    } catch {
        throw new Error("Não foi porrível cadastrar o usuário.");
    }

    return responseJSON;
}
