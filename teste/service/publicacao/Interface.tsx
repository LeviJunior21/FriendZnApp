import { Categoria } from "../../../utils/interfaces";

export interface PublicacaoInterface {
    id: number,
    publicacao: string,
    date: string,
    usuario: UsuarioInterface,
    comentarios: ComentarioInterface[],
    categoria: Categoria
}

export interface ComentarioInterface {
    id: number,
    comentario: string,
    usuario: UsuarioInterface,
}

export interface UsuarioInterface {
    id: number,
    apelido: string,
}