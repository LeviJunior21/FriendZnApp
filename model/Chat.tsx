import { Conversa } from "./Conversa";

export class Chat {
    private conversas: Conversa[];
    private timestamp: Date;
    private remetente: string;

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

    public getRemetente(): string {
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
    private conversas!: Conversa[];
    private timestamp!: Date;
    private remetente!: string;
    
    public withConversas(conversas: Conversa[]): ChatBuilder {
        this.conversas = conversas;
        return this;
    }

    public withTimestamp(timestamp: Date): ChatBuilder {
        this.timestamp = timestamp;
        return this;
    }

    public withRemetente(remetente: string): ChatBuilder {
        this.remetente = remetente;
        return this;
    }

    public getTimestamp(): Date {
        return this.timestamp;
    }

    public getConversas(): Conversa[] {
        return this.conversas;
    }

    public getRemetente(): string {
        return this.remetente;
    }

    public build(): Chat {
        return new Chat(this);
    }
}
