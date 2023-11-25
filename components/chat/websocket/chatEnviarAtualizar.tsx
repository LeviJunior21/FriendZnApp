import { Dispatch, MutableRefObject, SetStateAction, useContext } from "react";
import { Client } from "stompjs";
import { Conversa, conversaBuilder } from "../../../model/Conversa";

export const enviarChat = (mensagem: string, webSock: MutableRefObject<Client | null>, remetente: number, receptor: number, setMensagem: Dispatch<SetStateAction<string>> ) => {
    if (mensagem.length > 0 && webSock.current != null && webSock?.current.connected) {
        const messageJSON = {
            mensagem: mensagem,
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

export const atualizarConversas = (mensagemRecebida: any, setConversas: Dispatch<SetStateAction<Conversa[]>>, gravarConversa: (newConversa: Conversa, key: string) => void, key: string) => {
    const data = JSON.parse(mensagemRecebida.body)
    const newConversa: Conversa = conversaBuilder(data);
    setConversas(prevConversas => [...prevConversas, newConversa]);
    gravarConversa(newConversa, key)
}

export const webSockMensagemConnect = (webSock: MutableRefObject<Client | null>, receptor: number, setConversas: Dispatch<SetStateAction<Conversa[]>>, gravarConversa: (newConversa: Conversa, key: string) => void, key: string) => {
    if (webSock.current != null) {
        webSock.current.connect({}, function (frame) {
            webSock.current?.subscribe(`/user/${receptor}/private`, function (mensagemI) {
                atualizarConversas(mensagemI, setConversas, gravarConversa, key);
            });
        });
    }
}
