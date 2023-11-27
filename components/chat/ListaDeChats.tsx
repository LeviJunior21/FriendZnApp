import styled from "styled-components/native"
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/Ionicons";
import ChatItem from "./chatitem/ChatItem";
import { useContext } from "react";
import { FlatList } from "react-native";
import { ContextProvider, Provider } from "../../utils/Provider";
import { ListaDeChatsProps } from "./Interface";

export default function ListaDeChats(props: ListaDeChatsProps) {
    const { chatData } = useContext<ContextProvider>(Provider);

    return (
        <Container>
            <NavContainer>
                <ButtonDrawer>
                    <Icon name={"menu-outline"} size={30} color={"white"}></Icon>
                </ButtonDrawer>
            </NavContainer>
            <FlatList
            data={chatData.filter(chat => chat.getConversas().length > 0)}
            renderItem={({item}) => 
                <ChatItem chat={item} navigation={props}/>
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