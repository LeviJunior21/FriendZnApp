import styled from "styled-components/native";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/Ionicons";
import { Navigation } from "../../utils/interfaces";
import { NavChat } from "./nav";

export default function ChatScreen(props: Navigation) {
    return (
        <Container>
            <NavChat navigation={props}/>
        </Container>
    )
}

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #303030;
    margin-top: ${Constants.statusBarHeight}px;
`
