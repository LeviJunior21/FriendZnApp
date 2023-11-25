import AsyncStorage from "@react-native-async-storage/async-storage";
import { Chat, chatBuilder } from "../model/Chat";
import { Conversa } from "../model/Conversa";

/**
* @param {Conversa} newConversa - Conversa a ser gravada.
* @param {string} key - Chave do banco AsyncStorage.
* @returns {Promise<Chat[]>} - Uma Promis que resolve para um array de objetos Chat.
**/
export const gravarConversa = async(newConversa: Conversa, key: string):Promise<Chat[]> => {
    const chats:Chat[] = await lerChats(key);
    try {
        const index = chats.findIndex((chat:Chat) => chat.getRemetente() === newConversa.getRemetente());
        if (index !== -1) {
            chats[index].setConversas([...chats[index].getConversas(), newConversa]);
        } else {
            const dadosNecessarios = {
                conversas: [newConversa], 
                remetente: newConversa.getRemetente(), 
                timestamp: newConversa.getTimestamp()
            };
            const newChat:Chat = chatBuilder(dadosNecessarios);
            chats.push(newChat);
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
    const chat:Chat = await buscarChat(remetente, key);
    return chat.getConversas();
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
            const todosChats:Chat[] = recoveredChat.map((item:any) => { return chatBuilder(item) })
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

/**
@param {number} idRemetente - Novo chat.
@param {string} key - Chave do banco AsyncStorage.
@returns {Promise<Chat>} - Uma Promise que resolve para um Chat encontrado.
**/
export const buscarChat = async(idRemetente: number, key: string): Promise<Chat> => {
    const chats:Chat[] = await lerChats(key);
    const index:number = chats.findIndex((chat:Chat) => chat.getRemetente() === idRemetente);
    if (index !== -1) { return chats[index] }
    return Chat.builder().build();
}

/**
@param {number} idRemetente - Novo chat.
@param {string} key - Chave do banco AsyncStorage.
**/
export const deleteChat = async(idRemetente: number, key: string) => {
    const chats:Chat[] = await lerChats(key);
    const index:number = chats.findIndex(chat => chat.getRemetente() === idRemetente);
    if (index !== -1) {
        chats.splice(index, 1);
        AsyncStorage.setItem(key, JSON.stringify(chats));
    }
}
