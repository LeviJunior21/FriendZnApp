import styled from "styled-components/native";
import { ConfiguracoesProps } from "./Interface";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { dadosIniciaisUsuario, keyBDChat, keyUser } from "../../data/constants";
import { useContext } from "react";
import { ContextProvider, Provider } from "../../utils/Provider";
import { deletarDados, deslogar } from "./Service";

export default function Configuracoes(props: ConfiguracoesProps) {
    const { meusDados, setMeusDados, setChatData } = useContext<ContextProvider>(Provider);

    return (
        <Container>
            <NavContainer>
                <ButtonNavIcon onPress={() => props.navigation.goBack()}>
                    <Icon name={"arrow-back"} color={"white"} size={30}/>
                </ButtonNavIcon>
                <NavText>Configurações</NavText>
            </NavContainer>
            <ProfileContainer>
                <EditarPerfilButton>
                    <Icon name={"pencil"} color={"white"} size={30}/>
                    <TextDados style={{color: "white"}}>Editar perfil</TextDados>
                </EditarPerfilButton>
                <DadosContainer>
                    <ButtonDeletarDados onPress={() => deletarDados(
                        {navigation: props.navigation, setMeusDados: setMeusDados, setChatData: setChatData, id: meusDados.id})
                    }>
                        <TextDados style={{color: "red"}}>Deletar Dados</TextDados>
                    </ButtonDeletarDados>
                    <ButtonDeslogar onPress={() => deslogar(
                        {navigation: props.navigation, setMeusDados: setMeusDados, setChatData: setChatData, id: meusDados.id})
                    }>
                        <TextDados style={{color: "white"}}>Deslogar</TextDados>
                    </ButtonDeslogar>
                </DadosContainer>
            </ProfileContainer>
        </Container>
    )
}

const Container = styled.SafeAreaView`
    margin-top: ${Constants.statusBarHeight}px;
    flex: 1;
    background-color: #303030;
`

const NavContainer = styled.View`
    width: 100%;
    height: 50px;
    background-color: #10a17d;
    flex-direction: row;
    align-items: center;
`

const ButtonNavIcon = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    justify-content: center;
    align-items: center;
`

const NavText = styled.Text`
    color: white;
    font-size: 20px;
    font-weight: 500;
`

const DadosContainer = styled.View`
    width: 100%;
    height: 50px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
`

const ButtonDeletarDados = styled.TouchableOpacity`
    width: 140px;
    height: 40px;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    border-width: 2px;
    border-color: red;
`

const ButtonDeslogar = styled.TouchableOpacity`
    padding-horizontal: 10px;
    height: 40px;
    align-items: center;
    justify-content: center;
    background-color: #10a17d;
    border-radius: 4px;
`

const TextDados = styled.Text`
    font-size: 16px;
`

const ProfileContainer = styled.View`
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 10px;
`

const EditarPerfilButton = styled.TouchableOpacity`
    width: 170px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-width: 2px;
    border-color: gray;
    border-radius: 4px;
    gap: 4px;
`
