import { Client } from "stompjs";
import { Chat, chatBuilder } from "../../../model/Chat";
import { Conversa } from "../../../model/Conversa";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class ChatService {
    private webSock: Client;
    private keyBDChat: string;
    private myID: number;

    /**
    * @param {MutableRefObject<Client | null>} webSock - WebSock conectado.
    * @param {string} keyBDChat - Chave do Banco de Dados AsyncStorage.
    * @param {number} myID - ID do usuário local.
    **/
    constructor(webSock: Client, keyBDChat: string, myID: number) {
        this.webSock = webSock;
        this.keyBDChat = keyBDChat;
        this.myID = myID;
    }

    /**
     * Carrega todos os chats.
    **/
    public async carregarChats(): Promise<Chat[]> {
        return await this.lerChats();
    }

    /**
     * Envia uma mensagem de chat para um destinatário.
     * 
     * @param {string} mensagem - Mensagem a ser enviada.
     * @param {number} remetente - ID do remetente.
     * @param {number} receptor - ID do receptor.
     * @returns {boolean} - Retorna um booleano se foi possivel enviar.
    **/
    public async enviarChat(
        mensagem: string, 
        remetente: number, 
        receptor: number, 
    ): Promise<boolean> {
        if (mensagem.length > 0 && this.webSock.connected) {
            const messageJSON = {
                mensagem: mensagem,
                timestamp: new Date(),
                remetente: remetente,
                receptor: receptor
            };
            const WsMensagemPrivada: string = "/app/private-message";
            try {
                this.webSock.send(WsMensagemPrivada, {}, JSON.stringify(messageJSON));
                return true;
            } catch(e: any) {}
        } else {
            console.error("Erro: WebSocket não conectado");
        }
        return false;
    };

    /**
     * Busca a última conversa de um remetente.
     * 
     * @param {number} remetente - ID do remetente da conversa.
     * @returns {string} - Retorna a última conversa do remetente.
     */
    public async buscarUltimaConversa(
        remetente: number,
    ): Promise<string> {
        const chat:Chat = await this.buscarChat(remetente);
        const conversas:Conversa[] = chat.getConversas();
        const ultimaConversa:Conversa = conversas[conversas.length - 1];
        return ultimaConversa.getMensagem();
    }

    /**
     * Busca um chat específico de um remetente.
     * 
     * @param {number} idRemetente - ID do remetente.
     * @returns {Promise<Chat>} - Uma Promise que resolve para um Chat encontrado.
     */
    public async buscarChat(idRemetente: number): Promise<Chat> {
        const chats:Chat[] = await this.lerChats();
        const index:number = chats.findIndex((chat:Chat) => chat.getRemetente() === idRemetente);
        if (index !== -1) { return chats[index] }
        return Chat.builder().build();
    }

    /**
     * Ler todos os chats salvos localmente.
     * 
     * @return {Promise<Chat[]>} - Uma Promise que resolve para um array de objetos Chat.
    **/
    public async lerChats(): Promise<Chat[]> {
        try {
            const recoveryChat = await AsyncStorage.getItem(this.keyBDChat);
            if (recoveryChat != null) {
                const recoveredChat = JSON.parse(recoveryChat);
                const todosChats:Chat[] = recoveredChat.map((item:any) => { return chatBuilder(item) })
                return todosChats;
            }
        } catch(e) {}
        return [];
    }

    /**
     * Ler todas as conversas do chat de um remetente.
     * 
     * @param {number} remetente - id do remetente.
     * @return {Promise<Conversa[]>} - Uma Promise que resolve para um array de objetos Comentario.
    **/
    public async lerConversaDoChat(remetente: number): Promise<Conversa[]> {
        const chat:Chat = await this.buscarChat(remetente);
        return chat.getConversas();
    }

    /**
     * Grava um chat específico localmente.
     * 
     * @param {Chat} newChat - Novo chat.
    **/
    public async gravarChat(newChat:Chat): Promise<void> {
        const chats = await this.lerChats();
        const newChats = [...chats, newChat];
        const conversasJSONString = JSON.stringify(newChats);
        AsyncStorage.setItem(this.keyBDChat, conversasJSONString);''
    }

    /**
     * Salva a conversa e retorna todos os chats atualizados.
     * 
     * @param {Conversa} newConversa - Nova conversa.
     */
    public async atualizarChats(newConversa: Conversa): Promise<Chat[]> {
        return await this.gravarConversa(newConversa);
    }

    /**
     * Carrega as conversas do chat de um remetente.
     * 
     * @param {number} idRemetente - ID do remetente.
     */
    public async carregarConversas(idRemetente: number): Promise<Conversa[]> {
        const chatEncontrado:Chat = await this.buscarChat(idRemetente);
        return [...chatEncontrado.getConversas()];
    }

    /**
     * Apaga um chat específico localmente.
     * 
     * @param {number} idRemetente - Novo chat.
    **/
    public async deleteChat(idRemetente: number): Promise<void> {
        const chats:Chat[] = await this.lerChats();
        const index:number = chats.findIndex(chat => chat.getRemetente() === idRemetente);
        if (index !== -1) {
            chats.splice(index, 1);
            AsyncStorage.setItem(this.keyBDChat, JSON.stringify(chats));
        }
    }

    /**
     * Grava a conversa dentro do chat do remetente.
     * 
     * @param {Conversa} newConversa - Conversa a ser gravada.
     * @returns {Promise<Chat[]>} - Uma Promise que resolve para um array de objetos Chat.
    **/
    public async gravarConversa(newConversa: Conversa):Promise<Chat[]> {
        const chats:Chat[] = await this.lerChats();
        let indexChat:number = -1;
        let remetente:number = 1;

        try {
            if (this.myID == newConversa.getRemetente()) {
                indexChat = chats.findIndex((chat:Chat) => chat.getRemetente() === newConversa.getReceptor());
                remetente = newConversa.getReceptor()
            } else {
                indexChat = chats.findIndex((chat:Chat) => chat.getRemetente() === newConversa.getRemetente());
                remetente = newConversa.getRemetente();
            }

            if (indexChat !== -1) {
                chats[indexChat].setConversas([...chats[indexChat].getConversas(), newConversa]);
            } else {
                const dadosNecessarios = {
                    conversas: [newConversa], 
                    remetente: remetente, 
                    timestamp: newConversa.getTimestamp()
                };
                const newChat:Chat = chatBuilder(dadosNecessarios);
                chats.push(newChat);
            }

            const chatJSONString = JSON.stringify(chats);
            AsyncStorage.setItem(this.keyBDChat, chatJSONString);
            return chats;
        }
        catch(e) {
            return chats;
        }
    }

    /**
     * Converte string para JSON de conversa.
     * 
     * @param {any} data - dados da conversa.
     * @returns {Object} - Retorna um objeto JSON com os dados da conversa.
    **/
    public conversaSubcribeToJSON(data: any): Object {
        return {
            receptor: data.receptor,
            remetente: data.remetente,
            mensagem: data.mensagem,
            timestamp: data.timestamp,
            tipoConversa: data.tipoConversa
        }
    }
    
}