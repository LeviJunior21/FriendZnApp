import { LoginCadastro, LoginCadastroReturns } from "../components/usuario/cadastro/Interface";
import { SexoSelecionado } from "../components/usuario/cadastro/Sexo";
import { LoginType } from "../components/usuario/utils/LoginType";

export const keyBDChat = "myKeyChat";

export const keyUser = "myKeyUser";

export const dadosIniciaisUsuario: LoginCadastroReturns = {
    id: -1, 
    apelido: "", 
    codigoAcesso: -1, 
    email: "", 
    idade: -1, 
    loginType: LoginType.GitHub, 
    sexo: SexoSelecionado.NENHUM,
    descricao: ""
}

export const dadosNecesassariosCriacaoUsuario: LoginCadastro = {
    apelido: "", 
    codigoAcesso: -1, 
    email: "", 
    idade: -1, 
    loginType: LoginType.GitHub, 
    sexo: SexoSelecionado.NENHUM,
}
