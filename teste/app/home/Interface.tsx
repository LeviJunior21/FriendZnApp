import { Publicacao } from "../../../model/Publicacao";
import { Categoria } from "../../../utils/interfaces";
import { PublicacaoController } from "../../controller/publicacao/PublicacaoController";
import { RootStackParamList } from "../principal/Interface";

export interface PublicacaoUsuarioProps {
    publicacao: Publicacao,
    index: number,
    navigation: HomeNavigation
}

export interface HomeNavigation {
    navigate: (routeName: keyof RootStackParamList, params: {}) => void;
    goBack: () => void;
}

export interface HomeNavigationNone {
    navigate: (routeName: keyof RootStackParamList) => void;
    goBack: () => void;
}

export interface HomePublicacoesProps {
    search: string,
    categoriaEscolhida: Categoria,
    navigation: HomeNavigation
}

export interface HomePublicacoesStateProps {
    search: string,
    categoriaEscolhida: Categoria,
    navigation: HomeNavigation,
    refreshing: boolean,
    publicacoesFiltradas: Publicacao[],
    publicacoes: Publicacao[],
    publicacaoController: PublicacaoController
}

export interface HomeProps {
    navigation: HomeNavigationNone
}

export interface HomeStateProps {
    search: string,
    openCategoria: boolean,
    navigation: HomeNavigationNone,
    categoriaEscolhida: Categoria,
}