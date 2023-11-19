import { Dispatch, SetStateAction } from "react";
import { Publicacao } from "../model/Publicacao";
import { NavigationProp } from '@react-navigation/native';
import { Comentario } from "../model/Comentario";

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
    categoriaEscolhida: Categoria,
    navigation: Navigation
}

interface PublicacaoProps {
    publicacao: Publicacao,
    index: number,
    navigation: Navigation
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
    desabafo: string,
    navigation: Navigation
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

type RootStackParamList = {
    Home: undefined;
    Postar: undefined;
    Login: undefined;
    Comentario: { publicacao: Publicacao };
};

interface Navigation {
    navigation: NavigationProp<RootStackParamList, "Home">
}

interface UserInfo {
    
}

interface UserInfoProps {
    userInfo: any;
    setUserInfo: Dispatch<SetStateAction<UserInfo>>
}


type ComentarioProps = {
    route: {
        params: {
            publicacao: Publicacao;
        };
    };
};

interface PropsVisualizarComentario {
    id: number;
    comentarios: Comentario[];
    setComentarios:  Dispatch<SetStateAction<Comentario[]>>;
    loading: boolean;
}

interface GetComentariosProps {
    publicacao: Publicacao; 
    setComentarios: Dispatch<SetStateAction<Comentario[]>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

export { PublicacaoInterface, UsuarioInterface, ComentarioInterface, HomeProps, PublicacaoProps, NavProps, PropsCategoria, PublicacaoUsuario, Categoria, RootStackParamList, Navigation, UserInfo, UserInfoProps, ComentarioProps, PropsVisualizarComentario, GetComentariosProps};
