import styled from "styled-components/native"
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/Ionicons";
import ChatAceito from "./chataceito/ChatAceito";
import ChatPedido from "./chatpedido/ChatPedido";
import { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { ContextProvider, Provider } from "../../utils/Provider";
import { ListaDeChatsProps } from "./Interface";
import { Chat } from "../../model/Chat";
import { verificarPersistenciaChat } from "../../data/utils";

export default function ListaDeChats(props: ListaDeChatsProps) {
    const { chatData } = useContext<ContextProvider>(Provider);
    const [ solicitacoesChatPendentes, setSolicitacoesChatPendentes ] = useState<Chat[]>([]);
    const [ solicitacoesChatAceitas, setSolicitacoesChatAceitas ] = useState<Chat[]>([]);

    useEffect(() => {
        chatData.map((chat: Chat) => {
            verificarPersistenciaDoChat(chat);
        });
    }, []);

    const verificarPersistenciaDoChat = async(chat: Chat) => {
        await verificarPersistenciaChat(chat.getRemetente(), "myKey").then((response: boolean) => {
            if (response && chat.getConversas().length > 0) { setSolicitacoesChatAceitas(prevState => [...prevState, chat]) }
            else if (chat.getConversas().length > 0) { setSolicitacoesChatPendentes(prevState => [...prevState, chat]) }
        });
    }

    const existeSolicitacaoChatPendente = (): boolean => solicitacoesChatPendentes.length > 0;

    return (
        <Container>
            <NavContainer>
                <ButtonDrawer>
                    <Icon name={"menu-outline"} size={30} color={"white"}></Icon>
                </ButtonDrawer>
            </NavContainer>
            {existeSolicitacaoChatPendente()? 
            <ContainerSolicitacaoPendente>
                <SolicitacaoPendenteText>Solicitações de Chat</SolicitacaoPendenteText>
                <NegarSolicitacoesButton>
                    <NegarSolicitacoesText>Negar Todos</NegarSolicitacoesText>
                </NegarSolicitacoesButton>
            </ContainerSolicitacaoPendente>:<></>}
            <FlatListContainer>
                <FlatList
                data={solicitacoesChatPendentes}
                renderItem={({item}) => <ChatPedido chat={item} navigation={props}/>}
                />
            </FlatListContainer>
            <FlatListContainer style={{flex: 1}}>
                <FlatList
                data={solicitacoesChatAceitas}
                renderItem={({item}) => <ChatAceito chat={item} navigation={props}/>}
                />
            </FlatListContainer>
        </Container>
    )
}

const ContainerSolicitacaoPendente = styled.View`
    width: 100%;
    height: 60px;
    border-bottom-width: 2px;
    border-bottom-color: white;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #303030;
    margin-top: ${Constants.statusBarHeight}px;
`

const NavContainer = styled.View`
    width: 100%;
    height: 50px;
    align-items: center;
    flex-direction: row;
    background-color: #10a17d;
`

const ButtonDrawer = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    justify-content: center;
    align-items: center;
`

const SolicitacaoPendenteText = styled.Text`
    color: white;
    font-size: 16px;
    font-weight: 500;
`

const NegarSolicitacoesButton = styled.TouchableOpacity`
    width: 140;
    height: 36px;
    justify-content: center;
    align-items: center;
    border-width: 2px;
    border-color: white;
    border-radius: 5px;
`

const NegarSolicitacoesText = styled.Text`
    color: white;
    font-size: 14px;
    font-weight: 500;
`

const FlatListContainer = styled.View`
    width: 100%;
`