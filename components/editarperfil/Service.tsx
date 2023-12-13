export const gravarDadosEditados = async(apelidoDescricaoCodidoAcesso: any, id: number): Promise<boolean> => {
    let result: boolean = false;

    try {
        const url: string = "http://10.0.0.181:8080/v1/usuarios/alterar-apelido-descricao/usuario?id=" + id;
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
