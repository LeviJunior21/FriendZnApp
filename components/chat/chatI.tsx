import styled from "styled-components/native";
import { Chat } from "../../model/Chat";
import { getCurrentDate } from "../../utils/time";
import { Navigation } from "../../utils/interfaces";
import { getUsuario } from "../../utils/getUsuario";
import { useEffect, useState } from "react";
import { Usuario } from "../../model/Usuario";

interface Props{
    chat: Chat;
    navigation: Navigation;
}

export default function ChatI(props: Props) {
    const [usuario, setUsuario] = useState<Usuario>();

    useEffect(() => {
        const carregandoUsuario = async(usuarioID: number) => {
            const loadUsuario: Usuario = await getUsuario(usuarioID);
            setUsuario(loadUsuario);
        }
        carregandoUsuario(props.chat.getRemetente());
    }, []);

    return (
        <Container onPress={() => props.navigation.navigation.navigate("ChatScreen", { chat: props.chat, nome: usuario?.getApelido() })}>
            <AvatarContainer>
                <Avatar></Avatar>
            </AvatarContainer>
            <UserOutros>
                <NameHourContainer>
                    <Nome>@{usuario?.getApelido()}</Nome>
                    <Hora>{getCurrentDate(props.chat.getTimestamp())}</Hora>
                </NameHourContainer>
                <Mensagem numberOfLines={1}>{props.chat.getConversas()[props.chat.getConversas().length - 1].getMensagem()}</Mensagem>
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

const Avatar = styled.View`
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background-color: white;
`
