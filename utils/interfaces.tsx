import { Dispatch, SetStateAction } from "react";
import { Publicacao } from "../model/Publicacao";

interface PublicacaoInterface {
    id: number,
    publicacao: string,
    date: string,
    usuario: UsuarioInterface,
    comentarios: ComentarioInterface[]
}

interface ComentarioInterface {
    id: number,
    comentario: string,
    usuario: UsuarioInterface,
}

interface UsuarioInterface {
    id: number,
    apelido: string,
}

interface HomeProps {
    search: string,
}

interface PublicacaoProps {
    publicacao: Publicacao,
    index: number
}

interface NavProps {
    search: string,
    setSearch: Dispatch<SetStateAction<string>>,
    openCategoria: boolean,
    setOpenCategoria: Dispatch<SetStateAction<boolean>>
};

interface PropsCategoria {
    openCategoria: boolean
}

export { PublicacaoInterface, UsuarioInterface, ComentarioInterface, HomeProps, PublicacaoProps, NavProps, PropsCategoria };
