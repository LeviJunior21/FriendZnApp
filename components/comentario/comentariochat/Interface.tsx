import { Dispatch, SetStateAction } from "react";
import { Comentario } from "../../../model/Comentario";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../utils/interfaces";

export interface VisualizarComentarioProps {
    id: number;
    comentarios: Comentario[];
    setComentarios:  Dispatch<SetStateAction<Comentario[]>>;
    loading: boolean;
    navigation: NavigationProp<RootStackParamList, "Home">;
    remetentePublicacao: number;
}
