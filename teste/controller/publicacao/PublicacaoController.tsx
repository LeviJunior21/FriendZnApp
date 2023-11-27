import { Publicacao } from "../../../model/Publicacao";
import { Categoria } from "../../../utils/interfaces";
import { PublicacaoService } from "../../service/publicacao/PublicacaoService";

export class PublicacaoController {
    private publicacaoService: PublicacaoService;

    /**
     * Construtor do PublicaçãoService.
     * 
     * @param {number} myID - ID do remetente.
    **/
    constructor(myID: number) {
        this.publicacaoService = new PublicacaoService(myID);
    }

    /**
     * Envia uma publicação ao servidor.
     * 
     * @param {Categoria} categoria - Categoria da publicação.
     * @param {string} desabafo - Desabafo do usuário.
    **/
    public async enviarPublicacao(categoria: Categoria, desabafo: string): Promise<void> {
        return this.publicacaoService.enviarPublicacao(categoria, desabafo);
    }


    /**
     * Pega todas as publicações do servidor.
     * 
     * @returns {Promise<Publicacao>} -  Retorna uma Promise com uma lista de  publicações.
    **/
    public async getPublicacoes(): Promise<Publicacao[]> {
        return this.publicacaoService.getPublicacoes();
    }
}