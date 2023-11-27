import { createContext } from "react";
import { ChatController } from "../controller/chat/ChatController";
import { PublicacaoController } from "../controller/publicacao/PublicacaoController";
import { ComentarioController } from "../controller/comentario/ComentarioController";
import { UsuarioController } from "../controller/usuario/UsuarioController";

export type ContextTypeProvider = {
    chatController: ChatController;
    publicacaoController: PublicacaoController;
    comentarioController: ComentarioController;
    usuarioController: UsuarioController
}

export const Provider = createContext<ContextTypeProvider | null>(null);
