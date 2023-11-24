import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { Client } from "stompjs";
import { Conversa, TipoConversa } from "../../../model/Conversa";

export const enviarChat = (mensagem: string, webSock: MutableRefObject<Client | null>, remetente: number, receptor: number, setMensagem: Dispatch<SetStateAction<string>> ) => {
    if (mensagem.length > 0 && webSock.current != null && webSock?.current.connected) {
        const messageJSON = {
            conteudo: mensagem,
            data: new Date(),
            remetente: remetente,
            receptor: receptor
        };
        const subscribeMensagemPrivada: string = "/app/private-message";
        webSock.current?.send(subscribeMensagemPrivada, {}, JSON.stringify(messageJSON));
        setMensagem("");
    } else {
        console.error("Erro: WebSocket não conectado");
    }
};

export const atualizarConversas = (mensagemRecebida: any, setConversas: Dispatch<SetStateAction<Conversa[]>>) => {
    const newConversa: Conversa = conversaBuilder(mensagemRecebida);
    setConversas(prevConversas => [...prevConversas, newConversa]);
}

export const webSockMensagemconnect = (webSock: MutableRefObject<Client | null>, receptor: number, setConversas: Dispatch<SetStateAction<Conversa[]>>) => {
    if (webSock.current != null) {
        webSock.current.connect({}, function (frame) {
            webSock.current?.subscribe(`/user/${receptor}/private`, function (mensagemI) {
                atualizarConversas(mensagemI, setConversas);
            });
        });
    }
}

const conversaBuilder = (conversa: any): Conversa => {
    const mensagemJSON = JSON.parse(conversa.body);
    return Conversa.builder()
        .withMensagem(mensagemJSON.conteudo)
        .withTimestamp(new Date(mensagemJSON.data))
        .withTipoConversa((mensagemJSON.remetente == 2)? TipoConversa.SENDER:TipoConversa.RECEIVER)
        .build();
}