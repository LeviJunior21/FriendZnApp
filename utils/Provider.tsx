import { Dispatch, MutableRefObject, SetStateAction, createContext } from "react";
import { Conversa } from "../model/Conversa";
import { Chat } from "../model/Chat";
import { Client } from "stompjs";
import { DadosProps } from "./interfaces";
import { LoginCadastroReturns } from "../components/usuario/cadastro/Interface";
import { LoginType } from "../components/usuario/utils/LoginType";
import { SexoSelecionado } from "../components/usuario/cadastro/Sexo";
import { dadosIniciaisUsuario } from "../data/constants";
import { AppSettings, defaultAppSettings, themeColors } from "./appSettings";
import { AppNotification } from "./notificacoes";

export type ContextProvider = {
    gravarConversa: (idServer: number, newConversa: Conversa, key: string) => void;
    webSock: MutableRefObject<Client | null>;
    chatData: Chat[];
    setChatData: Dispatch<SetStateAction<Chat[]>>;
    setChatDeletado: Dispatch<SetStateAction<boolean>>;
    chatDeletado: boolean;
    comentou: boolean;
    setComentou: Dispatch<SetStateAction<boolean>>;
    meusDados: LoginCadastroReturns;
    setMeusDados: Dispatch<SetStateAction<LoginCadastroReturns>>;
    publicou: boolean;
    setPublicou: Dispatch<SetStateAction<boolean>>;
    appSettings: AppSettings;
    setAppSettings: Dispatch<SetStateAction<AppSettings>>;
    colors: typeof themeColors.dark;
    notifications: AppNotification[];
    setNotifications: Dispatch<SetStateAction<AppNotification[]>>;
    unreadNotificationCount: number;
    addNotification: (notification: AppNotification) => void;
    markNotificationsRead: () => void;
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
    meusDados: dadosIniciaisUsuario,
    setComentou: () => {},
    publicou: false,
    setPublicou: () => {},
    appSettings: defaultAppSettings,
    setAppSettings: () => {},
    colors: themeColors.dark,
    notifications: [],
    setNotifications: () => {},
    unreadNotificationCount: 0,
    addNotification: () => {},
    markNotificationsRead: () => {},
});
