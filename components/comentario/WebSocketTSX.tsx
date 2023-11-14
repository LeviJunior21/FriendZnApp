import { Comentario } from "../../model/Comentario";

class WebSocketTSX {
    private webSocket: WebSocket;

    constructor(server: string) {
       this.webSocket = new WebSocket(server);
    }

    openSocket(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.webSocket.onopen = () => {
                console.log("Conectado ao WebSocket.");
                resolve();
            };
            this.webSocket.onerror = (err) => {
                console.error("Erro ao conectar ao WebSocket:", err);
                reject(err);
            };
        });
    }

    onMessage(callback: (comentario: Comentario) => void): void {
        this.webSocket.onmessage = (e) => {
            try {
                const data = JSON.parse(e.data);
                console.log(data);
    
                const newComentario = Comentario.builder()
                    .withComentario(data.comentario)
                    .withId(data.id)
                    .withUsuario(data.usuario ? data.usuario.apelido : "Usuario Teste")
                    .build();
    
                callback(newComentario);
            } catch (error) {
                console.error("Erro ao processar mensagem WebSocket:", error);
            }
        };
    }

    onClose(): void {
        this.webSocket.onclose = (e) => {
            console.log("Conexão fechada", e.code, e.reason);
        }
    }

    onSend(destination: string, message: string): Promise<void> {
        const messageJSON = {
            comentario: message,
            codigoAcesso: 12345
        };
        const stringData: string = JSON.stringify(messageJSON);

        return new Promise((resolve, reject) => {
            try {
                this.webSocket.send(destination + stringData);
                console.log('Mensagem enviada com sucesso.');
                resolve();
            } catch (error) {
                console.error('Erro ao enviar mensagem:', error);
                reject(error);
            }
        });
    }
    
    close(): void {
        this.webSocket.close();
    }

    onError(): void {
        this.webSocket.onerror = (e) => {
            console.error("Erro no WebSocket:", e);
        }
    }

    onReconnect(): void {
        setInterval(() => {
            if (this.webSocket.readyState !== WebSocket.OPEN) {
                console.log("Tentando reconectar...");
                this.openSocket();
            }
        }, 5000);
    }
}

export default WebSocketTSX;
