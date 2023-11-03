import { Comentario } from "./Comentario";
import { Usuario } from "./Usuario";

export class Publicacao {
    private id: number;
    private publicacao: string;
    private date: Date;
    private usuario: Usuario;
    private comentarios: Comentario[] = [];
    
    constructor(builder: PublicacaoBuilder) {
        this.id = builder.id;
        this.publicacao = builder.publicacao;
        this.date = builder.date;
        this.usuario = builder.usuario;
        this.comentarios = builder.comentarios;
    }

    public getId(): number {
        return this.id;
    }

    public getPublicacao(): string {
        return this.publicacao;
    }

    public getDate(): Date {
        return this.date;
    }

    public getUsuario(): Usuario {
        return this.usuario;
    }

    public getComentarios(): Comentario[] {
        return this.comentarios;
    }

    static builder(): PublicacaoBuilder {
        return new PublicacaoBuilder();
    }
}

class PublicacaoBuilder {
    id!: number;
    publicacao!: string;
    date!: Date;
    usuario!: Usuario;
    comentarios: Comentario[] = [];

    withId(id: number): PublicacaoBuilder {
        this.id = id;
        return this;
    }

    withPublicacao(publicacao: string): PublicacaoBuilder {
        this.publicacao = publicacao;
        return this;
    }

    withDate(date: Date): PublicacaoBuilder {
        this.date = date;
        return this;
    }

    withUsuario(usuario: Usuario): PublicacaoBuilder {
        this.usuario = usuario;
        return this;
    }

    withComentarios(comentarios: Comentario[]): PublicacaoBuilder {
        this.comentarios = comentarios;
        return this;
    }

    build(): Publicacao {
        return new Publicacao(this);
    }
}
