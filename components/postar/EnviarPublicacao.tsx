import { uri_principal } from "../../data/constants";
import { Categoria, PublicacaoTipo, PublicacaoUsuario } from "../../utils/interfaces";

export const enviarPublicacao = async(props: PublicacaoUsuario) => {
    if (props.categoria === Categoria.selecionar) {
        alert("Selecione uma categoria!");
    } else if (props.tipo === PublicacaoTipo.enquete && props.enqueteOpcoes.filter((opcao) => opcao.trim().length > 0).length < 2) {
        alert("A enquete precisa de pelo menos 2 opções.");
    } else {
        try {
            const url: string = uri_principal + "/v1/publicacoes/publicacao?id=" + props.meusDados.id;
            const dados = {
                publicacao: props.desabafo.replace(/^\s+|\s+$/g, ''),
                date: new Date().toISOString(),
                codigoAcesso: props.meusDados.codigoAcesso,
                categoria: props.categoria,
                tipo: props.tipo,
                enqueteOpcoes: props.tipo === PublicacaoTipo.enquete ? props.enqueteOpcoes.map((opcao) => opcao.trim()).filter(Boolean).slice(0, 5) : []
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
