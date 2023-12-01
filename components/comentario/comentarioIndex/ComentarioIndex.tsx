import styled from "styled-components/native";
import SockJS from "sockjs-client";
import Icon from "react-native-vector-icons/Ionicons";
import IconFontiso from "react-native-vector-icons/Fontisto";
import Stomp, { Client } from "stompjs";
import { avatar } from "../../../data/avatar";
import { getCurrentDate } from "../../../utils/time";
import { ComentarioIndexProps, CurtidasInterface } from "./Interface";
import { useEffect, useRef, useState } from "react";
import { getStatusGostouOuNao, sendStatusGostouOuNao } from "./Util";

export default function ComentarioIndex(props: ComentarioIndexProps) {
    const [curtidas, setCurtidas] = useState<CurtidasInterface>({gostou: 0, naoGostou: 0});
    const subscribe: string = `/topic/public/gostar-publicacao/${props.idPublicacao}/comentario/${props.comentario.getId()}`;
    const webSock = useRef<Client>(Stomp.over(new SockJS("http://10.0.0.181:8080/ws")));

    useEffect(() => {
        getStatusGostouOuNao(props.idPublicacao, props.comentario.getId(), setCurtidas);
        webSock.current.connect({}, function (frame) {
            webSock.current?.subscribe(subscribe, function (message) {
                const status = JSON.parse(message.body);
                setCurtidas({gostou: curtidas.gostou + status.gostou, naoGostou: curtidas.naoGostou + status.naoGostou});
            });
        });
        return () => { if (webSock.current) { webSock.current.disconnect(() => {console.log("Desconectado.")}); }};
    }, []);

    const gostouOuNao = (gostou: number) => {
        const destination: string = `/app/curtir-publicacao/${props.idPublicacao}/comentario/${props.comentario.getId()}/gostar/${gostou}`;
        sendStatusGostouOuNao(webSock, destination);
    };

    return (
        <ComentarioI>
            <ContainerUsuario>
                <InfoUserContainer>
                    <Avatar source={avatar}/>
                    <UserInfo>
                        <TouchUserName onPress={() => props.navigation.navigate("ChatPrivado", { idRemetente: props.comentario.getUsuario().getId(), nome: props.comentario.getUsuario().getApelido() })}>
                            <NomeUsuario>@{props.comentario.getUsuario().getApelido()}</NomeUsuario>
                        </TouchUserName>
                    <TempoPublicacao>{getCurrentDate(new Date())}</TempoPublicacao>
                   </UserInfo>
                </InfoUserContainer>
                <ComentarioRealizado>{props.comentario.getComentario()}</ComentarioRealizado>
            </ContainerUsuario>
            <CurtidasContainer>
                <CurtidasSpace>
                    <LikeOuDeslikeContainer onPress={() => gostouOuNao(1)}>
                        <Icon name={"heart"} color={"white"} size={14}/>
                        <LikeouDeslike>+{curtidas.gostou}</LikeouDeslike>
                    </LikeOuDeslikeContainer>
                    <LikeOuDeslikeContainer>
                        <IconFontiso name={"dislike"} color={"white"} size={14} onPress={() => gostouOuNao(0)}/>
                        <LikeouDeslike>-{curtidas.naoGostou}</LikeouDeslike>
                    </LikeOuDeslikeContainer>
                </CurtidasSpace>
            </CurtidasContainer>
        </ComentarioI>
    )
}

const NomeUsuario = styled.Text`
    font-size: 16px;
    color: white;
    font-weight: 500;
`

const TempoPublicacao = styled.Text`
    font-size: 11px;
    color: white;
`
const ContainerUsuario = styled.View`
    width: 100%;
    min-height: 60px;
    flex-direction: column;
`

const ComentarioI = styled.TouchableOpacity`
    width: 100%;
    min-height: 110px;
    padding-vertical: 10px;
    padding-horizontal: 11px;
    background-color: #303030;
    border-bottom-width: 1px;
    border-bottom-color: white;
`

const ComentarioRealizado = styled.Text`
    margin-top: 4px;
    min-height: 10px;
    width: 100%;
    padding-vertical: 10px;
    color: white;
`

const TouchUserName = styled.TouchableOpacity`

`

const InfoUserContainer = styled.View`
    width: 100%;
    height: 60px;
    flex-direction: row;
    align-items: center;
`

const UserInfo = styled.View`
    height: 60px;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    margin-left: 4px;
`

const Avatar = styled.Image`
    width: 50px;
    height: 50px;
`

const CurtidasContainer = styled.View`
    width: 100%;
    height: 20px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`

const CurtidasSpace = styled.View`
    width: 100px;
    height: 30px;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
`

const LikeOuDeslikeContainer = styled.TouchableOpacity`
    width: 34px;
    height: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const LikeouDeslike = styled.Text`
    color: white;
`
