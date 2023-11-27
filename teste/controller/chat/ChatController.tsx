import { Client } from "stompjs";
import { ChatService } from "../../service/chat/ChatService";
import { Chat } from "../../../model/Chat";
import { Conversa } from "../../../model/Conversa";

export class ChatController {
    private chatService: ChatService;;

    /**
    * @param {Client} webSock - WebSock conectado.
    * @param {string} keyBDChat - Chave do Banco de Dados AsyncStorage.
    * @param {number} myID - ID do usuário local.
    **/
    constructor(webSock: Client, keyBDChat: string, myID: number) {
        this.chatService = new ChatService(webSock, keyBDChat, myID);
    }

    /**
     * Carrega todos os chats.
     * 
    **/
    public async carregarChats(): Promise<void> {
        this.chatService.carregarChats();
    }

    /**
     * Envia uma mensagem de chat para um destinatário.
     * 
     * @param {string} mensagem - Mensagem a ser enviada.
     * @param {number} remetente - ID do remetente.
     * @param {number} receptor - ID do receptor.
    **/
    public async enviarChat(
        mensagem: string, 
        remetente: number, 
        receptor: number, 
    ): Promise<void> {
        this.chatService.enviarChat(mensagem, remetente, receptor);
    }

    /**
     * Busca a última conversa de um remetente.
     * 
     * @param {number} remetente - ID do remetente da conversa.
    **/
    public async buscarUltimaConversa(
        remetente: number,
    ): Promise<void> {
        this.chatService.buscarUltimaConversa(remetente);
    }

    /**
     * Busca um chat específico de um remetente.
     * 
     * @param {number} idRemetente - ID do remetente.
     * @returns {Promise<Chat>} - Uma Promise que resolve para um Chat encontrado.
    **/
    public async buscarChat(idRemetente: number): Promise<Chat> {
        return this.chatService.buscarChat(idRemetente);
    }

    /**
     * Ler todos os chats salvos localmente.
     * 
     * @return {Promise<Chat[]>} - Uma Promise que resolve para um array de objetos Chat.
    **/
    public async lerChats(): Promise<Chat[]> {
        return this.chatService.lerChats();
    }

    /**
     * Ler todas as conversas do chat de um remetente.
     * 
     * @param {number} remetente - id do remetente.
     * @return {Promise<Conversa[]>} - Uma Promise que resolve para um array de objetos Comentario.
    **/
    public async lerConversaDoChat(remetente: number): Promise<Conversa[]> {
        return this.chatService.lerConversaDoChat(remetente);
    }

    /**
     * Grava um chat específico localmente.
     * 
     * @param {Chat} newChat - Novo chat.
    **/
    public async gravarChat(newChat:Chat): Promise<void> {
        this.chatService.gravarChat(newChat);
    }


    /**
     * Salva a conversa e retorna todos os chats atualizados.
     * 
     * @param {Conversa} newConversa - Nova conversa.
    **/
    public async atualizarChats(newConversa: Conversa): Promise<Chat[]> {
        return this.chatService.atualizarChats(newConversa);
    }


    /**
     * Carrega as conversas do chat de um remetente.
     * 
     * @param {number} idRemetente - ID do remetente.
    **/
    public async carregarConversas(idRemetente: number): Promise<void> {
        this.chatService.carregarConversas(idRemetente);
    }
    
    /**
     * Apaga um chat específico localmente.
     * 
     * @param {number} idRemetente - Novo chat.
    **/
    public async deleteChat(idRemetente: number): Promise<void> {
        this.chatService.deleteChat(idRemetente);
    }

    /**
     * Grava a conversa dentro do chat do remetente.
     * 
     * @param {Conversa} newConversa - Conversa a ser gravada.
     * @returns {Promise<Chat[]>} - Uma Promise que resolve para um array de objetos Chat.
    **/
    public async gravarConversa(newConversa: Conversa):Promise<Chat[]> {
        return this.chatService.gravarConversa(newConversa);
    }

    /**
     * Converte string para JSON de conversa.
     * 
     * @param {any} data - dados da conversa.
     * @returns {Object} - Retorna um objeto JSON com os dados da conversa.
    **/
    public conversaSubcribeToJSON(data: any): Object {
        return this.chatService.conversaSubcribeToJSON(data);
    }
}