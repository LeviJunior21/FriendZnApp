import { Client } from "stompjs";
import { Publicacao } from "../../../model/Publicacao";
import { Dispatch, SetStateAction } from "react";
import { Comentario } from "../../../model/Comentario";
import { DadosProps } from "../../../utils/interfaces";

export interface SendComentarioProps {
    webSock: React.MutableRefObject<Client | null>, 
    meusDados: DadosProps,
    publicacao: Publicacao,
    message: string, 
    setMessage: Dispatch<SetStateAction<string>>
}

export interface UpdateComentarioProps {
    message: any;
    setComentarios: Dispatch<SetStateAction<Comentario[]>>;
}