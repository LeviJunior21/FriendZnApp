import styled from "styled-components/native";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/Ionicons";
import { ChatProps, ComentarioProps, Navigation, NavigationChat } from "../../utils/interfaces";
import { NavChat } from "./nav";
import React from "react";

export default function ChatScreen(props: NavigationChat) {
    const { nome } = props.route.params;
    return (
        <Container>
            <NavChat navigation={props.navigation} nome={nome}/>
        </Container>
    )
}

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #303030;
    margin-top: ${Constants.statusBarHeight}px;
`
