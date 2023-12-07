import { Categoria, PublicacaoUsuario } from "../../utils/interfaces";

export const enviarPublicacao = async(props: PublicacaoUsuario) => {
    if (props.categoria === Categoria.selecionar) {
        alert("Selecione uma categoria!");
    } else {        
        const url: string = "http://10.0.0.181:8080/v1/publicacoes/publicacao?id=" + props.meusDados.idServer;
        const dados = {
            publicacao: props.desabafo.replace(/^\s+|\s+$/g, ''),
            date: new Date().toISOString(),
            codigoAcesso: props.meusDados.idAuth,
            categoria: props.categoria
        }
        
        fetch(url, {
            method: "POST", 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        props.navigation.navigation.navigate("Home");
    }
}
