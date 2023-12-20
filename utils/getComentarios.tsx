import { Usuario } from "../model/Usuario";
import { Comentario } from "../model/Comentario";
import { ComentarioInterface, GetComentariosProps } from "./interfaces";
import { getUsuario } from "./getUsuario";
import { uri_principal } from "../data/constants";

export const getComentarios = async(props: GetComentariosProps) => {
    try {
        const response = await fetch(`${uri_principal}/v1/comentarios/publicacao/${props.publicacao.getId()}`);

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            const comentarios = await listarComentarios(data);
            props.setComentarios(comentarios);
            props.setLoading(false);
        } else {
            console.error('Ocorreu um erro na requisição HTTP');
        }
    } catch (error: any) {
        console.error('Ocorreu ao buscar os dados:', error);
    }
}

export const listarComentarios = async(data: ComentarioInterface[]): Promise<Comentario[]> => {
    const comentarios: Comentario[] = await Promise.all(data.map(async (item: ComentarioInterface) => {
        const usuarioData = await getUsuario(item.usuarioId);
        const usuario: Usuario = Usuario.builder()
            .withApelido(usuarioData.getApelido())
            .withId(item.usuarioId)
            .withEmoji(usuarioData.getEmoji())
            .build();

        return Comentario.builder()
            .withComentario(item.comentario)
            .withId(item.id)
            .withTimestamp(new Date(item.timestamp))
            .withUsuario(usuario)
            .build();
    }));

    return comentarios;
}
