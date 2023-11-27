import styled from "styled-components/native";
import { Component, useContext, useEffect, useState } from "react";
import { ChatItemParamProps, ChatItemProps } from "./Interfaces";
import { Usuario } from "../../../model/Usuario";
import { ContextTypeProvider, Provider } from "../../data/Provider";
import { getUsuario } from "../../../utils/getUsuario";
import { Chat } from "../../../model/Chat";
import { getCurrentDate } from "../../../utils/time";

export class ChatItem extends Component<ChatItemProps, ChatItemParamProps> {
    constructor(props: ChatItemProps) {
        super(props);
        const { chatController } = useContext(Provider) as ContextTypeProvider;

        this.state = {
            chat: props.chat,
            ultimaConversa: "",
            navigation: props.navigation,
            usuario: Usuario.builder().build(),
            chatController
        }
    }

    componentDidMount(): void {
        const atualizarDadosLocalmente = async() => {
           const usuarioCarregado: Usuario = await getUsuario(this.state.chat.getRemetente());
            this.setState({ usuario: usuarioCarregado });
            const chat:Chat = await this.state.chatController.buscarChat(this.state.chat.getRemetente());
            this.setState({ultimaConversa: chat.getConversas()[chat.getConversas().length - 1].getMensagem()});
        }
        atualizarDadosLocalmente();
    }

    render() {

        const goToChatScreen = () => {
            this.state.navigation.navigate("ChatScreen", {
                idRemetente: this.state.chat.getRemetente(), 
                nome: this.state.usuario.getApelido() 
            });
        }

        return (
            <Container onPress={() => goToChatScreen()}>
                <AvatarContainer>
                    <Avatar></Avatar>
                </AvatarContainer>
                <UserOutros>
                    <NameHourContainer>
                        <Nome>@{this.state.usuario.getApelido()}</Nome>
                        <Hora>{getCurrentDate(this.state.chat.getTimestamp())}</Hora>
                    </NameHourContainer>
                    <Mensagem numberOfLines={1}>{this.state.ultimaConversa}</Mensagem>
                </UserOutros>
            </Container>
        )
    }
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