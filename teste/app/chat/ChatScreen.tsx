import Constants from "expo-constants";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";
import { Component, useContext } from "react";
import { Dimensions, FlatList } from "react-native";
import { ChatScreenParamProps, ChatScreenProps } from "./Interfaces";
import { ContextTypeProvider, Provider } from "../../data/Provider";
import { NavChat } from "./NavChat";
import { TipoConversa } from "../../../model/Conversa";
import { getCurrentDate } from "../../../utils/time";
import { myID } from "../../../data/myId";

export class ChatScreen extends Component<ChatScreenProps, ChatScreenParamProps> {
    constructor(props: ChatScreenProps) {
        super(props);
        const {chatController } = useContext(Provider) as ContextTypeProvider;

        this.state = {
            mensagem: "",
            conversas: [],
            nome: props.nome,
            navigation: props.navigation,
            idRemetente: props.idRemetente,
            chatController
        }
    }

    render() {

        return (
            <Container>
                <NavChat navigation={this.state.navigation} nome={this.state.nome} idRemetente={this.state.idRemetente}/>
                <ScrollContainer>
                    <FlatList
                    data={this.state.conversas}
                    keyExtractor={(item, index) => index.toString()}
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
                    value={this.state.mensagem}
                    onChangeText={(text) => this.setState({mensagem: text})}
                    />
                    <Sender onPress={() => {this.state.chatController.enviarChat(this.state.mensagem, myID, this.state.idRemetente)}}>
                        <Icon name={"send"} color={"green"} size={30}/>
                    </Sender>
                </MessageSenderContainer>
            </Container>
        )
    }
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