import { Client } from "stompjs";
import { Publicacao } from "../../../model/Publicacao";
import { Dispatch, SetStateAction } from "react";
import { Comentario } from "../../../model/Comentario";

export interface SendComentarioProps {
    webSock: React.MutableRefObject<Client | null>, 
    publicacao: Publicacao,
    message: string, 
    setMessage: Dispatch<SetStateAction<string>>
}

export interface UpdateComentarioProps {
    id: number;
    message: any;
    setComentarios: Dispatch<SetStateAction<Comentario[]>>;
}