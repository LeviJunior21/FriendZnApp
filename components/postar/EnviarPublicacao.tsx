import { myInfo } from "../../data/myId";
import { Categoria, PublicacaoUsuario } from "../../utils/interfaces";

export const enviarPublicacao = async(props: PublicacaoUsuario) => {
    if (props.categoria === Categoria.selecionar) {
        alert("Selecione uma categoria!");
    } else {
        const myInfos = await myInfo();
        console.log(myInfos)
        
        const url: string = "http://10.0.0.181:8080/v1/publicacoes/publicacao?id=" + myInfos.myID;
        const dados = {
            publicacao: props.desabafo, 
            date: new Date().toISOString(),
            codigoAcesso: myInfos.myIDAuth,
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
