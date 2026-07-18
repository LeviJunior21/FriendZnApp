import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";
import IconFontiso from "react-native-vector-icons/Fontisto";
import { getCurrentDate } from "../../../utils/time";
import { ComentarioIndexProps, CurtidasInterface } from "./Interface";
import { useContext, useEffect, useMemo, useState } from "react";
import { PanResponder } from "react-native";
import { construirUsuarios, getStatusGostouOuNao, sendStatusGostouOuNao } from "./Util";
import { ContextProvider, Provider } from "../../../utils/Provider";
import { Usuario } from "../../../model/Usuario";
import AvatarImage from "../../avatar/AvatarImage";
import EmojiBadge from "../../emoji/EmojiBadge";

export default function ComentarioIndex(props: ComentarioIndexProps) {
    const [curtidas, setCurtidas] = useState<CurtidasInterface>({ gostou: [], naoGostou: [] });
    const subscribe: string = "/topic/public/publicacao/" + props.idPublicacao + "/comentario/" + props.comentario.getId();
    const { webSock, meusDados } = useContext<ContextProvider>(Provider);
    const panResponder = useMemo(() => PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 18 && Math.abs(gestureState.dy) < 18,
        onPanResponderRelease: (_, gestureState) => {
            if (gestureState.dx > 55) {
                props.onResponderComentario?.(props.comentario);
            }
        },
    }), [props.comentario]);
    
    const gostouOuNao = (gostou: number) => {
        if (meusDados.codigoAcesso !== -1 && meusDados.id !== -1) {
            const destination: string = "/app/curtir-comentario/publicacao/" + props.idPublicacao + "/comentario/" + props.comentario.getId();
            sendStatusGostouOuNao(webSock, destination, props.idPublicacao, props.comentario.getId(), gostou, meusDados.id, meusDados.codigoAcesso);
        } else {
            props.navigation.navigate("Login");
        }
    };

    useEffect(() => {
        getStatusGostouOuNao(props.idPublicacao, props.comentario.getId(), setCurtidas);
    }, []);

    const curtidoPeloAutor = () => {
        let result = false;
        curtidas.gostou.forEach((usuario: Usuario) => { if (usuario.getId() === props.remetentePublicacao) {result = true}});
        return result;
    }

    useEffect(() => {
        if (webSock.current?.connected) {
            webSock.current?.subscribe(subscribe, function (message) {
                const status = JSON.parse(message.body);
                construirUsuarios(status, setCurtidas);
                console.log(message)
            });
        }
    }, []);

    const abrirChatPrivado = () => {
        if (meusDados.id !== -1 && meusDados.codigoAcesso !== -1) { 
                props.navigation.navigate("Perfil", { id: props.comentario.getUsuario().getId(), apelido: props.comentario.getUsuario().getApelido(), navigation: props.navigation })
        } else {
            props.navigation.navigate("Login");
        }
    }

    return (
        <ComentarioI {...panResponder.panHandlers}>
            <ContainerUsuario>
                <InfoUserContainer>
                    <AvatarImage userId={props.comentario.getUsuario().getId()} size={50}/>
                    <UserInfo>
                        <TouchUserName onPress={() => abrirChatPrivado()}>
                            <NameRow><NomeUsuario>@{props.comentario.getUsuario().getApelido()}</NomeUsuario><EmojiBadge emoji={props.comentario.getUsuario().getEmoji()} size={18}/></NameRow>
                        </TouchUserName>
                    <TempoPublicacao>{getCurrentDate(props.comentario.getTimestamp())}</TempoPublicacao>
                   </UserInfo>
                </InfoUserContainer>
                <ComentarioRealizado>{props.comentario.getComentario()}</ComentarioRealizado>
            </ContainerUsuario>
            <CurtidasContainer>
                {curtidoPeloAutor()?<CurtidoPeloAutorContainer>
                    <Icon name={"heart"} color={"red"} size={20}/>
                    <CurtidoPeloAutorText>Curtido pelo autor</CurtidoPeloAutorText>
                </CurtidoPeloAutorContainer>
                :<CurtidoPeloAutorContainer></CurtidoPeloAutorContainer>
                }
                <CurtidasSpace>
                    <LikeOuDeslikeContainer onPress={() => gostouOuNao(1)}>
                        <Icon name={"heart"} color={"white"} size={14}/>
                        <LikeouDeslike>+{curtidas.gostou.length}</LikeouDeslike>
                    </LikeOuDeslikeContainer>
                    <LikeOuDeslikeContainer onPress={() => gostouOuNao(-1)}>
                        <IconFontiso name={"dislike"} color={"white"} size={14}/>
                        <LikeouDeslike>-{curtidas.naoGostou.length}</LikeouDeslike>
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

const NameRow = styled.View`
    flex-direction: row;
    align-items: center;
`

const TempoPublicacao = styled.Text`
    font-size: 11px;
    color: white;
`
const ContainerUsuario = styled.TouchableOpacity`
    width: 100%;
    min-height: 60px;
    flex-direction: column;
`

const ComentarioI = styled.View`
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

const CurtidasContainer = styled.View`
    width: 100%;
    height: 20px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const CurtidasSpace = styled.View`
    width: 100px;
    height: 30px;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
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

const CurtidoPeloAutorContainer = styled.View`
    width: 130px;
    height: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
`

const CurtidoPeloAutorText = styled.Text`
    color: white;
    font-size: 11px;
`
