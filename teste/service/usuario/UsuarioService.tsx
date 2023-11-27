import { Usuario } from "../../../model/Usuario";

export class UsuarioService {
    private uri_usuario: string;

    /**
     * Consrói o serviço do usuário.
    **/
    constructor() {
        this.uri_usuario = "http://10.0.0.181:8080/v1/usuarios";
    }

    /**
     * Busca as informações do usuário no servidor.
     * 
     * @param {number} id - ID do usuário.
     * @returns {Promise<Usuario>} - Retorna uma Promise com os dados do usuário.
    **/
    public async getUsuario(id: number):Promise<Usuario> {
        try {
            const response = await fetch(`${this.uri_usuario}/usuario/${id}`);
            if (response.ok) {
                const data = await response.json();
                const usuario: Usuario = Usuario.builder()
                    .withId(data.id)
                    .withApelido(data.apelido)
                    .build();
    
                return usuario;
            }
            else {
                return Usuario.builder().build();
            }
        }
        catch(e) {
            return Usuario.builder().build();
        }
    }
       
}