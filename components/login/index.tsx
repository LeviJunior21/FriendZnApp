import Icon from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { Navigation, UserInfo } from "../../utils/interfaces";
import { Dimensions } from "react-native";
import { useState } from "react";
import FazerLogin from "./fazerLogin";

export default function Login(props: Navigation) {
    const [userInfo, setUserInfo] = useState<UserInfo>();
    const [accept, setAccept] = useState<boolean>(false);
    const [save, setSave] = useState<boolean>(false);
    const [accessToken, setAccessToken] = useState();
    const [loginPress, setLoginPress] = useState(false);
    const [hasData, setHasData] = useState(false);
    
    return (
        <Container>
            <StatusBar backgroundColor={"white"}/>
            <Nav>
                <ButtonBack onPress={() => props.navigation.navigate("Home")}>
                    <Icon name={"arrow-back"} size={30} color={"white"}></Icon>
                </ButtonBack>
                <TextLogin>Fazer Login</TextLogin>
            </Nav>
            <FazerLogin userInfo={userInfo} setUserInfo={setUserInfo}/>
        </Container>
    )
}

const height = Dimensions.get('window').height;
const Container = styled.View`
    width: 100%;
    height: 100%;
    background-color: #303030;
    margin-top: ${Constants.statusBarHeight}px;
`

const Nav = styled.View`
    width: 100%;
    height: 50px;
    background-color: #10a17d;
    flex-direction: row;
    align-items: center;
`

const ButtonBack = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    justify-content: center;
    align-items: center;
`

const TextLogin = styled.Text`
    color: white;
    font-size: 18px;
    font-weight: 500;
`

const Header = styled.View`
    width: 100%;
    height: ${height - 50}px;
    padding: 10px;
    justify-content: center;
    align-items: center;
`

const TouchLogin = styled.TouchableOpacity`
    width: 70%;
    height: 60px;
    border-radius: 8px;
    background-color: red;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    border-width: 2px;
    border-color: white;
`
