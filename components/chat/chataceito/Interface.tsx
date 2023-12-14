import { NavigationProp } from "@react-navigation/native";
import { Chat } from "../../../model/Chat";
import { RootStackParamList } from "../../../utils/interfaces";

export interface ChatItemProps {
    chat: Chat;
    navigation: NavigationProp<RootStackParamList, "Home">;
}
