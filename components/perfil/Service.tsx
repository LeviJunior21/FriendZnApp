
import { Dispatch, SetStateAction } from "react"
import { Publicacao } from "../../model/Publicacao"
import { Usuario } from "../../model/Usuario";
import { Comentario } from "../../model/Comentario";
import { listarComentarios } from "../../utils/getComentarios";
import { PublicacaoInterface } from "../../utils/interfaces";
import { PerfilInterface, dadosIniciaisPerfil } from "./Interface";
import { LoginType } from "../usuario/utils/LoginType";

export const getPublicacoesUser = async(id: number, setPublicacoes: Dispatch<SetStateAction<Publicacao[]>>): Promise<void> => {
    const response = await fetch(`http://10.0.0.181:8080/v1/publicacoes/usuario/${id}`);
    if (response.ok) {
        const data = await response.json();
        const publicacoes: Publicacao[] = await Promise.all(data.map( async(item: PublicacaoInterface) => {
            const date = new Date(item.date);

            const usuario: Usuario = Usuario.builder()
                .withApelido(item.usuario.apelido)
                .withId(item.usuario.id)
                .build();

            const comentarios: Comentario[] = await listarComentarios(item.comentarios);
            
            return Publicacao.builder()
                .withId(item.id)
                .withUsuario(usuario)
                .withDate(date)
                .withComentarios(comentarios)
                .withPublicacao(item.publicacao)
                .withCategoria(item.categoria)
                .build();
        }));

        setPublicacoes(publicacoes);
    };
}

export const getDadosPefilUsuario = async(id: number, setDadosPerfilUsuario: Dispatch<SetStateAction<any>>): Promise<void> => {
    let result: PerfilInterface = dadosIniciaisPerfil;
    const response = await fetch(`http://10.0.0.181:8080/v1/usuarios/perfil/${id}`);
    if (response.ok) {
        result = await response.json();
        console.log(result)
    }

    setDadosPerfilUsuario(result);
}

export const convertToDate = (date: string): string => {
    const toDate: Date = new Date(date);
    const day = toDate.getDate();
    const month = toDate.getMonth() + 1; 
    const year = toDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
}
