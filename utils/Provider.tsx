import { Dispatch, MutableRefObject, SetStateAction, createContext } from "react";
import { Conversa } from "../model/Conversa";
import { Chat } from "../model/Chat";
import { Client } from "stompjs";

export type ContextProvider = {
    gravarConversa: (newConversa: Conversa, key: string) => void;
    webSock: MutableRefObject<Client | null>;
    chatData: Chat[];
    setChatData: Dispatch<SetStateAction<Chat[]>>
}

export const Provider = createContext<ContextProvider>({
    gravarConversa: () => {},
    webSock: {current: null},
    chatData: [],
    setChatData: () => {}
});
