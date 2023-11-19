import { Client } from "stompjs";
import { Dispatch, SetStateAction, useRef } from "react";
import { Publicacao } from "../../model/Publicacao";
import { Usuario } from "../../model/Usuario";
import { Comentario } from "../../model/Comentario";

interface SendProps {
    webSock: React.MutableRefObject<Client | null>, 
    publicacao: Publicacao, 
    message: string, 
    setMessage: Dispatch<SetStateAction<string>>
}
export const sendComentario = (props: SendProps) => {
    if (props.webSock.current != null && props.webSock?.current.connected) {
        const messageJSON = {
            comentario: props.message,
            codigoAcesso: 12345,
            idPublicacao: 1,
            idUsuario: 1
        };
        props.webSock.current?.send("/app/comentarios.sendMessage", {}, JSON.stringify(messageJSON));
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
export const updateComentario = (props: UpdateComentarioProps) => {
    const comentarioRecebido = JSON.parse(props.message.body);
    const usuario = Usuario.builder()
        .withApelido("LeviJunior")
        .withId(1)
        .build();

    const novoComentario = Comentario.builder()
        .withComentario(comentarioRecebido.comentario)
        .withId(props.id)
        .withUsuario(usuario)
        .build();

        props.setComentarios((prevComentarios) => [...prevComentarios, novoComentario]);
}