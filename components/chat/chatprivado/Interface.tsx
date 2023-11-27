import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../utils/Provider";

export interface NavigationChatProps {
    navigation: NavigationProp<RootStackParamList, "Home">;
    route: {
        params: {
          idRemetente: number,
          nome: string
        };
    };
}
