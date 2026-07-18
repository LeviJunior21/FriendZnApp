import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";
import { ConfiguracoesProps } from "./Interface";
import { useContext } from "react";
import { Switch } from "react-native";
import { ContextProvider, Provider } from "../../utils/Provider";
import { deletarDados, deslogar } from "./Service";

export default function Configuracoes(props: ConfiguracoesProps) {
    const { meusDados, setMeusDados, setChatData, appSettings, setAppSettings, colors } = useContext<ContextProvider>(Provider);

    return (
        <Container style={{backgroundColor: colors.background}}>
            <NavContainer style={{backgroundColor: colors.primary}}>
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
                <Section style={{borderColor: colors.border}}>
                    <SectionTitle style={{color: colors.text}}>Notificações</SectionTitle>
                    <SettingRow>
                        <TextDados style={{color: colors.text}}>Geral</TextDados>
                        <Switch value={appSettings.notificacoesGerais} onValueChange={(value) => setAppSettings({...appSettings, notificacoesGerais: value})}/>
                    </SettingRow>
                    <SettingRow>
                        <TextDados style={{color: colors.text}}>Comentários</TextDados>
                        <Switch value={appSettings.notificacoesComentarios} onValueChange={(value) => setAppSettings({...appSettings, notificacoesComentarios: value})}/>
                    </SettingRow>
                    <SettingRow>
                        <TextDados style={{color: colors.text}}>Mensagens</TextDados>
                        <Switch value={appSettings.notificacoesMensagens} onValueChange={(value) => setAppSettings({...appSettings, notificacoesMensagens: value})}/>
                    </SettingRow>
                    <SettingRow>
                        <TextDados style={{color: colors.text}}>Tocar som</TextDados>
                        <Switch value={appSettings.tocarSomNotificacao} onValueChange={(value) => setAppSettings({...appSettings, tocarSomNotificacao: value})}/>
                    </SettingRow>
                    <SettingRow>
                        <TextDados style={{color: colors.text}}>Vibrar</TextDados>
                        <Switch value={appSettings.vibrarNotificacao} onValueChange={(value) => setAppSettings({...appSettings, vibrarNotificacao: value})}/>
                    </SettingRow>
                </Section>
                <Section style={{borderColor: colors.border}}>
                    <SectionTitle style={{color: colors.text}}>Quem pode iniciar chat</SectionTitle>
                    <ChoiceRow>
                        {(["todos", "solicitacao", "nenhum"] as const).map((permission) => (
                            <ChoiceButton
                                key={permission}
                                style={{backgroundColor: appSettings.quemPodeIniciarChat === permission ? colors.primary : colors.surface, borderColor: colors.border}}
                                onPress={() => setAppSettings({...appSettings, quemPodeIniciarChat: permission})}
                            >
                                <ChoiceText style={{color: appSettings.quemPodeIniciarChat === permission ? "white" : colors.text}}>
                                    {permission === "todos" ? "Todos" : permission === "solicitacao" ? "Solicitação" : "Nenhum"}
                                </ChoiceText>
                            </ChoiceButton>
                        ))}
                    </ChoiceRow>
                </Section>
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

const Section = styled.View`
    width: 100%;
    border-width: 1px;
    border-radius: 6px;
    padding: 12px;
    gap: 8px;
`

const SectionTitle = styled.Text`
    font-size: 16px;
    font-weight: 700;
`

const SettingRow = styled.View`
    min-height: 40px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const ChoiceRow = styled.View`
    flex-direction: row;
    gap: 8px;
`

const ChoiceButton = styled.TouchableOpacity`
    flex: 1;
    min-height: 38px;
    border-width: 1px;
    border-radius: 6px;
    justify-content: center;
    align-items: center;
`

const ChoiceText = styled.Text`
    font-size: 12px;
    font-weight: 700;
`
