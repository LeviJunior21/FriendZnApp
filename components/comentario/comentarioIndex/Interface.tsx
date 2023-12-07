import { NavigationProp } from "@react-navigation/native";
import { Comentario } from "../../../model/Comentario";
import { RootStackParamList } from "../../../utils/interfaces";

export interface ComentarioIndexProps {
    comentario: Comentario;
    idPublicacao: number;
    navigation: NavigationProp<RootStackParamList, "Home">
}

export interface CurtidasInterface {
    gostou: number, 
    naoGostou: number
}
