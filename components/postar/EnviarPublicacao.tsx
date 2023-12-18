import { uri_principal } from "../../data/constants";
import { Categoria, PublicacaoUsuario } from "../../utils/interfaces";

export const enviarPublicacao = async(props: PublicacaoUsuario) => {
    if (props.categoria === Categoria.selecionar) {
        alert("Selecione uma categoria!");
    } else {
        try {
            const url: string = uri_principal + "/v1/publicacoes/publicacao?id=" + props.meusDados.id;
            const dados = {
                publicacao: props.desabafo.replace(/^\s+|\s+$/g, ''),
                date: new Date().toISOString(),
                codigoAcesso: props.meusDados.codigoAcesso,
                categoria: props.categoria
            }
            console.log(dados, props.meusDados.id)
            fetch(url, {
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });

            props.navigation.navigation.navigate("Home");
        } catch {
            alert("Erro ao enviar a publicação.")
        }
    }
}
