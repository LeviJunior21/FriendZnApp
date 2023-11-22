import styled from "styled-components/native";
import Constants from "expo-constants";
import { NavigationChat } from "../../utils/interfaces";
import { NavChat } from "./nav";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList } from "react-native";
import { Conversa, TipoConversa } from "../../model/Conversa";
import { getCurrentDate } from "../../utils/time";
import SockJS from "sockjs-client";
import Stomp, { Client } from "stompjs";
import Icon from "react-native-vector-icons/Ionicons";

export default function ChatScreen(props: NavigationChat) {
    const { chat } = props.route.params;
    const conversas = useRef<Conversa[]>(props.route.params.chat.getConversas());
    const webSock = useRef<Client | null>(null);
    const [mensagem, setMensagem] = useState("");

    useEffect(() => {
        /**
        var sock = new SockJS("http://10.0.0.181:8080/ws");
        let stompClient: Client = Stomp.over(sock);
        webSock.current = stompClient;

        webSock.current.connect({}, function (frame) {
            webSock.current?.subscribe("/topic/public/" + 1, function (message) {
            });
        });

        return () => {
            if (webSock.current) {
                webSock.current.disconnect(() => {console.log("Desconectado.")});
            }
        };
        **/
    }, []);

    const enviar = () => {
        //if (message.length > 0) {
            //sendMensagem({webSock, publicacao, message, setMessage});
        //}
    };

    return (
        <Container>
            <NavChat navigation={props.navigation} nome={chat.getRemetente()}/>
            <ScrollContainer>
                <FlatList
                    data={conversas.current}
                    renderItem={({item}) => {
                        if (item.getTipoConversa() == TipoConversa.SENDER) {
                            return (<ChatTopicSender>
                                        <Mensagem>{item.getMensagem()}</Mensagem>
                                        <Hora>{getCurrentDate(item.getTimestamp())}</Hora>
                                    </ChatTopicSender>)
                        }
                        return (
                            <ChatTopicReceiver>
                                <Mensagem>{item.getMensagem()}</Mensagem>
                                <Hora>{getCurrentDate(item.getTimestamp())}</Hora>
                            </ChatTopicReceiver>
                        )
                    }}
                />
            </ScrollContainer>
            <MessageSenderContainer>
                <Input 
                placeholder={"Escreva sua mensagem..."} 
                cursorColor={"white"} 
                placeholderTextColor={"white"}
                value={mensagem}
                onChangeText={(text) => setMensagem(text)}
                />
                <Sender>
                    <Icon name={"send"} color={"green"} size={30}/>
                </Sender>
            </MessageSenderContainer>
        </Container>
    )
}

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #303030;
    margin-top: ${Constants.statusBarHeight}px;
`

const ScrollContainer = styled.ScrollView`
    width: 100%;
    height: ${Dimensions.get('window').height - Constants.statusBarHeight}px;
`

const ChatTopicSender = styled.TouchableOpacity`
    width: 60%;
    min-height: 50px;
    background-color: #10a17d;
    align-self: flex-start;
    margin-top: 10px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 6px;
    justify-content: center;
`

const ChatTopicReceiver = styled.TouchableOpacity`
    width: 60%;
    min-height: 50px;
    background-color: #294b6b;
    align-self: flex-end;
    margin-top: 10px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    padding: 6px;
    justify-content: center;
`

const Hora = styled.Text`
    position: absolute;
    bottom: 4px;
    right:4px;
    color: white;
    font-size: 10px;
`

const Mensagem = styled.Text`
    color: white;
    font-size: 14px;
    padding-top: 4px;
    padding-bottom: 16px;
`

const MessageSenderContainer = styled.View`
    width: 100%;
    height: 50px;
    flex-direction: row;
    align-items: center;
    border-top-width: 1px;
    border-top-color: white;
`

const Input = styled.TextInput`
    color: white;
    flex: 1;
    padding: 10px;
`

const Sender = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    justify-content: center;
    align-items: center;
`