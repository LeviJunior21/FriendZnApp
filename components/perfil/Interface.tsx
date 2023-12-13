import { Navigation } from "../../utils/interfaces";
import { SexoSelecionado } from "../usuario/cadastro/Sexo";
import { LoginType } from "../usuario/utils/LoginType";

type PerfilProps = {
    route: {
        params: {
            id: number,
            navigation: Navigation
        };
    };
};

interface PerfilInterface {
    id: number,
    apelido: string,
    idade: number,
    sexo: SexoSelecionado,
    descricao: string,
    loginType: LoginType,
    date: string
}

const dadosIniciaisPerfil = {
    id: -1,
    apelido: "Carregando...",
    idade: -1,
    sexo: SexoSelecionado.NENHUM,
    descricao: "Carregando...",
    loginType: LoginType.GitHub,
    date: ""
}

export { PerfilProps, PerfilInterface, dadosIniciaisPerfil }
