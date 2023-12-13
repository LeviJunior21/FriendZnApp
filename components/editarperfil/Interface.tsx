import { Navigation } from "../../utils/interfaces";

export type EditarPerfilProps = {
    route: {
        params: {
            id: number, 
            apelido: string, 
            descricao: string, 
            navigation: Navigation
        };
    };
};

export interface ApelidoDescricaoInterface {
    apelido: string,
    descricao: string
}
