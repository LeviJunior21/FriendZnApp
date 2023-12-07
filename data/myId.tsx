import AsyncStorage from "@react-native-async-storage/async-storage";
import { keyUser } from "./constants";

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
