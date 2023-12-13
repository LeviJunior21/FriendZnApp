import styled from "styled-components/native";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/Ionicons";
import React, { useContext, useEffect, useRef, useState } from "react";
import { NavChat } from "../navchat/NavChat";
import { Dimensions, FlatList } from "react-native";
import { Conversa, TipoConversa } from "../../../model/Conversa";
import { getCurrentDate } from "../../../utils/time";
import { enviarChat } from "../websocket/chatEnviarAtualizar";
import { ContextProvider, Provider } from "../../../utils/Provider";
import { buscarChat } from "../../../data/chatutils";
import { Chat } from "../../../model/Chat";
import { NavigationChatProps } from "./Interface";
import { keyBDChat } from "../../../data/constants";

export default function ChatPrivado(props: NavigationChatProps) {
    const { idRemetente, nome } = props.route.params;
    const [conversas, setConversas] = useState<Conversa[]>([]);
    const [mensagem, setMensagem] = useState("");
    const flatListRef = useRef<FlatList>(null);
    const {chatData, webSock, setChatData, meusDados } = useContext<ContextProvider>(Provider);

    useEffect(() => {
        const carregarConversas = async() => {
            const chatEncontrado:Chat = await buscarChat(idRemetente, meusDados.id, keyBDChat);
            setConversas([...chatEncontrado.getConversas()]);
        }; carregarConversas()
    }, [chatData, setChatData]);

    const enviarMensagem = async() => {
        enviarChat(mensagem, webSock, meusDados.id, idRemetente, setMensagem);
    }

    return (
        <Container>
            <NavChat navigation={props.navigation} nome={nome} idRemetente={idRemetente}/>
            <ScrollContainer>
                <FlatList
                data={conversas}
                keyExtractor={(item, index) => index.toString()}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
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
                <Sender onPress={() => {enviarMensagem()}}>
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