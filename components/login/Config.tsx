import AsyncStorage from "@react-native-async-storage/async-storage";
import { dadosIniciaisUsuario, keyUser, uri_principal } from "../../data/constants";
import { LoginCadastroReturns } from "../usuario/cadastro/Interface";
import { verificarExistenciaGithubServidor } from "../../utils/getUsuario";
import { Dispatch, SetStateAction } from "react";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../utils/interfaces";

export const discovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint: 'https://github.com/settings/connections/applications/<CLIENT_ID>',
};

export const criarToken = async (code: string) => {
    const url: string = discovery.tokenEndpoint;
  
    const params = {
        client_id: '78d452f31d2506c3b031',
        client_secret: 'f348c65250ecb1922c7a6561ce4e7ce404b09747',
        code: code,
    };
  
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    });
  
    if (!response.ok) {
        throw new Error(`Erro na solicitação: ${response.status}`);
    }
  
    const responseData = await response.json();
    return responseData;
};

export const buscarInformacoesGitHub = async(code: string) => {
    const { token_type, scope, access_token } = await criarToken(code);

    const response = await fetch('https://api.github.com/user', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
        },
    })

    const data = response.json();
    return data;
}

export const buscarIDUsuarioByGitHubIdAuth = async(codigoAcesso: number): Promise<LoginCadastroReturns> => {
    let result: LoginCadastroReturns = dadosIniciaisUsuario;

    try {
        const response = await fetch(uri_principal + '/v1/usuarios/github/' + codigoAcesso);
        result = await response.json();
    } catch {}

    if (result.id == -1) {
        throw new Error("Erro")
    }

    return result;
}

export const buscarDadosGitHub = async(meusDados: LoginCadastroReturns, setMeusDados: Dispatch<SetStateAction<LoginCadastroReturns>>, code: string, navigation:  NavigationProp<RootStackParamList, "Home">) => {
    const response = await buscarInformacoesGitHub(code);
    const result: boolean = await verificarExistenciaGithubServidor(response.id);
    if (result) {
        if (meusDados.id === -1 && meusDados.codigoAcesso === -1) {
            const dados = await buscarIDUsuarioByGitHubIdAuth(response.id);
            const dadosPersistidos = {...dados, codigoAcesso: response.id};
            if (dados.id !== -1) {
                await AsyncStorage.setItem(keyUser, JSON.stringify(dadosPersistidos));
                setMeusDados(dadosPersistidos);
                navigation.navigate("Home");
            } else {
                alert("Ocorreu um erro inesperado, contate o suporte.")
            }
        }
        else {
            navigation.navigate("Home");
        }
    } else {
        navigation.navigate("Cadastro", { navigation: navigation, dados: response });
    }
}