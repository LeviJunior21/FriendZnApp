import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../utils/Provider";

export interface NavChatProps {
    navigation: NavigationProp<RootStackParamList, "Home">;
    nome: string;
    idRemetente: number;
}
