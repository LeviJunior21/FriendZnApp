import { Publicacao } from "../../../model/Publicacao";
import { Client } from "stompjs";
import { Comentario } from "../../../model/Comentario";
import { getUsuario } from "../../../utils/getUsuario";
import { ComentarioInterface } from "./Interface";
import { Usuario } from "../../../model/Usuario";

export class ComentarioService {
    private webSocket: Client;

    /**
     * Construtor que constrói o serviço de comentários.
     * 
     * @param {MutableRefObject<Client | null>} webSocket - WebSocket usado para enviar e receber os comentários.
    **/
    constructor(webSocket: Client) {
        this.webSocket = webSocket;
    }

    /**
     * Envia um comentário
     * 
     * @param publicacao 
     * @param message 
     * @returns {boolean} - Booleano para informar se foi possivel enviar ou não.
    **/
    public sendComentario(publicacao: Publicacao, message: string): boolean {
        let response:boolean = false;
        if (this.webSocket.connected) {
            const messageJSON = {
                idPublicacao: publicacao.getId(),
                comentario: message,
                timestamp: new Date(),
                codigoAcesso: 12345,
                idUsuario: 1
            };
            const subscribe: string = "/app/comentarios.sendMessage/" + publicacao.getId();
            try {
                this.webSocket.send(subscribe, {}, JSON.stringify(messageJSON));
                response = true;
            } catch(e: any) {}
        }
        return response;
    };

    /**
     * Atualiza a lista de comentários.
     * 
     * @param {number} id - ID do usuário.
     * @param {any} message - Mensagem do novo comentário.
     * @param {Comentario[]} comentarios - Comentarios dos usuários já feitos.
     * @returns Retorna uma Promise com os comentários atualizados.
    **/
    public async updateComentario(id: number, message: any, comentarios: Comentario[]): Promise<Comentario[]> {
        try {
            const comentarioRecebido = JSON.parse(message.body);
            const usuario = await getUsuario(comentarioRecebido.usuarioId);
              
            const novoComentario = Comentario.builder()
                .withComentario(comentarioRecebido.comentario)
                .withId(this.randint(1,100))
                .withUsuario(usuario)
                .build();
    
            comentarios = [...comentarios, novoComentario];
        } catch(e) {}
        return comentarios;
    }
    
    private randint(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * Pega todos os comentários de uma publicação específica.
     * 
     * @param {Publicacao} publicacao - Publicação específica de algum usuário.
     * @returns {Comentario[]} - Retorna uma Promise da lista de comentários da publicação.
    **/
    public async getComentariosprops(publicacao: Publicacao): Promise<Comentario[]> {
        try {
            const response = await fetch(`http://10.0.0.181:8080/v1/comentarios/publicacao/${publicacao.getId()}`);
    
            if (response.ok) {
                const data = await response.json();
                const comentarios = this.listarComentarios(data);
                return comentarios;
            } else {
                console.error('Ocorreu um erro na requisição HTTP');
            }
            } catch (error) {
                console.error('Ocorreu ao buscar os dados:', error);
        }
        return []
    }

    /**
     * Lista de comentários.
     * 
     * @param {ComentarioInterface[]} data - Dados dos comentários.
     * @returns {Comentario[]} - Lista de comentários.
    **/
    public listarComentarios(data: ComentarioInterface[]): Comentario[] {
        const comentarios: Comentario[] = data.map((item: ComentarioInterface) => {
            const usuario: Usuario = Usuario.builder()
                .withApelido("LeviJunior")
                .withId(1)
                .build();
    
            return Comentario.builder()
                .withComentario(item.comentario)
                .withId(item.id)
                .withUsuario(usuario)
                .build();
        })
    
        return comentarios;
    }
    
    
}