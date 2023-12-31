import styled from "styled-components/native";
import Constants from "expo-constants";
import FazerLogin from "./FazerLogin";
import { StatusBar } from "expo-status-bar";
import { Navigation, UserInfo } from "../../utils/interfaces";
import { Dimensions } from "react-native";
import { useState } from "react";

export default function Login(props: Navigation) {
    const [userInfo, setUserInfo] = useState<UserInfo>();

    return (
        <Container>
            <StatusBar backgroundColor={"white"}/>
            <Nav>
                <TextLogin>Fazer Login</TextLogin>
            </Nav>
            <FazerLogin 
            navigation={props.navigation} 
            userInfo={userInfo} 
            setUserInfo={setUserInfo}/>
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
    padding-horizontal: 10px;
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
