import { Dispatch, MutableRefObject, SetStateAction, createContext } from "react";
import { Conversa } from "../model/Conversa";
import { Chat } from "../model/Chat";
import { Client } from "stompjs";
import { Publicacao } from "../model/Publicacao";

export type ContextProvider = {
    gravarConversa: (newConversa: Conversa, key: string) => void;
    webSock: MutableRefObject<Client | null>;
    chatData: Chat[];
    setChatData: Dispatch<SetStateAction<Chat[]>>;
    setChatDeletado: Dispatch<SetStateAction<boolean>>;
    chatDeletado: boolean;
    comentou: boolean;
    setComentou: Dispatch<SetStateAction<boolean>>
}

export const Provider = createContext<ContextProvider>({
    gravarConversa: () => {},
    webSock: {current: null},
    chatData: [],
    setChatData: () => {},
    setChatDeletado: () => {},
    chatDeletado: false,
    comentou: false,
    setComentou: () => {}
});
