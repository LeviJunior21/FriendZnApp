import styled from "styled-components/native";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/FontAwesome";
import { PublicacaoUser } from "../publicacao/Publicacao";
import { FlatList } from "react-native";
import { avatarMasculino } from "../../data/avatar";
import IonIcons from "react-native-vector-icons/Ionicons";
import { Publicacao } from "../../model/Publicacao";
import React, { useEffect, useState } from "react";
import { getDadosPefilUsuario, getPublicacoesUser } from "./Service";
import { PerfilProps } from "./Interface";

const Perfil: React.FC<PerfilProps> = ({ route }) => {
    const { id, navigation } = route.params;
    const [ publicacoes, setPublicacoes ] = useState<Publicacao[]>([]);
    const [ dadosPerfilUsuario, setDadosPerfilUsuario ] = useState<any>({});

    useEffect(() => {
        getPublicacoesUser(id, setPublicacoes);
        getDadosPefilUsuario(id, setDadosPerfilUsuario);
    }, []);

    return (
        <Container>
            <NavContainer>
                <NavButtonBack onPress={() => navigation.navigation.goBack()}>
                    <IonIcons name={"arrow-back"} color={"white"} size={30}/>
                </NavButtonBack>
                <NavText>Perfil</NavText>
            </NavContainer>
            <PerfilContainer>
                <ImageAvatar source={avatarMasculino}/>
                <TextAvatar>@{dadosPerfilUsuario.apelido}</TextAvatar>
            </PerfilContainer>
            <SobreContainer>
                <SobreText>Sobre</SobreText>
                <SobreDescricaoText>{dadosPerfilUsuario.descricao? dadosPerfilUsuario.descricao: "Nada a descrever."}</SobreDescricaoText>
                <SobreDate>
                    <Icon name={"calendar"} color={"#898989"} size={16}/>
                    <SobreDateText>Desde 13/12/2023</SobreDateText>
                </SobreDate>
            </SobreContainer>
            <NumeroDadosContainer>
                <DadosContainer>
                    <DadosNumber>{publicacoes.length}</DadosNumber>
                    <DadosText>Desabafos</DadosText>
                </DadosContainer>
                <DadosContainer>
                    <DadosNumber>{publicacoes.length}</DadosNumber>
                    <DadosText>Comentários</DadosText>
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
