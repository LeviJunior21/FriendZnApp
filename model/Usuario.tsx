export class Usuario {
    private id: number;
    private apelido: string;
    private emoji: string;

    constructor(builder: UsuarioBuilder) {
        this.id = builder.id;
        this.apelido = builder.apelido;
        this.emoji = builder.emoji;
    }
  
    public getId(): number {
        return this.id;
    }
  
    public getApelido(): string {
        return this.apelido;
    }

    public getEmoji(): string {
      return this.emoji;
    }

    equals(other: Usuario): boolean {
      return this.id === other.id;
    }

    static builder(): UsuarioBuilder {
        return new UsuarioBuilder();
    }
}

class UsuarioBuilder {
    id!: number;
    apelido!: string;
    emoji!: string;
  
    withId(id: number): UsuarioBuilder {
      this.id = id;
      return this;
    }
  
    withApelido(apelido: string): UsuarioBuilder {
      this.apelido = apelido;
      return this;
    }
  
    withEmoji(emoji: string): UsuarioBuilder {
      this.emoji = emoji;
      return this;
    }
  
    build(): Usuario {
      return new Usuario(this);
    }
}
