import Icon from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { Dimensions } from "react-native";
import { Component } from "react";
import { LoginProps, LoginStateProps, UserInfo } from "./Interface";
import { FazerLogin } from "./FazerLogin";

export class Login extends Component<LoginProps, LoginStateProps> {    
    constructor(props: LoginProps) {
        super(props);

        this.state = {
            navigation: props.navigation,
            userInfo: {},
            accept: false,
            save: false,
            accessToken: "",
            loginPress: false,
            hasData: false
        }
    }

    public setUserInfo(userInfo: UserInfo) {
        this.setState({ userInfo: userInfo });
    }

    render() {
        return (
            <Container>
                <StatusBar backgroundColor={"white"}/>
                <Nav>
                    <ButtonBack onPress={() => this.state.navigation.navigate("Home")}>
                        <Icon name={"arrow-back"} size={30} color={"white"}></Icon>
                    </ButtonBack>
                    <TextLogin>Fazer Login</TextLogin>
                </Nav>
                <FazerLogin userInfo={this.state.userInfo} setUserInfo={this.setUserInfo}/>
            </Container>
        )
    }
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
