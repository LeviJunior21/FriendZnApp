import { Categoria, PublicacaoUsuario } from "../../utils/interfaces";

export const enviarPublicacao = async(props: PublicacaoUsuario) => {
    if (props.categoria === Categoria.selecionar) {
        alert("Selecione uma categoria!");
    } else {
        const url: string = "http://10.0.0.181:8080/v1/publicacoes/publicacao?id=1";
        const dados = {
            publicacao: props.desabafo, 
            date: new Date().toISOString(),
            codigoAcesso: 12345,
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
