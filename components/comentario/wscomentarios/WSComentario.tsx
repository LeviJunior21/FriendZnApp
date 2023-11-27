import { myID } from "../../../data/myId";
import { Comentario } from "../../../model/Comentario";
import { getUsuario } from "../../../utils/getUsuario";
import { SendComentarioProps, UpdateComentarioProps } from "./Interface";

export const sendComentario = (props: SendComentarioProps) => {
    if (props.webSock.current != null && props.webSock?.current.connected) {
        const messageJSON = {
            idPublicacao: props.publicacao.getId(),
            comentario: props.message,
            timestamp: new Date(),
            codigoAcesso: 12345,
            idUsuario: myID
        };
        const subscribe: string = "/app/comentarios.sendMessage/" + props.publicacao.getId();
        props.webSock.current?.send(subscribe, {}, JSON.stringify(messageJSON));
        props.setMessage("");
        console.log("Enviado");
    }
};

export const updateComentario = async(props: UpdateComentarioProps) => {
    try {
        const comentarioRecebido = JSON.parse(props.message.body);
        const usuario = await getUsuario(comentarioRecebido.usuarioId);
        const novoComentario = Comentario.builder()
            .withComentario(comentarioRecebido.comentario)
            .withId(randint(1,1000))
            .withUsuario(usuario)
            .withTimestamp(new Date(comentarioRecebido.timestamp))
            .build();
        props.setComentarios((prevComentarios) => [...prevComentarios, novoComentario]);
        
    } catch(e: any) {}
}

function randint(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
