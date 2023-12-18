import { uri_principal } from "../../data/constants";

export const gravarDadosEditados = async(apelidoDescricaoCodidoAcesso: any, id: number): Promise<boolean> => {
    let result: boolean = false;

    try {
        const url: string = uri_principal + "/v1/usuarios/alterar-apelido-descricao/usuario?id=" + id;
        fetch(url, {
            method: "PUT", 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(apelidoDescricaoCodidoAcesso)
        })
        result = true;
    } catch {
        result = false;
    }

    return result;
};
