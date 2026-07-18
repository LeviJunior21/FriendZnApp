import { Usuario } from "./Usuario";

export class Comentario {
    private id: number;
    private comentario: string;
    private usuario: Usuario;
    private timestamp: Date;
    private respostaComentarioId?: number;

    constructor(builder: ComentarioBuilder) {
        this.id = builder.id;
        this.comentario = builder.comentario;
        this.usuario = builder.usuario;
        this.timestamp = builder.timestamp;
        this.respostaComentarioId = builder.respostaComentarioId;
    }
  
    public getId(): number {
        return this.id;
    }

    public getComentario(): string {
        return this.comentario;
    }

    public getUsuario(): Usuario {
        return this.usuario;
    }

    public getTimestamp(): Date {
        return this.timestamp;
    }

    public getRespostaComentarioId(): number | undefined {
      return this.respostaComentarioId;
    }

    static builder(): ComentarioBuilder {
        return new ComentarioBuilder();
    }
}
  
class ComentarioBuilder {
    id!: number;
    comentario!: string;
    usuario!: Usuario;
    timestamp!: Date;
    respostaComentarioId?: number;
  
    withId(id: number): ComentarioBuilder {
      this.id = id;
      return this;
    }
  
    withComentario(comentario: string): ComentarioBuilder {
      this.comentario = comentario;
      return this;
    }
  
    withUsuario(usuario: Usuario): ComentarioBuilder {
      this.usuario = usuario;
      return this;
    }

    withTimestamp(timestamp: Date): ComentarioBuilder {
      this.timestamp = timestamp;
      return this;
    }

    withRespostaComentarioId(respostaComentarioId?: number): ComentarioBuilder {
      this.respostaComentarioId = respostaComentarioId;
      return this;
    }
  
    build(): Comentario {
      return new Comentario(this);
    }
}
