export enum TipoConversa {
    SENDER,
    RECEIVER
}

export class Conversa {
    private tipoConversa: TipoConversa;
    private mensagem: string;
    private timestamp: Date;

    constructor(builder: ConversaBuilder) {
        this.tipoConversa = builder.getTipoConversa();
        this.mensagem = builder.getMensagem();
        this.timestamp = builder.getTimestamp();
    }

    public getTipoConversa(): TipoConversa {
        return this.tipoConversa;
    }

    public getMensagem(): string {
        return this.mensagem;
    }

    public getTimestamp(): Date {
        return this.timestamp;
    }

    static builder(): ConversaBuilder {
        return new ConversaBuilder();
    }

}

class ConversaBuilder {
    private tipoConversa!: TipoConversa;
    private mensagem!: string;
    private timestamp!: Date;

    public withTipoConversa(tipoConversa: TipoConversa): ConversaBuilder {
        this.tipoConversa = tipoConversa;
        return this;
    }

    public withMensagem(mensagem: string): ConversaBuilder {
        this.mensagem = mensagem;
        return this;
    }

    public withTimestamp(timestamp: Date): ConversaBuilder {
        this.timestamp = timestamp;
        return this;
    }

    public getTipoConversa(): TipoConversa {
        return this.tipoConversa;
    }

    public getMensagem(): string {
        return this.mensagem;
    }

    public getTimestamp(): Date {
        return this.timestamp;
    }

    public build(): Conversa {
        return new Conversa(this);
    }
}



