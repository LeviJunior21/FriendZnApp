import styled from "styled-components/native"
import { ApelidoDescricaoInterface, EditarPerfilProps } from "./Interface";
import { avatarMasculino } from "../../data/avatar";
import Constants from "expo-constants";
import { useContext, useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { ContextProvider, Provider } from "../../utils/Provider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { keyUser } from "../../data/constants";
import { LoginCadastroReturns } from "../usuario/cadastro/Interface";
import { gravarDadosEditados } from "./Service";

const EditarPerfil: React.FC<EditarPerfilProps> = ({ route }) => {
    const { id, apelido, descricao, navigation } = route.params;
    const [ apelidoDescricao, setApelidoDescricao] = useState<ApelidoDescricaoInterface>({apelido: apelido, descricao: descricao});
    const [ alterado, setAlterado ] = useState<boolean>(false);
    const { meusDados, setMeusDados } = useContext<ContextProvider>(Provider);

    useEffect(() => {
        setAlterado(descricao !== apelidoDescricao.descricao || apelido !== apelidoDescricao.apelido);    
    }, [ apelidoDescricao ]);

    const salvar = async() => {
        if (alterado) {
            try {
                const dadosParaPost = { apelido: apelidoDescricao.apelido, descricao: apelidoDescricao.descricao, codigoAcesso: meusDados.codigoAcesso };

                const result = await gravarDadosEditados(dadosParaPost, id);
                if (result) {
                    const dadosUsuario = await AsyncStorage.getItem(keyUser);
                    if (dadosUsuario != null) {
                        const dadosUsuarioJSON = JSON.parse(dadosUsuario);
                        dadosUsuarioJSON.apelido = apelidoDescricao.apelido;
                        dadosUsuarioJSON.descricao = apelidoDescricao.descricao;
                        AsyncStorage.setItem(keyUser, dadosUsuario);
                        setMeusDados(prevState => ({...prevState, apelido: apelidoDescricao.apelido, descricao: apelidoDescricao.descricao}));
                        navigation.navigate("Home");
                    }
                }
            } catch {}
        }
    }

    return (
        <Container>
            <NavContainer>
                <NavButtonBack onPress={() => navigation.navigate("Home")}>
                    <Icon name={"arrow-back"} color={"white"} size={30}/>
                </NavButtonBack>
                <NavText>Meu Perfil</NavText>
            </NavContainer>
            <AvatarContainerChoice>
                <Avatars>
                    <AvatarCircleContainer>
                        <AvatarCircle>
                            <AvatarImage source={avatarMasculino} />
                        </AvatarCircle>
                    </AvatarCircleContainer>
                </Avatars>
            <MensagemChoiceAvatar>Clique na imagem para mudar o avatar</MensagemChoiceAvatar>
        </AvatarContainerChoice>

        <ApelidoIdadeContainer>
            <ApelidoDescricaoText>Apelido</ApelidoDescricaoText>
            <InputContainer>
                <InputInfo 
                value={apelidoDescricao.apelido}
                onChangeText={(text: string) => setApelidoDescricao(prevState => ({...prevState, apelido: text.replace(/^\s+|\s+$/g, '')}))}
                placeholder={"Apelido"}
                numberOfLines={1} 
                maxLength={10}
                placeholderTextColor={"white"}
                />
            </InputContainer>
            <ApelidoDescricaoText style={{marginTop: 30}}>Descrição</ApelidoDescricaoText>
            <InputContainer>
                <InputInfo
                onChangeText={(text: string) => setApelidoDescricao(prevState => ({...prevState, descricao: text.replace(/^\s+|\s+$/g, '')}))}
                value={apelidoDescricao.descricao}
                placeholder={"Descricao"}
                maxLength={300}
                multiline={true}
                placeholderTextColor={"white"}
                />
            </InputContainer>
            <ContadorCaractere>{`${apelidoDescricao.descricao.length}/300`}</ContadorCaractere>
        </ApelidoIdadeContainer>        
        <SalvarButton style={{backgroundColor: alterado? "#10a17d":"gray"}} onPress={() => salvar()}>
            <SalvarText>Salvar</SalvarText>
        </SalvarButton>
        </Container>
    )
}

export default EditarPerfil;

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #303030;
    margin-top: ${Constants.statusBarHeight}px;
`

const NavContainer = styled.View`
    width: 100%;
    height: 50px;
    flex-direction: row;
    align-items: center;
    padding-horizontal: 10px;
    gap: 10px;
    background-color: #10a17d;
`

const NavText = styled.Text`
    font-size: 18px;
    font-weight: 500;
    color: white;
`

const NavButtonBack = styled.TouchableOpacity`
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
`

const AvatarCircleContainer = styled.View`
    width: 100px;
    min-height: 90px;
    max-height: 100px;
    flex-direction: column;
    align-items: center;
`

const AvatarCircle = styled.TouchableOpacity`
    width: 76px;
    height: 80px;
    border-radius: 39px;
    overflow: hidden;
    justify-content: center;
    align-items: center;
`

const AvatarImage = styled.Image`
    width: 100%;
    height: 100%;
`

const MensagemChoiceAvatar = styled.Text`
    color: white;
    font-size: 12px;
`

const AvatarContainerChoice = styled.View`
    margin-top: 20px;
    width: 100%;
    height: 120px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const Avatars = styled.View`
    width: 60%;
    height: 100px;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
`

const ApelidoIdadeContainer = styled.View`
    width: 100%;
    flex-direction: column;
    padding: 10px;
    justify-content: space-between;
`

const InputContainer = styled.View`
    width: 100%;
    height: 56px;
    border-bottom-width: 2px;
    border-bottom-color: gray;
    justify-content: center;
    align-items: center;
`

const InputInfo = styled.TextInput`
    width: 100%;
    height: auto;
    padding: 10px;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    font-size: 14px;
`

const ApelidoDescricaoText = styled.Text`
    color: white;
    font-weight: 500;
    font-size: 16px;
`

const ContadorCaractere = styled.Text`
    color: white;
    align-self: flex-end;
    font-size: 13px;
    padding: 10px;
`

const SalvarButton = styled.TouchableOpacity`
    width: 100px;
    height: 40px;
    border-radius: 4px;
    position: absolute;
    bottom: 10px;
    right: 10px;
    align-items: center;
    justify-content: center;
`

const SalvarText = styled.Text`
    color: white;
`
