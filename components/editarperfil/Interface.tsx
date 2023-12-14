import { NavigationProp } from "@react-navigation/native";
import { Navigation, RootStackParamList } from "../../utils/interfaces";

export type EditarPerfilProps = {
    route: {
        params: {
            id: number, 
            apelido: string, 
            descricao: string, 
            navigation:  NavigationProp<RootStackParamList, "Home">
        };
    };
};

export interface ApelidoDescricaoInterface {
    apelido: string,
    descricao: string
}
