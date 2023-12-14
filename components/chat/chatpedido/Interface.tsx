import { NavigationProp } from "@react-navigation/native";
import { Chat } from "../../../model/Chat";
import { Navigation, RootStackParamList } from "../../../utils/interfaces";

export interface ChatPedidoProps {
    chat: Chat;
    navigation:  NavigationProp<RootStackParamList, "Home">;
}
