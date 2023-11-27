import { Categoria } from "../../../utils/interfaces";
import { PublicacaoController } from "../../controller/publicacao/PublicacaoController";
import { RootStackParamList } from "../principal/Interface";

export interface PostarProps {
    navigation: PostarNavigation
}

export interface PostarParamsProps {
    categoria: string,
    mostrarCategoria: boolean,
    desabafo: string,
    enumCategoria: Categoria,
    navigation: PostarNavigation,
    publicacaoController: PublicacaoController
}

export interface PostarNavigation {
    navigate: (routeName: keyof RootStackParamList) => void;
    goBack: () => void;
}