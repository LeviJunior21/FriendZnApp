import { SharedValue } from "react-native-reanimated";
import { Categoria } from "../../../../utils/interfaces";

export interface NavHomeProps {
    categoriaEscolhida: Categoria;
    openCategoria: boolean;
    search: string;
    setOpenCategoria: (openCategoria: boolean) => void;
    setSearch: (search: string) => void;
}

export interface NavHomeStateProps {
    categoriaEscolhida: Categoria;
    openCategoria: boolean;
    search: string;
    open: boolean,
    widthShared: SharedValue<number>;
    setOpenCategoria: (openCategoria: boolean) => void;
    setSearch: (search: string) => void;
}

export interface TodasCategoriasProps {
    openCategoria: boolean,
    categoriaEscolhida: Categoria,
    setOpenCategoria: (openCategoria: boolean) => void;
    setCategoriaEscolhida: (categoriaEscolhida: Categoria) => void;
}

export interface TodasCategoriasStateProps {
    openCategoria: boolean,
    categoriaEscolhida: Categoria,
    heightShared: SharedValue<number>;
    setOpenCategoria: (openCategoria: boolean) => void;
    setCategoriaEscolhida: (categoriaEscolhida: Categoria) => void;
}