import { Comentario } from "../../model/Comentario";
import { Publicacao } from "../../model/Publicacao";
import { Usuario } from "../../model/Usuario";

const usuario: Usuario = Usuario.builder()
  .withId(1)
  .withApelido("Admin")
  .build();

const comentarioDefault: Comentario = Comentario.builder()
  .withId(1)
  .withComentario("Carregando as publicações!")
  .withUsuario(usuario)
  .build();

const publicacaoDefault: Publicacao = Publicacao.builder()
  .withId(1)
  .withPublicacao("Carregando as mensagens!")
  .withDate(new Date())
  .withUsuario(usuario)
  .withComentarios([])
  .build();

export { publicacaoDefault, comentarioDefault }
