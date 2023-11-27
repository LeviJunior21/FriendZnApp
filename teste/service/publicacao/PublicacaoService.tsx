import { useContext } from "react";
import { Comentario } from "../../../model/Comentario";
import { Publicacao } from "../../../model/Publicacao";
import { Usuario } from "../../../model/Usuario";
import { Categoria } from "../../../utils/interfaces";
import { ComentarioController } from "../../controller/comentario/ComentarioController";
import { ContextTypeProvider, Provider } from "../../data/Provider";
import { PublicacaoInterface } from "./Interface";

export class PublicacaoService {
    private url: string;
    private comentarioController: ComentarioController;
 
    /**
     * Construtor do PublicaçãoService.
     * 
     * @param {number} myID - ID do remetente.
    **/
    constructor(myID: number) {
        const { comentarioController} = useContext(Provider) as ContextTypeProvider;
        this.url = `http://10.0.0.181:8080/v1/publicacoes/publicacao?id=${myID}`;
        this.comentarioController = comentarioController;
    }

    /**
     * Envia uma publicação ao servidor.
     * 
     * @param {Categoria} categoria - Categoria da publicação.
     * @param {string} desabafo - Desabafo do usuário.
    **/
    public async enviarPublicacao(categoria: Categoria, desabafo: string): Promise<void> {
        if (categoria === Categoria.selecionar) {
            alert("Selecione uma categoria!");
        } else {
            
            const dados = {
                publicacao: desabafo, 
                date: new Date().toISOString(),
                codigoAcesso: 12345,
                categoria: categoria
            }
            
            fetch(this.url, {
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });    
        }
    }

    /**
     * Pega todas as publicações do servidor.
     * 
     * @returns {Promise<Publicacao>} -  Retorna uma Promise com uma lista de  publicações.
    **/
    public async getPublicacoes(): Promise<Publicacao[]> {
        try {
            const response = await fetch('http://10.0.0.181:8080/v1/publicacoes');
    
            if (response.ok) {
                const data = await response.json();
                const publicacoes: Publicacao[] = data.map((item: PublicacaoInterface) => {
                    const date = new Date(item.date);
    
                    const usuario: Usuario = Usuario.builder()
                        .withApelido(item.usuario.apelido)
                        .withId(item.usuario.id)
                        .build();
    
                    const comentarios: Comentario[] = this.comentarioController.listarComentarios(item.comentarios);
                    
                    return Publicacao.builder()
                        .withId(item.id)
                        .withUsuario(usuario)
                        .withDate(date)
                        .withComentarios(comentarios)
                        .withPublicacao(item.publicacao)
                        .withCategoria(item.categoria)
                        .build();
                });
    
                return publicacoes;
            } else {
                console.error('Ocorreu um erro na requisição HTTP');
            }
            } catch (error) {
                console.error('Ocorreu ao buscar os dados:', error);
        }
        return [];
    }
    
    
}