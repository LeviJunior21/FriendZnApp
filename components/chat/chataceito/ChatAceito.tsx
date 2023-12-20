import styled from "styled-components/native";
import { Chat } from "../../../model/Chat";
import { getCurrentDate } from "../../../utils/time";
import { getUsuario } from "../../../utils/getUsuario";
import { useContext, useEffect, useState } from "react";
import { Usuario } from "../../../model/Usuario";
import { buscarChat } from "../../../data/chatutils";
import { ContextProvider, Provider } from "../../../utils/Provider";
import { ChatItemProps } from "./Interface";
import { avatarMasculino } from "../../../data/avatar";
import { keyBDChat } from "../../../data/constants";

export default function ChatAceito(props: ChatItemProps) {
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
            const chat:Chat = await buscarChat(props.chat.getRemetente(), meusDados.id, keyBDChat);
            setUltimaConversa(chat.getConversas()[chat.getConversas().length - 1].getMensagem());
        }; buscarConversa();
    }, [chatData])
    
    return (
        <Container onPress={() => props.navigation.navigate("ChatPrivado", { idRemetente: props.chat.getRemetente(), nome: usuario?.getApelido(), emoji: usuario?.getEmoji() })}>
            <AvatarContainer>
                <Avatar source={avatarMasculino}/>
            </AvatarContainer>
            <UserOutros>
                <NameHourContainer>
                    <Nome>@{usuario?.getApelido()} {usuario?.getEmoji()}</Nome>
                    <Hora>{getCurrentDate(props.chat.getTimestamp())}</Hora>
                </NameHourContainer>
                <Mensagem numberOfLines={1}>{ultimaConversa}</Mensagem>
            </UserOutros>
        </Container>
    )
}

const Container = styled.TouchableOpacity`
    width: 100%;
    height: 80px;
    border-bottom-width: 1px;
    border-bottom-color: white;
    flex-direction: row;
    padding-vertical: 10px;
    padding-left: 5px;
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
