import styled from 'styled-components/native';
import Icon from "react-native-vector-icons/Ionicons";
import * as WebBrowser from "expo-web-browser";
import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { FazerLoginProps, FazerLoginStateProps } from './Interface';

WebBrowser.maybeCompleteAuthSession();
export class FazerLogin extends Component<FazerLoginProps, FazerLoginStateProps> {
    constructor(props: FazerLoginProps) {
        super(props);

        this.state = {
            userInfo: props.userInfo,
            setUserInfo: props.setUserInfo
        }
    }

    public logar(): void {

    }

    render() {
        return (
           <Header>
                <TouchLogin onPress={() => this.logar}>
                    <Icon name={"logo-google"} size={30} color={"white"} />
                    <TextLogin>Fazer login com a Google</TextLogin>
                </TouchLogin>
           </Header>
       );
    }
}

const height = Dimensions.get("window").height;
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
