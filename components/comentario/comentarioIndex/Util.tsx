import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { CurtidasInterface } from "./Interface";
import { Client } from "stompjs";
import { myID } from "../../../data/myId";

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

export const sendStatusGostouOuNao = async(webSocket: MutableRefObject<Client | null>, destination: string) => {
    const messageJSON = {
        idUsuario: myID,
        codigoAcesso: 12345
    };  

    webSocket.current?.send(destination, {}, JSON.stringify(messageJSON));
}
