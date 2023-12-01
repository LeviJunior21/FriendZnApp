import { Dispatch, SetStateAction } from "react";
import { Publicacao } from "../model/Publicacao";
import { Usuario } from "../model/Usuario";
import { Comentario } from "../model/Comentario";
import { PublicacaoInterface } from "./interfaces";
import { listarComentarios } from "./getComentarios";

export const getPublicacoesSeguidas = async(idUsuario: number, setPublicacoesSeguidas: Dispatch<SetStateAction<Publicacao[]>>) => {
    try {
        const response = await fetch(`http://10.0.0.181:8080/v1/publicacoes/seguindo/${idUsuario}`);

        if (response.ok) {
            const data = await response.json();
            const publicacoes: Publicacao[] = data.map((item: PublicacaoInterface) => {
                const date = new Date(item.date);

                const usuario: Usuario = Usuario.builder()
                    .withApelido(item.usuario.apelido)
                    .withId(item.usuario.id)
                    .build();

                const comentarios: Comentario[] = listarComentarios(item.comentarios);
                
                return Publicacao.builder()
                    .withId(item.id)
                    .withUsuario(usuario)
                    .withDate(date)
                    .withComentarios(comentarios)
                    .withPublicacao(item.publicacao)
                    .withCategoria(item.categoria)
                    .build();
            });

            setPublicacoesSeguidas(publicacoes);
        } else {
            console.error('Ocorreu um erro na requisição HTTP');
        }
        } catch (error) {
            console.error('Ocorreu ao buscar os dados:', error);
    }
}