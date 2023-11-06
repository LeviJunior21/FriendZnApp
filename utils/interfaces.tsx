import { Dispatch, SetStateAction } from "react";
import { Publicacao } from "../model/Publicacao";

interface PublicacaoInterface {
    id: number,
    publicacao: string,
    date: string,
    usuario: UsuarioInterface,
    comentarios: ComentarioInterface[],
    categoria: Categoria
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
    categoriaEscolhida: Categoria
}

interface PublicacaoProps {
    publicacao: Publicacao,
    index: number
}

interface NavProps {
    search: string,
    setSearch: Dispatch<SetStateAction<string>>,
    openCategoria: boolean,
    categoriaEscolhida: Categoria,
    setOpenCategoria: Dispatch<SetStateAction<boolean>>
};

interface PropsCategoria {
    openCategoria: boolean,
    setOpenCategoria: Dispatch<SetStateAction<boolean>>,
    categoriaEscolhida: Categoria,
    setCategoriaEscolhida: Dispatch<SetStateAction<Categoria>>
}

interface PublicacaoUsuario {
    categoria: Categoria,
    desabafo: string
}

enum Categoria {
    todasCategorias = "Todas Categorias",
    amizade = "amizade",
    amor = "amor",
    diversao = "diversao",
    saude = "saude",
    tecnologia = "tecnologia",
    esporte = "esporte",
    sexualidade = "sexualidade",
    outro = "outro",
    astronomia = "astronomia",
    estudos = "estudos",
    dinheiro = "dinheiro",
    familia = "familia",
    lazer = "lazer",
    comida = "comida",
    selecionar = "selecionar"
}

export { PublicacaoInterface, UsuarioInterface, ComentarioInterface, HomeProps, PublicacaoProps, NavProps, PropsCategoria, PublicacaoUsuario, Categoria};
