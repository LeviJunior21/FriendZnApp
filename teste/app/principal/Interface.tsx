import { Client } from "stompjs";
import { Chat } from "../../../model/Chat";
import { Publicacao } from "../../../model/Publicacao";
import { ChatController } from "../../controller/chat/ChatController";
import { ComentarioController } from "../../controller/comentario/ComentarioController";
import { PublicacaoController } from "../../controller/publicacao/PublicacaoController";
import { UsuarioController } from "../../controller/usuario/UsuarioController";

export type RootStackParamList = {
    Home: undefined;
    Postar: undefined;
    Login: undefined;
    Comentario: { publicacao: Publicacao };
    ChatScreen: undefined;
};

export interface AppTesteProps {}
export interface AppTesteStateProps {
    chatData: Chat[];
    chatController: ChatController;
    usuarioController: UsuarioController;
    comentarioController: ComentarioController;
    publicacaoController: PublicacaoController;
    webSocket: Client;
    keyBDChat:string;
    myID: number;
}
