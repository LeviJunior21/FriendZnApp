import { Dispatch, MutableRefObject, SetStateAction, createContext } from "react";
import { Conversa } from "../model/Conversa";
import { Chat } from "../model/Chat";
import { Client } from "stompjs";
import { DadosProps } from "./interfaces";

export type ContextProvider = {
    gravarConversa: (idServer: number, newConversa: Conversa, key: string) => void;
    webSock: MutableRefObject<Client | null>;
    chatData: Chat[];
    setChatData: Dispatch<SetStateAction<Chat[]>>;
    setChatDeletado: Dispatch<SetStateAction<boolean>>;
    chatDeletado: boolean;
    comentou: boolean;
    setComentou: Dispatch<SetStateAction<boolean>>;
    meusDados: DadosProps;
    setMeusDados: Dispatch<SetStateAction<DadosProps>>
}

export const Provider = createContext<ContextProvider>({
    setMeusDados: () => {},
    gravarConversa: () => {},
    webSock: {current: null},
    chatData: [],
    setChatData: () => {},
    setChatDeletado: () => {},
    chatDeletado: false,
    comentou: false,
    meusDados: {idServer: -1, idAuth: -1},
    setComentou: () => {}
});
