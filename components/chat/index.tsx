import styled from "styled-components/native"
import Constants from "expo-constants";
import Nav from "./nav";
import { useContext, useEffect } from "react";
import { FlatList } from "react-native";
import ChatI from "./chatI";
import { Navigation } from "../../utils/interfaces";
import { ContextProvider, Provider } from "../../utils/Provider";

export default function Chats(props: Navigation) {
    const { chatData } = useContext<ContextProvider>(Provider);

    return (
        <Container>
            <Nav/>
            <FlatList
            data={chatData.filter(chat => chat.getConversas().length > 0)}
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
