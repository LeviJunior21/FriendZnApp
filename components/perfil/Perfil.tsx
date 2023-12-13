import styled from "styled-components/native";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/FontAwesome";
import { PublicacaoUser } from "../publicacao/Publicacao";
import { FlatList } from "react-native";
import { avatarMasculino } from "../../data/avatar";
import IonIcons from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { Publicacao } from "../../model/Publicacao";
import React, { useContext, useEffect, useState } from "react";
import { convertToDate, getDadosPefilUsuario, getPublicacoesUser } from "./Service";
import { PerfilInterface, PerfilProps, dadosIniciaisPerfil } from "./Interface";
import { LoginType } from "../usuario/utils/LoginType";
import { ContextProvider, Provider } from "../../utils/Provider";

const Perfil: React.FC<PerfilProps> = ({ route }) => {
    const { id, navigation } = route.params;
    const [ publicacoes, setPublicacoes ] = useState<Publicacao[]>([]);
    const [ dadosPerfilUsuario, setDadosPerfilUsuario ] = useState<PerfilInterface>(dadosIniciaisPerfil);
    const { meusDados } = useContext<ContextProvider>(Provider);

    useEffect(() => {
        getPublicacoesUser(id, setPublicacoes);
        getDadosPefilUsuario(id, setDadosPerfilUsuario);
    }, []);

    return (
        <Container>
            <NavContainer>
                <NavButtonBack onPress={() => navigation.navigation.navigate("Home")}>
                    <IonIcons name={"arrow-back"} color={"white"} size={30}/>
                </NavButtonBack>
                <NavText>Perfil</NavText>
            </NavContainer>
            <PerfilContainer>
                <ImageAvatar source={avatarMasculino}/>
                <TextAvatar>@{dadosPerfilUsuario.apelido}</TextAvatar>
            </PerfilContainer>
            <SobreContainer>
                {(dadosPerfilUsuario.descricao !== "")?
                <>
                <SobreText>Sobre</SobreText>
                <SobreDescricaoText>{dadosPerfilUsuario.descricao}</SobreDescricaoText>
                </>:
                <></>
                }
                <SobreDate>
                    <Icon name={"calendar"} color={"#898989"} size={16}/>
                    <SobreDateText>
                        {(dadosPerfilUsuario.id !== -1)?`Desde ${convertToDate(dadosPerfilUsuario.date)}`: "Carregando..."}
                        </SobreDateText>
                </SobreDate>
            </SobreContainer>
            <NumeroDadosContainer>
                <DadosContainer>
                    <DadosNumber>{publicacoes.length}</DadosNumber>
                    <DadosText>Desabafos</DadosText>
                </DadosContainer>
                <DadosContainer>
                    <DadosNumber>
                        {(dadosIniciaisPerfil.loginType === LoginType.GitHub)? "GitHub":"Google"}
                    </DadosNumber>
                    <DadosText>Autorizado</DadosText>
                </DadosContainer>
            </NumeroDadosContainer>
            <PublicacaoContainer>
                <FlatList
                data={publicacoes}
                renderItem={({item, index}) => 
                    <PublicacaoUser publicacao={item} index={index} navigation={navigation}></PublicacaoUser>
                }
                />
            </PublicacaoContainer>
            {(meusDados.id === id)?
                <EditarPerfilContainer onPress={() => {
                    if (dadosPerfilUsuario.id != -1) {
                        navigation.navigation.navigate("EditarPerfil", { 
                            id: id, 
                            apelido: dadosPerfilUsuario.apelido, 
                            descricao: dadosPerfilUsuario.descricao, 
                            navigation: navigation
                        })
                    }
                }}>
                    <MaterialIcon name={"edit"} color={"white"} size={20}/>
                    <ChatEditarText>EDITAR PERFIL</ChatEditarText>
                </EditarPerfilContainer>:
                <ChatContainer>
                    <MaterialIcon name={"chat"} color={"white"} size={30}/>
                </ChatContainer>
            }
        </Container>
    )
}

export default Perfil;

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #303030;
    margin-top: ${Constants.statusBarHeight}px;
`

const NavButtonBack = styled.TouchableOpacity`
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
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

const PerfilContainer = styled.View`
    width: 100%;
    height: 120px;
    border-bottom-width: 1px;
    border-bottom-color: gray;
    flex-direction: row;
    align-items: center;
    gap: 6px;
`

const ImageAvatar = styled.Image`
    width: 80px;
    height: 80px;
    border-radius: 40px;
    margin-left: 10px;
`

const TextAvatar = styled.Text`
    color: white;
    font-size: 19px;
    font-weight: 500;
`

const SobreContainer = styled.View`
    width: 100%;
    padding: 10px;
    border-bottom-width: 1px;
    border-bottom-color: gray;
    flex-direction: column;
`

const SobreDescricaoText = styled.Text`
    color: white;
    font-size: 13px;
    padding-vertical: 10px;
    flex-wrap: wrap;
`

const SobreText = styled.Text`
    font-weight: bold;
    font-size: 18px;
    color: gray;
`

const SobreDate = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    gap: 6px;
`

const SobreDateText = styled.Text`
    color: #898989;
    font-size: 13px;
`

const NumeroDadosContainer = styled.View`
    width: 100%;
    height: 80px;
    border-top-width: 1px;
    border-top-color: gray;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
`

const DadosContainer = styled.View`
    width: 140px;
    height: 80%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
`

const DadosNumber = styled.Text`
    font-size: 22px;
    font-weight: bold;
    color: white;
`

const DadosText = styled.Text`
    font-size: 12px;
    font-weight: 500;
    color: white;
`

const PublicacaoContainer = styled.ScrollView`
    flex: 1;
`

const EditarPerfilContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding-horizontal: 30px;
    position: absolute;
    bottom: 10px;
    right: 10px;
    background-color: green;
    padding-vertical: 14px;
    border-radius: 40px;
`

const ChatContainer = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    position: absolute;
    bottom: 10px;
    right: 10px;
    background-color: green;
    z-index: 4;
`

const ChatEditarText = styled.Text`
    color: white;
    font-size: 16px;
    z-index: 4;
`
