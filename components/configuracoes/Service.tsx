import AsyncStorage from "@react-native-async-storage/async-storage";
import { dadosIniciaisUsuario, keyBDChat, keyUser } from "../../data/constants";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../utils/interfaces";
import { Dispatch, SetStateAction } from "react";
import { LoginCadastroReturns } from "../usuario/cadastro/Interface";
import { Chat } from "../../model/Chat";

interface DeslogarProps {
    navigation: NavigationProp<RootStackParamList, "Home">;
    setChatData: Dispatch<SetStateAction<Chat[]>>;
    setMeusDados: Dispatch<SetStateAction<LoginCadastroReturns>>;
    id: number
}
export const deletarDados = async(props: DeslogarProps) => {
    try {
        await fetch(`http://10.0.0.181:8080/v1/usuarios/id/${props.id}`, {
            method: "DELETE", 
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            deslogar({navigation: props.navigation, setChatData: props.setChatData, setMeusDados: props.setMeusDados, id:props.id});
            props.navigation.navigate("Home");
        });
    }
    catch(e: any) {}
}

export const deslogar = async(props: DeslogarProps) => {
    try {
        AsyncStorage.setItem(keyUser, JSON.stringify(dadosIniciaisUsuario));
        AsyncStorage.setItem(keyBDChat, JSON.stringify([]));
        props.setMeusDados(dadosIniciaisUsuario);
        props.setChatData([]);
        props.navigation.navigate("Home");
    } catch(e: any) {}
}