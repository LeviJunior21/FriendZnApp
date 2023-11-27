import { Dispatch, SetStateAction } from "react";
import { Comentario } from "../../../model/Comentario";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../utils/Provider";

export interface VisualizarComentarioProps {
    id: number;
    comentarios: Comentario[];
    setComentarios:  Dispatch<SetStateAction<Comentario[]>>;
    loading: boolean;
    navigation: NavigationProp<RootStackParamList, "Home">;
}
