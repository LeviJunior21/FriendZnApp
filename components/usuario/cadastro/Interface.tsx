import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../utils/interfaces";
import { SexoSelecionado } from "./Sexo";
import { Dispatch, SetStateAction } from "react";
import { LoginType } from "../utils/LoginType";

export interface CadastroProps {
    loginType: LoginType;
    navigation: NavigationProp<RootStackParamList, "Home">;
    route: {
        params: {
            dados: any
        };
    };
}

export interface LoginCadastro { 
    apelido: string;
    email: string;
    codigoAcesso: number;
    idade: number;
    sexo: SexoSelecionado,
    loginType: LoginType
}

export interface LoginCadastroReturns { 
    id: number;
    apelido: string;
    email: string;
    codigoAcesso: number;
    idade: number;
    sexo: SexoSelecionado,
    loginType: LoginType,
    descricao: string
}

export interface CadastroActionProps {
    dadosUsuario: LoginCadastro;
    setMeusDados: Dispatch<SetStateAction<LoginCadastroReturns>>
}