import { Chat } from "../../../model/Chat";
import { Conversa } from "../../../model/Conversa";
import { Usuario } from "../../../model/Usuario";
import { ChatController } from "../../controller/chat/ChatController";
import { RootStackParamList } from "../principal/Interface";

export interface NavChatProps {
    nome: string,
    idRemetente: number,
    navigation: ChatNavigation,
}

export interface NavChatParamsProps {
    nome: string,
    modalVisible: boolean,
    idRemetente: number,
    navigation: ChatNavigation,
    chatController: ChatController
}

export interface NavChatStateProps {
    nome: string,
    idRemetente: number,
    modalVisible: boolean,
    navigation: ChatNavigation,
    chatController: ChatController
}

export interface ChatNavigation {
    navigate: (routeName: keyof RootStackParamList, params: {}) => void;
    goBack: () => void;
}

export interface ChatAppProps {
    chatData: Chat[],
    navigation: ChatNavigation,
}

export interface ChatAppStateProps {
    chatData: Chat[],
    navigation: ChatNavigation,
    chatController: ChatController
}

export interface ChatItemProps{
    chat: Chat,
    navigation: ChatNavigation
}

export interface ChatItemParamProps{
    chat: Chat,
    usuario: Usuario,
    ultimaConversa: string,
    chatController: ChatController
    navigation: ChatNavigation
}

export interface ChatScreenProps {
    nome: string,
    idRemetente: number,
    navigation: ChatNavigation
}

export interface ChatScreenParamProps {
    nome: string,
    mensagem: string,
    idRemetente: number,
    conversas: Conversa[],
    navigation: ChatNavigation,
    chatController: ChatController
}