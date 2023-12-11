import styled from "styled-components/native"
import { getCurrentDate } from "../../../utils/time"
import { ChatPedidoProps } from "./Interface"
import { useContext, useEffect, useState } from "react";
import { Usuario } from "../../../model/Usuario";
import { ContextProvider, Provider } from "../../../utils/Provider";
import { getUsuario } from "../../../utils/getUsuario";
import { buscarChat } from "../../../data/chatutils";
import { Chat } from "../../../model/Chat";
import { avatarMasculino } from "../../../data/avatar";
import { keyBDChat } from "../../../data/constants";

export default function ChatPedido(props: ChatPedidoProps) {
    const [usuario, setUsuario] = useState<Usuario>();
    const [ultimaConversa, setUltimaConversa] = useState("");
    const { chatData, meusDados } = useContext<ContextProvider>(Provider);

    useEffect(() => {
        const carregandoUsuario = async(usuarioID: number) => {
            const loadUsuario: Usuario = await getUsuario(usuarioID);
            setUsuario(loadUsuario);
        }; carregandoUsuario(props.chat.getRemetente());
    }, []);

    useEffect(() => {
        const buscarConversa = async() => {
            const chat:Chat = await buscarChat(props.chat.getRemetente(), meusDados.idServer, keyBDChat);
            setUltimaConversa(chat.getConversas()[chat.getConversas().length - 1].getMensagem());
        }; buscarConversa();
    }, [chatData])
    
    return (
        <Container>
            <InfoContainer>
                <AvatarContainer>
                    <Avatar source={avatarMasculino}/>
                </AvatarContainer>
                <UserOutros>
                   <NameHourContainer>
                        <Nome>@{usuario?.getApelido()}</Nome>
                        <Hora>{getCurrentDate(props.chat.getTimestamp())}</Hora>
                    </NameHourContainer>
                    <Mensagem numberOfLines={1}>{ultimaConversa}</Mensagem>
                </UserOutros>
            </InfoContainer>
            <PedidoContainer>
                <PedidoContainerButtoms>
                    <ButtonContainer>
                        <ButtonText>Aceitar</ButtonText>
                    </ButtonContainer>
                    <ButtonContainer>
                        <ButtonText>Recusar</ButtonText>
                    </ButtonContainer>
                </PedidoContainerButtoms>
            </PedidoContainer>
        </Container>
    )
}

const Container = styled.TouchableOpacity`
    width: 100%;
    height: 140px;
    border-bottom-width: 1px;
    border-bottom-color: white;
    flex-direction: column;
    padding-vertical: 10px;
    padding-left: 5px;
`

const InfoContainer = styled.View`
   width: 100%;
   height: 80px;
   flex-direction: row;
`

const AvatarContainer = styled.View`
    width: 70px;
    height: 70px;
`

const UserOutros = styled.View`
    flex: 1;
`

const NameHourContainer = styled.View`
    width: 100%;
    height: 34px;
    flex-direction: row;
    align-itens: center;
    justify-content: space-between;
    padding-horizontal: 4px;
`

const Nome = styled.Text`
    color: white;
    font-size: 14px;
    font-weight: 500;
`

const Hora = styled.Text`
    color: white;
    font-size: 11px;
    font-weight: 500;
`

const Mensagem = styled.Text`
    padding-horizontal: 6px;
    color: white;
`

const Avatar = styled.Image`
    width: 60px;
    height: 60px;
    border-radius: 30px;
`

const PedidoContainer = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
`

const PedidoContainerButtoms = styled.View`
    width: 60%;
    height: 40px;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
`

const ButtonContainer = styled.TouchableOpacity`
    width: 100px;
    height: 40px;
    border-radius: 10px;
    border-width: 2px;
    border-color: white;
    justify-content: center;
    align-items: center;
`

const ButtonText = styled.Text`
    color: white;
    font-weight: 500;
    font-size: 14px;
`
