import styled from "styled-components/native"
import Constants from "expo-constants";
import Nav from "./nav";
import { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";
import { Chat } from "../../model/Chat";
import ChatI from "./chatI";
import { Conversa, TipoConversa } from "../../model/Conversa";
import { Navigation } from "../../utils/interfaces";

export default function Chats(props: Navigation) {
    const [chatData, setChatData] = useState<Chat[]>([]);

    useEffect(() => {
        const conversa1: Conversa = Conversa.builder()
            .withMensagem("Olá! Posso falar com você?")
            .withTipoConversa(TipoConversa.SENDER)
            .withTimestamp(new Date())
            .build();

        const conversa2: Conversa = Conversa.builder()
            .withMensagem("Olá! Pode")
            .withTimestamp(new Date())
            .withTipoConversa(TipoConversa.RECEIVER)
            .build();

        const conversa3: Conversa = Conversa.builder()
            .withMensagem("O que você gostaria de falar?")
            .withTimestamp(new Date())
            .withTipoConversa(TipoConversa.RECEIVER)
            .build();

        const chat: Chat = Chat.builder()
            .withConversas([])
            .withTimestamp(new Date())
            .withRemetente("LeviJunior")
            .build();

        chat.setConversas([conversa1, conversa2, conversa3])
        setChatData([chat]);
    }, []);

    return (
        <Container>
            <Nav></Nav>
            <FlatList
            data={chatData}
            renderItem={({item}) => 
                <ChatI chat={item} navigation={props}/>
            }
            />
        </Container>
    )
}

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #303030;
    margin-top: ${Constants.statusBarHeight}px;
`
