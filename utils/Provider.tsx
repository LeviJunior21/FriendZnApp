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
    chatDeletado: boolean
}

export const Provider = createContext<ContextProvider>({
    gravarConversa: () => {},
    webSock: {current: null},
    chatData: [],
    setChatData: () => {},
    setChatDeletado: () => {},
    chatDeletado: false
});

export type RootStackParamList = {
    Home: undefined;
    Postar: undefined;
    Login: undefined;
    Comentario: { publicacao: Publicacao };
    ChatPrivado: undefined;
};