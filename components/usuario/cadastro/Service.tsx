import AsyncStorage from "@react-native-async-storage/async-storage";
import { SexoSelecionado } from "./Sexo";
import { cadastrarUsuario } from "../utils/CadastrarUsuario";
import { keyUser } from "../../../data/constants";
import { CadastroActionProps, LoginCadastroReturns } from "./Interface";

/**
 * 
 * @param props 
 * @returns 
**/
export const cadastrar = async(props: CadastroActionProps): Promise<boolean> => {
    let result:boolean = false;

    if (props.dadosUsuario.apelido.length >= 5 && props.dadosUsuario.apelido.length <= 10) {
        if (props.dadosUsuario.sexo !== SexoSelecionado.NENHUM) {
            if (props.dadosUsuario.idade > 0) {
                try {
                    const response = await cadastrarUsuario(props.dadosUsuario);
                    const dadosPersistidos: LoginCadastroReturns = {...response, codigoAcesso: props.dadosUsuario.codigoAcesso};
                    if (response.id !== -1) {
                        AsyncStorage.setItem(keyUser, JSON.stringify(dadosPersistidos));
                        props.setMeusDados(dadosPersistidos);
                        result = true;
                    } else {
                        alert("Ocorreu um erro: O id do Login não é permitido.")
                    } 
                } catch(e: any) {
                    console.log("Ocorreu um erro ao fazer cadastrar.")
                };
            } else {
                alert("Selecione a sua idade.")
            }
        } else {
            alert("Selecione o sexo do usuário.")
        }
    } else {
        alert("Digite um apelido entre 5 e 8 caracteres.")
    }

    return result;
};
