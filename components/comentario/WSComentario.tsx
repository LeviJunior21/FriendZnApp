import { Client } from "stompjs";
import { Dispatch, SetStateAction, useRef } from "react";
import { Publicacao } from "../../model/Publicacao";
import { Usuario } from "../../model/Usuario";
import { Comentario } from "../../model/Comentario";
import { getUsuario } from "../../utils/getUsuario";

interface SendProps {
    webSock: React.MutableRefObject<Client | null>, 
    publicacao: Publicacao, 
    message: string, 
    setMessage: Dispatch<SetStateAction<string>>
}
export const sendComentario = (props: SendProps) => {
    if (props.webSock.current != null && props.webSock?.current.connected) {
        const messageJSON = {
            idPublicacao: props.publicacao.getId(),
            comentario: props.message,
            timestamp: new Date(),
            codigoAcesso: 12345,
            idUsuario: 1
        };
        const subscribe: string = "/app/comentarios.sendMessage/" + props.publicacao.getId();
        props.webSock.current?.send(subscribe, {}, JSON.stringify(messageJSON));
        props.setMessage("");
        console.log("Enviado");
    } else {
        console.error("Erro: WebSocket não conectado");
    }
};

interface UpdateComentarioProps {
    id: number;
    message: any;
    setComentarios: Dispatch<SetStateAction<Comentario[]>>;
}
export const updateComentario = async(props: UpdateComentarioProps) => {
    try {
        const comentarioRecebido = JSON.parse(props.message.body);
        const usuario = await getUsuario(comentarioRecebido.usuarioId);

        const novoComentario = Comentario.builder()
        .withComentario(comentarioRecebido.comentario)
        .withId(randint(1,100))
        .withUsuario(usuario)
        .build();

        props.setComentarios((prevComentarios) => [...prevComentarios, novoComentario]);
        
    } catch(e) {

    }
}

function randint(min: number, max: number): number {
    // Math.floor é usado para arredondar para baixo, garantindo um número inteiro.
    return Math.floor(Math.random() * (max - min + 1) + min);
}
