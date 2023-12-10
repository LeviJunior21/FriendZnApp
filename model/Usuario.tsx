export class Usuario {
    private id: number;
    private apelido: string;
  
    constructor(builder: UsuarioBuilder) {
        this.id = builder.id;
        this.apelido = builder.apelido;
    }
  
    public getId(): number {
        return this.id;
    }
  
    public getApelido(): string {
        return this.apelido;
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
  
    withId(id: number): UsuarioBuilder {
      this.id = id;
      return this;
    }
  
    withApelido(apelido: string): UsuarioBuilder {
      this.apelido = apelido;
      return this;
    }
  
    build(): Usuario {
      return new Usuario(this);
    }
}
