import { Dispatch, SetStateAction } from "react";
import { Usuario } from "../model/Usuario";
import { Comentario } from "../model/Comentario";
import { ComentarioInterface, GetComentariosProps } from "./interfaces";

export const getComentarios = async(props: GetComentariosProps) => {
    try {
        const response = await fetch(`http://10.0.0.181:8080/v1/comentarios/publicacao/${props.publicacao.getId()}`);

        if (response.ok) {
            const data = await response.json();
            const comentarios = listarComentarios(data);
            props.setComentarios(comentarios);
            props.setLoading(false);
        } else {
            console.error('Ocorreu um erro na requisição HTTP');
        }
        } catch (error) {
            console.error('Ocorreu ao buscar os dados:', error);
    }
}

export const listarComentarios = (data: ComentarioInterface[]) => {
    const comentarios: Comentario[] = data.map((item: ComentarioInterface) => {

        const usuario: Usuario = Usuario.builder()
            .withApelido(item.usuario.apelido)
            .withId(item.usuario.id)
            .build();

        return Comentario.builder()
            .withComentario(item.comentario)
            .withId(item.id)
            .withUsuario(usuario)
            .build();
    })

    return comentarios;
}
