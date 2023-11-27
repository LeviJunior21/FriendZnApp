export interface UsuarioInterface {
    id: number, 
    apelido: string
}

export interface ComentarioInterface {
    id: number,
    comentario: string,
    usuario: UsuarioInterface
}