import { ComentarioService } from "../../service/comentario/ComentarioService";
import { Client } from "stompjs";
import { Publicacao } from "../../../model/Publicacao";
import { Comentario } from "../../../model/Comentario";
import { ComentarioInterface } from "../../service/comentario/Interface";

export class ComentarioController {
    private comentarioService: ComentarioService;

    /**
     * Construtor que constrói o serviço de comentários.
     * 
     * @param {MutableRefObject<Client | null>} webSocket - WebSocket usado para enviar e receber os comentários.
    **/
    constructor(webSocket: Client) {
        this.comentarioService = new ComentarioService(webSocket);
    }

    /**
     * Envia um comentário
     * 
     * @param publicacao 
     * @param message 
     * @returns {boolean} - Booleano para informar se foi possivel enviar ou não.
    **/
    public sendComentario(publicacao: Publicacao, message: string): boolean {
        return this.comentarioService.sendComentario(publicacao, message);
    }

    /**
     * Atualiza a lista de comentários.
     * 
     * @param {number} id - ID do usuário.
     * @param {any} message - Mensagem do novo comentário.
     * @param {Comentario[]} comentarios - Comentarios dos usuários já feitos.
     * @returns Retorna uma Promise com os comentários atualizados.
    **/
    public async updateComentario(id: number, message: any, comentarios: Comentario[]): Promise<Comentario[]> {
        return (await this.comentarioService.updateComentario(id, message, comentarios));
    }

    /**
     * Pega todos os comentários de uma publicação específica.
     * 
     * @param {Publicacao} publicacao - Publicação específica de algum usuário.
     * @returns {Comentario[]} - Retorna uma Promise da lista de comentários da publicação.
    **/
    public async getComentariosprops(publicacao: Publicacao): Promise<Comentario[]> {
        return this.comentarioService.getComentariosprops(publicacao);
    }

    /**
     * Lista de comentários.
     * 
     * @param {ComentarioInterface[]} data - Dados dos comentários.
     * @returns {Comentario[]} - Lista de comentários.
    **/
    public listarComentarios(data: ComentarioInterface[]): Comentario[] {
        return this.comentarioService.listarComentarios(data);
    }

}