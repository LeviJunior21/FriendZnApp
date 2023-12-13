import { Comentario } from "../../../model/Comentario";
import { getUsuario } from "../../../utils/getUsuario";
import { SendComentarioProps, UpdateComentarioProps } from "./Interface";

export const sendComentario = async(props: SendComentarioProps) => {
    if (props.webSock.current != null && props.webSock?.current.connected) {
        const messageJSON = {
            idPublicacao: props.publicacao.getId(),
            comentario: props.message.replace(/^\s+|\s+$/g, ''),
            timestamp: new Date(),
            codigoAcesso: props.meusDados.codigoAcesso,
            idUsuario: props.meusDados.id
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
            .withId(Number(comentarioRecebido.id))
            .withUsuario(usuario)
            .withTimestamp(new Date(comentarioRecebido.timestamp))
            .build();
        props.setComentarios((prevComentarios) => [...prevComentarios, novoComentario]);
        
    } catch(e: any) {}
}
