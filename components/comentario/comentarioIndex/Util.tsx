import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { CurtidasInterface } from "./Interface";
import { Client } from "stompjs";
import { myInfo } from "../../../data/myId";

export const getStatusGostouOuNao = async(idPublicacao: number, idComentario: number, setCurtidas: Dispatch<SetStateAction<CurtidasInterface>>) => {
    try {
        const response = await fetch(`http://10.0.0.181:8080/v1/comentarios/publicacao/${idPublicacao}/comentario/${idComentario}`);

        if (response.ok) {
            const data = await response.json();
            setCurtidas({gostou: data.gostou, naoGostou: data.naoGostou});
        }
    }
    catch(e: any) {}
}

export const sendStatusGostouOuNao = async(webSocket: MutableRefObject<Client | null>, destination: string, idPublicacao: number, idComentario: number, gostou: number) => {
    const myInfos = await myInfo();

    const messageJSON = {
        idUsuario: myInfos.myID,
        codigoAcesso: myInfos.myIDAuth,
        idPublicacao: idPublicacao,
        idComentario: idComentario,
        gostar: gostou
    };  

    webSocket.current?.send(destination, {}, JSON.stringify(messageJSON));
}
