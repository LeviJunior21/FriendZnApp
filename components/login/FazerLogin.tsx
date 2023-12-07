import React, { useContext, useEffect } from 'react';
import styled from 'styled-components/native';
import Icon from "react-native-vector-icons/Ionicons";
import * as WebBrowser from "expo-web-browser";
import { UserInfoProps } from '../../utils/interfaces';
import { Dimensions } from 'react-native';
import { buscarInformacoesGitHub, discovery } from './Config';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { verificarExistenciaGithubServidor } from '../../utils/getUsuario';
import { ContextProvider, Provider } from '../../utils/Provider';

WebBrowser.maybeCompleteAuthSession();
export default function FazerLogin(props: UserInfoProps) {
    const [request, response, promptAsync] = useAuthRequest({
            clientId: '78d452f31d2506c3b031',
            scopes: ['identity'],
            redirectUri: makeRedirectUri({
                scheme: 'friendzone'
            }),
        },
        discovery
    );

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { code } = response.params;
            buscarDadosGitHub(code);
        }
    }, [response]);

    const buscarDadosGitHub = async(code: string) => {
        const response = await buscarInformacoesGitHub(code);
        const result: boolean = await verificarExistenciaGithubServidor(response.id);
        
        if (result) {
            props.navigation.navigate("Home");
        } else {
            props.navigation.navigate("Cadastro", { navigation: props.navigation, dados: response });
        }
    }

    return (
        <Header>
            <TouchLogin onPress={() => promptAsync()}>
                <Icon name={"logo-github"} size={30} color={"white"} />
                <TextLogin>Fazer login com GitHub</TextLogin>
            </TouchLogin>
        </Header>
    );
}

const height = Dimensions.get("window").height;

const TouchLogin = styled.TouchableOpacity`
    width: 70%;
    height: 60px;
    border-radius: 8px;
    background-color: black;
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
