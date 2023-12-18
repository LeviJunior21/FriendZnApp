import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { CurtidasInterface } from "./Interface";
import { Client } from "stompjs";
import { Usuario } from "../../../model/Usuario";
import { uri_principal } from "../../../data/constants";

export const getStatusGostouOuNao = async(idPublicacao: number, idComentario: number, curtidas:  Dispatch<SetStateAction<CurtidasInterface>>) => {
    try {
        const response = await fetch(`${uri_principal}/v1/comentarios/publicacao/${idPublicacao}/comentario/${idComentario}`);

        if (response.ok) {
            const data = await response.json();
            construirUsuarios(data, curtidas);
        }
    }
    catch(e: any) {}
}

export const sendStatusGostouOuNao = async(webSocket: MutableRefObject<Client | null>, destination: string, idPublicacao: number, idComentario: number, gostou: number, idServer: number, idAuth: number) => {

    const messageJSON = {
        idUsuario: idServer,
        codigoAcesso: idAuth,
        idPublicacao: idPublicacao,
        idComentario: idComentario,
        gostar: gostou
    };  

    webSocket.current?.send(destination, {}, JSON.stringify(messageJSON));
} 

export const construirUsuarios = async(data: any, setCurtidas:  Dispatch<SetStateAction<CurtidasInterface>>) => {
    const usuariosGostaram: Usuario[] = data.gostou.map((usuario:any) => Usuario.builder().withApelido(usuario.apelido).withId(usuario.id).build());
    const usuariosNaoGostaram: Usuario[] = data.naoGostou.map((usuario:any) => Usuario.builder().withApelido(usuario.apelido).withId(usuario.id).build());
    setCurtidas({ gostou: usuariosGostaram, naoGostou: usuariosNaoGostaram});
}