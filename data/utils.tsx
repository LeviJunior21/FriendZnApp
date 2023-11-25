import AsyncStorage from "@react-native-async-storage/async-storage";
import { Chat, chatBuilder } from "../model/Chat";
import { Conversa } from "../model/Conversa";

/**
* @param {Conversa} newConversa - Conversa a ser gravada.
* @param {string} key - Chave do banco AsyncStorage.
**/
export const gravarConversa = async(newConversa: Conversa, key: string):Promise<Chat[]> => {
    const chats:Chat[] = await lerChats(key);
    try {
        for (let i = 0; i < chats.length; i++) {
            if (chats[i].getRemetente() == newConversa.getRemetente()) {
                chats[i].setConversas([...chats[i].getConversas(), newConversa]);
                break;
            }
        }
        const chatJSONString = JSON.stringify(chats);
        AsyncStorage.setItem(key, chatJSONString);
        return chats;
    }
    catch(e) {
        return chats;
    }
}

/**
* @param {number} remetente - id do remetente.
* @param {string} key - Chave do banco AsyncStorage.
* @return {Promise<Conversa[]>} - Uma Promise que resolve para um array de objetos Comentario.
**/
export const lerConversaDoChat = async(remetente: number, key: string): Promise<Conversa[]> => {
    let conversas:Conversa[] = [];
    const chats: Chat[] = await lerChats(key);
    for (let i = 0; i < chats.length; i++) {
        if (chats[i].getRemetente() == remetente) {
            conversas = chats[i].getConversas();
            break;
        }
    }
    return conversas;
}

/**
* @param {string} key - Chave do banco AsyncStorage.
* @return {Promise<Chat[]>} - Uma Promise que resolve para um array de objetos Chat.
**/
export const lerChats = async(key: string): Promise<Chat[]> => {
    try {
        const recoveryChat = await AsyncStorage.getItem(key);
        if (recoveryChat != null) {
            const recoveredChat = JSON.parse(recoveryChat);
            const todosChats:Chat[] = recoveredChat.map((item:any) => {
                return chatBuilder(item);
            })
            return todosChats;
        }
    } catch(e) {}
    return [];
}

/**
@param {Chat} newChat - Novo chat.
@param {string} key - Chave do banco AsyncStorage.
**/
export const gravarChat = async(newChat:Chat, key: string) => {
    const chats = await lerChats(key);
    const newChats = [...chats, newChat];
    const conversasJSONString = JSON.stringify(newChats);
    AsyncStorage.setItem(key, conversasJSONString);
}

export const buscarChat = async(id: number, key: string): Promise<Chat> => {
    const chats:Chat[] = await lerChats(key);
    try {
        for (let i = 0; i < chats.length; i++) {
            if (chats[i].getRemetente() == id) {
                return chats[i];
            }
        }
        return Chat.builder().build();
    }
    catch(e) {
        return Chat.builder().build();
    }
}
