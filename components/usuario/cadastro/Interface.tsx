import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../utils/interfaces";

export interface CadastroProps {
    navigation: NavigationProp<RootStackParamList, "Home">;
    route: {
        params: {
            dados: any;
        };
    };
}
