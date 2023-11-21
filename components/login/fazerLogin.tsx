import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Icon from "react-native-vector-icons/Ionicons";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { UserInfoProps } from '../../utils/interfaces';
import { Dimensions } from 'react-native';

WebBrowser.maybeCompleteAuthSession();
export default function FazerLogin(props: UserInfoProps) {
    const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '692576055710-0fv2a6lht7m40ocr76jc8e38ees33tq7.apps.googleusercontent.com',
        androidClientId: '692576055710-0fv2a6lht7m40ocr76jc8e38ees33tq7.apps.googleusercontent.com',
        webClientId: '692576055710-0fv2a6lht7m40ocr76jc8e38ees33tq7.apps.googleusercontent.com',
    });

    useEffect(() => {
        const getUserData = async() => {
            let useInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
                headers: {Authorization: `Bearer ${accessToken}`}
            });
            useInfoResponse.json().then(data => {
                props.setUserInfo(data);
            });
        }
        if (accessToken) {
            getUserData();
        }
    }, [accessToken]);

    useEffect(() => {
        if (response?.type == "success" && response.authentication) {
            setAccessToken(response.authentication.accessToken);
        }
    }, [response]);

    const logar = async() => {
        const YOUR_CLIENT_ID = "692576055710-0fv2a6lht7m40ocr76jc8e38ees33tq7.apps.googleusercontent.com";
        const REDIRECT_URI = "exp://10.0.0.181:8081";

        const result = await WebBrowser.openAuthSessionAsync(
            `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${YOUR_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile&access_type=offline&state=1234_purpleGoogle&prompt=consent`,
            REDIRECT_URI
        );
    
        if (result.type === "success") {
            const params = JSON.parse(result.url);
            const { email, name, picture } = params.queryParams;    
            const user = {
              email,
              name,
              picture,
            };
        }
    }

    return (
        <Header>
            <TouchLogin onPress={() => logar()}>
                <Icon name={"logo-google"} size={30} color={"white"} />
                <TextLogin>Fazer login com a Google</TextLogin>
            </TouchLogin>
        </Header>
    );
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
