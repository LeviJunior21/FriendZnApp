import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { Client } from "stompjs";

export interface EnviarChatProps {
    mensagem: string;
    webSock: MutableRefObject<Client | null>;
    myID: number;
    idRemetente: number, receptor: number;
    setMensagem: Dispatch<SetStateAction<string>> 
}
