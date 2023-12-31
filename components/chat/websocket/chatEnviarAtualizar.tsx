import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { Client } from "stompjs";

/**
 * Dispara o chat para um destinatário.
 * @param {string} mensagem - Mensagem a ser enviada.
 * @param {MutableRefObject<Client | null>} webSock - WebSock conectado.
 * @param {number} remetente - ID do remetente.
 * @param {number} receptor - ID do receptor.
 * @param {Dispatch<SetStateAction<string>>} setMensagem - Estado para atualizar as mensagens.
**/
export const enviarChat = (
    mensagem: string, 
    webSock: MutableRefObject<Client | null>, 
    remetente: number, 
    receptor: number, 
    setMensagem: Dispatch<SetStateAction<string>> 
) => {
    if (mensagem.length > 0 && webSock.current != null && webSock?.current.connected) {
        const messageJSON = {
            mensagem: mensagem.replace(/^\s+|\s+$/g, ''),
            timestamp: new Date(),
            remetente: remetente,
            receptor: receptor
        };
        const WsMensagemPrivada: string = "/app/private-message";
        webSock.current?.send(WsMensagemPrivada, {}, JSON.stringify(messageJSON));
        setMensagem("");
    } else {
        console.error("Erro: WebSocket não conectado");
    }
};
