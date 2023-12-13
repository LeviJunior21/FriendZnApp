import styled from "styled-components/native";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/Ionicons";
import { CadastroProps, LoginCadastro } from "./Interface";
import { useContext, useEffect, useState } from "react";
import { ContextProvider, Provider } from "../../../utils/Provider";
import { avatarMasculino, avatarFeminino } from "../../../data/avatar";
import { SexoSelecionado } from "./Sexo";
import { cadastrar } from "./Service";
import { dadosNecesassariosCriacaoUsuario } from "../../../data/constants";

const Cadastro:React.FC<CadastroProps> = ({ navigation, route}) => {
    const { setMeusDados } = useContext<ContextProvider>(Provider);
    const [ imageLogin, setImageLogin ] = useState<boolean>(false);
    const [ dadosNecessarios, setDadosNecessarios ] = useState<LoginCadastro>({
        ...dadosNecesassariosCriacaoUsuario, codigoAcesso: route.params.dados.id
    });

    const escolherSexo = (sexo: SexoSelecionado) => {
        if (dadosNecessarios.sexo == SexoSelecionado.NENHUM) { 
            setDadosNecessarios(prevState => ({...prevState, sexo: sexo}))
        } else { setImageLogin(!imageLogin); }
    }

    const realizarCadastro = () => {
        cadastrar({dadosUsuario: dadosNecessarios, setMeusDados: setMeusDados}).then(response => {
            if (response) { navigation.navigate("Home"); }
        });
    }

    return (
        <Container>
            <NavCadastroContainer>
                <ButtonBack onPress={() => navigation.navigate("Login")}>
                    <Icon name={"arrow-back"} size={30} color={"white"}></Icon>
                </ButtonBack>
                <TextNavCadastro>Criar conta</TextNavCadastro>
            </NavCadastroContainer>

            <ContainerInfoAll>
                <SexoContainer>
                    <SexoText>Sexo</SexoText>
                    {(dadosNecessarios.sexo !== SexoSelecionado.NENHUM)?
                    <MudarSexoButton onPress={() => setDadosNecessarios(prevState => ({...prevState, sexo: SexoSelecionado.NENHUM}))}>
                        <MudarSexoText>Mudar sexo</MudarSexoText>
                    </MudarSexoButton>
                    :<></>}
                </SexoContainer>
                <AvatarContainerChoice>
                    <Avatars>
                        {(dadosNecessarios.sexo != SexoSelecionado.FEMININO)?
                        <AvatarCircleContainer>
                            <AvatarCircle onPress={() => escolherSexo(SexoSelecionado.MASCULINO)}>
                                <AvatarImage source={imageLogin && dadosNecessarios.sexo === SexoSelecionado.MASCULINO? {uri: route.params.dados.avatar_url} : avatarMasculino} />
                            </AvatarCircle>
                            <SexoMascFemText>Masculino</SexoMascFemText>
                        </AvatarCircleContainer>
                        :<></>}
                        {(dadosNecessarios.sexo != SexoSelecionado.MASCULINO)?
                        <AvatarCircleContainer>
                            <AvatarCircle onPress={() => escolherSexo(SexoSelecionado.FEMININO)}>
                                <AvatarImage source={imageLogin && dadosNecessarios.sexo === SexoSelecionado.FEMININO? {uri: route.params.dados.avatar_url} : avatarFeminino}/>
                            </AvatarCircle>
                            <SexoMascFemText>Feminino</SexoMascFemText>
                        </AvatarCircleContainer>
                        :<></>}
                    </Avatars>
                    <MensagemChoiceAvatar>Clique na imagem para mudar o avatar</MensagemChoiceAvatar>
                </AvatarContainerChoice>
                <ApelidoIdadeContainer>
                    <InputContainer>
                        <InputInfo 
                        onChangeText={(text: string) => setDadosNecessarios(prevState => ({...prevState, apelido: text}))}
                        placeholder={"Apelido"}
                        numberOfLines={1} 
                        maxLength={8}
                        placeholderTextColor={"white"}
                        />
                    </InputContainer>
                    <InputContainer>
                        <InputInfo
                        onChangeText={(text: string) => setDadosNecessarios(prevState => ({...prevState, idade: SexoSelecionado.NENHUM}))}
                        placeholder={"Idade"}
                        numberOfLines={1}
                        maxLength={3}
                        placeholderTextColor={"white"}
                        keyboardType="numeric"
                        />
                    </InputContainer>
                </ApelidoIdadeContainer>
                <ButtonCriarContaContainer>
                    <ButtonCriarConta onPress={() => realizarCadastro()}>
                        <ButtonCriarContaText>Criar conta</ButtonCriarContaText>
                    </ButtonCriarConta>
                </ButtonCriarContaContainer>
                <FrasePrivacidadeContainer>
                    <FrasePrivacidade>{"Não iremos compartilhar nenhuma informação.\nSeus desabafos serão anônimos."}</FrasePrivacidade>
                </FrasePrivacidadeContainer>
            </ContainerInfoAll>
        </Container>
    )
}

export default Cadastro;

const NavCadastroContainer = styled.View`
    width: 100%;
    height: 50px;
    background-color: #10a17d;
    margin-top: ${Constants.statusBarHeight}px;
    flex-direction: row;
    align-items: center;
`

const Container = styled.View`
    flex: 1;
    background-color: #303030;
    flex-direction: column;
    align-items: center;
`

const ButtonBack = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    justify-content: center;
    align-items: center;
`

const TextNavCadastro = styled.Text`
    color: white;
    font-size: 18px;
    font-weight: 500;
`

const ContainerInfoAll = styled.View`
    width: 100%;
    flex: 1;
    align-self: center;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const SexoContainer = styled.View`
    width: 100%;
    height: 50px;
    flex-direction: row;
    align-items: center;
    padding-horizontal: 10px;
    align-items: center;
    justify-content: space-between;
`

const SexoText = styled.Text`
    color: white;
    font-size: 16px;
    font-weight: 500;
`

const MudarSexoText = styled.Text`
    color: white;
    font-size: 12px;
    font-weight: 500;
    color: #10a17d;
`

const MudarSexoButton = styled.TouchableOpacity`
    width: 100px;
    height: 100%;
    justify-content: center;
    align-items: center;
`

const AvatarContainerChoice = styled.View`
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

const SexoMascFemText = styled.Text`
    color: white;
    font-size: 14px;
    font-weight: 500;
`

const MensagemChoiceAvatar = styled.Text`
    color: white;
    font-size: 12px;
`

const ApelidoIdadeContainer = styled.View`
    width: 100%;
    height: 140px;
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

const ButtonCriarContaContainer = styled.View`
    width: 100%;
    height: 60px;
    justify-content: center;
    align-items: center;
`

const ButtonCriarConta = styled.TouchableOpacity`
    width: 240px;
    height: 36px;
    border-radius: 4px;
    background-color: #10a17d;
    justify-content: center;
    align-items: center;
`

const ButtonCriarContaText = styled.Text`
    color: white;
    font-size: 16px;
    font-weight: 500;
`

const FrasePrivacidadeContainer = styled.View`
    width: 100%;
    height: 40px;
    justify-content: center;
    align-items: center;
`

const FrasePrivacidade = styled.Text`
    color: white;
    font-size: 12px;
    flex-wrap: wrap;
    text-align: center;
`

const InputInfo = styled.TextInput`
    width: 98%;
    height: 50px;
    padding: 10px;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    font-size: 14px;
`