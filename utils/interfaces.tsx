import { Dispatch, SetStateAction } from "react";
import { Publicacao } from "../model/Publicacao";
import { NavigationProp } from '@react-navigation/native';
import { Comentario } from "../model/Comentario";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { LoginCadastroReturns } from "../components/usuario/cadastro/Interface";

interface PublicacaoInterface {
    id: number,
    publicacao: string,
    date: string,
    usuario: UsuarioInterface,
    comentarios: ComentarioInterface[],
    categoria: Categoria,
}

interface ComentarioInterface {
    id: number,
    comentario: string,
    usuario: UsuarioInterface,
    timestamp: string,
    usuarioId: number
}

interface UsuarioInterface {
    id: number,
    apelido: string,
    emoji: string
}

interface HomeProps {
    search: string,
    categoriaEscolhida: Categoria,
    navigation:  NavigationProp<RootStackParamList, "Home">,
    meusDados: LoginCadastroReturns
}

interface PublicacaoProps {
    publicacao: Publicacao,
    index: number,
    navigation: NavigationProp<RootStackParamList, "Home">;
}

interface NavProps {
    navigation: DrawerNavigationProp<RootStackParamList, "Home">,
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
    meusDados: LoginCadastroReturns,
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
    ChatPrivado: {};
    Cadastro: { dados: any, navigation: NavigationProp<RootStackParamList, "Home">};
    Configuracoes: undefined;
    Perfil: {id: number, navigation:  NavigationProp<RootStackParamList, "Home">, apelido: string};
    EditarPerfil: { id: number, apelido: string, descricao: string, navigation: NavigationProp<RootStackParamList, "Home">};
    Avatar: {navigation: NavigationProp<RootStackParamList, "Home">}
};

interface Navigation {
    navigation: NavigationProp<RootStackParamList, "Home">
}

interface DrawerNavigationProps {
    navigation: DrawerNavigationProp<RootStackParamList, "Home">
}

interface NavigationChat {
    navigation: NavigationProp<RootStackParamList, "Home">;
    route: {
        params: {
          idRemetente: number,
          nome: string
        };
    };
}

interface UserInfo {}

interface UserInfoProps {
    userInfo: any;
    setUserInfo: Dispatch<SetStateAction<UserInfo>>;
    navigation: NavigationProp<RootStackParamList, "Home">;
}


type ComentarioProps = {
    navigation: NavigationProp<RootStackParamList, "Home">;
    route: {
        params: {
            publicacao: Publicacao;
        };
    };
};

type ChatProps = {
    route: {
        params: {
            nome: string;
            navigation: Navigation;
        };
    };
};

interface PropsVisualizarComentario {
    id: number;
    comentarios: Comentario[];
    setComentarios:  Dispatch<SetStateAction<Comentario[]>>;
    loading: boolean;
    navigation: NavigationProp<RootStackParamList, "Home">;
}

interface GetComentariosProps {
    publicacao: Publicacao; 
    setComentarios: Dispatch<SetStateAction<Comentario[]>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

interface DadosProps {
    idAuth: number, 
    idServer: number,
    apelido: string
}


export { PublicacaoInterface, UsuarioInterface, ComentarioInterface, HomeProps, PublicacaoProps, NavProps, PropsCategoria, PublicacaoUsuario, Categoria, RootStackParamList, Navigation, UserInfo, UserInfoProps, ComentarioProps, PropsVisualizarComentario, GetComentariosProps, ChatProps, NavigationChat, DadosProps, DrawerNavigationProps };
