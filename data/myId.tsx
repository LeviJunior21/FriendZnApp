import AsyncStorage from "@react-native-async-storage/async-storage";
import { keyUser } from "./constants";
import { Dispatch, SetStateAction } from "react";

export const myInfo = async(): Promise<any> => {
    let result = { myID: null, myIDAuth: null };

    try {
        const info = await AsyncStorage.getItem(keyUser);

        if (info != null) {
            const dadosJSON = await JSON.parse(info);
            result = dadosJSON;
        } else {
        }
    }
    catch(e: any) {}

    return result;
};

export const carregarMyID = async(setMeusDados: Dispatch<SetStateAction<any>>): Promise<boolean> => {
    let result: boolean = false;

    try {
        const dados: string | null = await AsyncStorage.getItem(keyUser);
        if (dados != null) {
            const dadosJSON: any = await JSON.parse(dados);
            setMeusDados(dadosJSON);
            if (dadosJSON.idServer != null && dadosJSON.idAuth != null) {
                result = true;
            }
        } 
    } catch(e: any) {}

    return result;
}
