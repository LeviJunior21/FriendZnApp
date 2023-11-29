import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../utils/Provider";

export interface NavigationProps {
    navigation: NavigationProp<RootStackParamList, "Home">
}
