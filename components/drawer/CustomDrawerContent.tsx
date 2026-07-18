import styled from "styled-components/native";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useContext, useState } from "react";
import { ContextProvider, Provider } from "../../utils/Provider";
import { DrawerNavigationProps } from "../../utils/interfaces";
import { ModalDrawer } from "./Modals";
import AvatarImage from "../avatar/AvatarImage";
import EmojiBadge from "../emoji/EmojiBadge";

export default function CustomDrawerContent(props: DrawerNavigationProps) {
    const { meusDados, appSettings, setAppSettings, colors } = useContext<ContextProvider>(Provider);
    const [ aberto, setAberto ] = useState<boolean>(false);

    const abrirPerfil = () => {
        if (meusDados.id !== -1 && meusDados.codigoAcesso !== -1) {
            props.navigation.navigate("Perfil", {id: meusDados.id, navigation: props.navigation, apelido: meusDados.apelido});
        } else {
            props.navigation.navigate("Login");
        }
    }

    return (
        <Container style={{backgroundColor: colors.surface}}>
            <TopContainer style={{backgroundColor: colors.primary}} onPress={() => abrirPerfil()}>
                <AvatarImage userId={meusDados.id} size={80}/>
                {(meusDados.apelido !== "")? <TextAvatarRow><TextAvatar>@{meusDados.apelido}</TextAvatar><EmojiBadge emoji={meusDados.emoji} size={22}/></TextAvatarRow>:
                <IntroducaoContainer>
                    <NavText>Friend Zone</NavText>
                    <NavTextDescricao>Chat e desabafo</NavTextDescricao>
                </IntroducaoContainer>
                }
            </TopContainer>

            <SubContainer style={{borderBottomColor: "gray", borderBottomWidth: 1}}>
                <SubContainerButton onPress={() => props.navigation.navigate("Configuracoes")}>
                    <Icon name={"cog"} color={"white"} size={30}/>
                    <SubContainerText>Configurações</SubContainerText>
                </SubContainerButton>
                <SubContainerButton onPress={() => setAberto(true)}>
                    <Icon name={"emoticon-outline"} color={"white"} size={30}/>
                    <SubContainerText>Estou sentindo...</SubContainerText>
                </SubContainerButton>
                <SubContainerButton onPress={() => setAppSettings({...appSettings, themeMode: appSettings.themeMode === "dark" ? "light" : "dark"})}>
                    <Icon name={appSettings.themeMode === "dark" ? "weather-sunny" : "moon-waning-crescent"} color={"white"} size={30}/>
                    <SubContainerText>{appSettings.themeMode === "dark" ? "Modo Diurno" : "Modo Noturno"}</SubContainerText>
                </SubContainerButton>
            </SubContainer>

            <SubContainer style={{borderBottomColor: "gray", borderBottomWidth: 1}}>
                <SubContainerButton>
                    <Icon name={"star-outline"} color={"white"} size={30}/>
                    <SubContainerText>Gostou do app?</SubContainerText>
                </SubContainerButton>
                <SubContainerButton>
                    <Icon name={"close-octagon"} color={"white"} size={30}/>
                    <SubContainerText>Remover anúncios</SubContainerText>
                </SubContainerButton>
                <SubContainerButton>
                    <Icon name={"clipboard-text-outline"} color={"white"} size={30}/>
                    <SubContainerText>Termos de uso</SubContainerText>
                </SubContainerButton>
            </SubContainer>

            <SubContainer>
                <SubContainerButton>
                    <Icon name={"share-variant-outline"} color={"white"} size={30}/>
                    <SubContainerText>Indique o app a um amigo</SubContainerText>
                </SubContainerButton>
                <SubContainerButton>
                    <Icon name={"email-outline"} color={"white"} size={30}/>
                    <SubContainerText>Entre em contato</SubContainerText>
                </SubContainerButton>
                <SubContainerButton>
                    <Icon name={"google-play"} color={"white"} size={30}/>
                    <SubContainerText>Mais apps!</SubContainerText>
                </SubContainerButton>
            </SubContainer>
            <ModalDrawer aberto={aberto} setAberto={setAberto}/>
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    background-color: #404040;
    margin-top: ${Constants.statusBarHeight}px;`

const TopContainer = styled.TouchableOpacity`
    width: 100%;
    height: 150px;
    background-color: #10a17d;
    flex-direction: row;
    align-items: center;
    gap: 6px;
`

const TextAvatar = styled.Text`
    color: white;
    font-size: 18px;
    font-weight: 500;
`

const TextAvatarRow = styled.View`
    flex-direction: row;
    align-items: center;
`

const IntroducaoContainer = styled.View`
    flex-direction: column;
`

const NavText = styled.Text`
    font-size: 20px;
    color: white;
    font-weight: bold;
`

const NavTextDescricao = styled.Text`
    font-size: 14px;
    color: white;
`

const SubContainer = styled.View`
    width: 100%;
    height: 170px;
    flex-direction: column;
`

const SubContainerButton = styled.TouchableOpacity`
    width: 100%;
    height: 33%;
    flex-direction: row;
    padding-horizontal: 20px;
    align-items: center;
    gap: 10px;
`

const SubContainerText = styled.Text`
    color: white;
    font-weight: 500;
    font-size: 14px;
`
