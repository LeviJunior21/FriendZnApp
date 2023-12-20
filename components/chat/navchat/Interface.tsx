import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../utils/interfaces";

export interface NavChatProps {
    navigation: NavigationProp<RootStackParamList, "Home">;
    nome: string;
    idRemetente: number;
    emoji: string
}
