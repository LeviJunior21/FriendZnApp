export enum TipoConversa {
    SENDER,
    RECEIVER
}

export class Conversa {
    private tipoConversa: TipoConversa;
    private mensagem: string;
    private timestamp: Date;
    private remetente: number;

    constructor(builder: ConversaBuilder) {
        this.tipoConversa = builder.getTipoConversa();
        this.mensagem = builder.getMensagem();
        this.timestamp = builder.getTimestamp();
        this.remetente = builder.getRemetente();
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

    public getRemetente(): number {
        return this.remetente;
    }

    static builder(): ConversaBuilder {
        return new ConversaBuilder();
    }

}

class ConversaBuilder {
    private tipoConversa!: TipoConversa;
    private mensagem!: string;
    private timestamp!: Date;
    private remetente!: number;

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

    public withRemetente(remetente: number): ConversaBuilder {
        this.remetente = remetente;
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

    public getRemetente(): number {
        return this.remetente
    }

    public build(): Conversa {
        return new Conversa(this);
    }
}

export const conversaBuilder = (conversa: any): Conversa => {
    return Conversa.builder()
        .withMensagem(conversa.mensagem)
        .withTimestamp(new Date(conversa.timestamp))
        .withTipoConversa((conversa.tipoConversa == 2)? TipoConversa.SENDER:TipoConversa.RECEIVER)
        .withRemetente(conversa.remetente)
        .build();
}

export const conversaToJson = (conversa: Conversa):any => {
    return {
        mensagem: conversa.getMensagem(),
        timestamp: conversa.getTimestamp(),
        tipoConversa: conversa.getTipoConversa(),
        remetente: conversa.getRemetente()
    }
}
