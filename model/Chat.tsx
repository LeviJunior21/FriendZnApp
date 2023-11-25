import { Conversa, conversaBuilder } from "./Conversa";

export class Chat {
    private conversas: Conversa[];
    private timestamp: Date;
    private remetente: number;

    constructor(builder: ChatBuilder) {
        this.conversas = builder.getConversas();
        this.timestamp = builder.getTimestamp();
        this.remetente = builder.getRemetente();
    }

    public getTimestamp(): Date {
        return this.timestamp;
    }

    public getConversas(): Conversa[] {
        return this.conversas;
    }

    public getRemetente(): number {
        return this.remetente;
    }

    public setConversas(conversas: Conversa[]): void {
        this.conversas = conversas;
    }

    static builder(): ChatBuilder {
        return new ChatBuilder();
    }
}

class ChatBuilder {
    private conversas: Conversa[] = [];
    private timestamp!: Date;
    private remetente!: number;
    
    public withConversas(conversas: Conversa[]): ChatBuilder {
        this.conversas = conversas;
        return this;
    }

    public withTimestamp(timestamp: Date): ChatBuilder {
        this.timestamp = timestamp;
        return this;
    }

    public withRemetente(remetente: number): ChatBuilder {
        this.remetente = remetente;
        return this;
    }

    public getTimestamp(): Date {
        return this.timestamp;
    }

    public getConversas(): Conversa[] {
        return this.conversas;
    }

    public getRemetente(): number {
        return this.remetente;
    }

    public build(): Chat {
        return new Chat(this);
    }
}

export const chatBuilder = (recoveredChat:any): Chat => {
    const conversas:Conversa[] = recoveredChat.conversas.map(
        (item:any) => conversaBuilder(item)
    );
    const newChat:Chat = Chat.builder()
        .withConversas(conversas)
        .withRemetente(recoveredChat.remetente)
        .withTimestamp(new Date(recoveredChat.timestamp))
        .build();
    return newChat;
}
