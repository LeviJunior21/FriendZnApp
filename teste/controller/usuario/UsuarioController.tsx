import { Usuario } from "../../../model/Usuario";
import { UsuarioService } from "../../service/usuario/UsuarioService";

export class UsuarioController {
    private usuarioService: UsuarioService;

    /**
     * Constrói o controlador do usuário.
    **/
    constructor() {
        this.usuarioService = new UsuarioService();
    }

    /**
     * Busca as informações do usuário no servidor.
     * 
     * @param {number} id - ID do usuário.
     * @returns {Promise<Usuario>} - Retorna uma Promise com os dados do usuário.
    **/
    public async getUsuario(id: number):Promise<Usuario> {
        return this.usuarioService.getUsuario(id);
    }
}
