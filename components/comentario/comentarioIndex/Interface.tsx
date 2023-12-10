import { NavigationProp } from "@react-navigation/native";
import { Comentario } from "../../../model/Comentario";
import { RootStackParamList } from "../../../utils/interfaces";
import { Usuario } from "../../../model/Usuario";

export interface ComentarioIndexProps {
    comentario: Comentario;
    idPublicacao: number;
    navigation: NavigationProp<RootStackParamList, "Home">;
    remetentePublicacao: number;
}

export interface CurtidasInterface {
    gostou: Usuario[], 
    naoGostou: Usuario[]
}
