import { Dispatch, SetStateAction } from "react";
import { keyUser, uri_principal } from "../../data/constants";
import { LoginCadastroReturns } from "../usuario/cadastro/Interface";
import AsyncStorage from "@react-native-async-storage/async-storage";

const bandeiras = [{ emoji: "🇧🇷" }, { emoji: "🇨🇦" }, { emoji: "🇺🇸" }, { emoji: "🇦🇷" }, { emoji: "🇺🇾" }, { emoji: "🇲🇽" }, { emoji: "🇻🇪" }, { emoji: "🇯🇲" }]
const animais = [{ emoji: "🐶" }, { emoji: "🐢" }, { emoji: "🦖" }, { emoji: "🦕" }, { emoji: "🦀" }, { emoji: "🦀" }, { emoji: "🐬" }, { emoji: "🦭" }]
export const emojis = [{ titulo: "Bandeiras paises", emojis: bandeiras }, { titulo: "Animais", emojis: animais }]

export const alterarEmoji = async (indexArray: number, indexEmoji: number, setAberto: Dispatch<SetStateAction<boolean>>, meusDados: LoginCadastroReturns, setMeusDados: Dispatch<SetStateAction<LoginCadastroReturns>>): Promise<void> => {
    let emoji: string = "";

    if (meusDados.id !== -1 && meusDados.codigoAcesso !== -1) {
        if (indexArray !== -1 && indexEmoji !== -1) {
            emoji = emojis[indexArray].emojis[indexEmoji].emoji;
        }

        const dados = {
            emoji: emoji,
            codigoAcesso: meusDados.codigoAcesso
        };
        
        const url: string = uri_principal + `/v1/usuarios/usuario/${meusDados.id}/emoji`;

        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        if (response.ok) {
            await gravarEmoji(emoji, setAberto, meusDados, setMeusDados);
        }
    }
}

const gravarEmoji = async (emoji: string, setAberto: Dispatch<SetStateAction<boolean>>, meusDados: LoginCadastroReturns, setMeusDados: Dispatch<SetStateAction<LoginCadastroReturns>>): Promise<void> => {
    meusDados.emoji = emoji;
    const dadosAsync = await AsyncStorage.getItem(keyUser);
    if (dadosAsync !== null) {
        const dadosUser = JSON.parse(dadosAsync);
        dadosUser.emoji = emoji;
        await AsyncStorage.setItem(keyUser, JSON.stringify(dadosUser));
        setMeusDados(meusDados)
    }
    setAberto(false);
}
