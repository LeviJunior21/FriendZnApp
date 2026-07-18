import styled from "styled-components/native";
import React, { useContext, useState } from "react";
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getCurrentDate } from "../../utils/time";
import { PublicacaoProps } from "../../utils/interfaces";
import { getCategory, getColorCategory } from "../../utils/getCategory";
import AvatarImage from "../avatar/AvatarImage";
import EmojiBadge from "../emoji/EmojiBadge";
import { PublicacaoTipo } from "../../utils/interfaces";
import { ContextProvider, Provider } from "../../utils/Provider";
import { uri_principal } from "../../data/constants";

export const PublicacaoUser:React.FC<PublicacaoProps> = ({ publicacao, index, navigation }) => {
    const { meusDados, colors } = useContext<ContextProvider>(Provider);
    const [votoSelecionado, setVotoSelecionado] = useState<number | null>(null);
    const votos = publicacao.getEnqueteVotos();
    const totalVotos = Object.values(votos || {}).reduce((sum, value) => sum + Number(value || 0), 0);

    const votar = async(opcaoIndex: number) => {
        if (votoSelecionado !== null) return;
        setVotoSelecionado(opcaoIndex);
        if (meusDados.id !== -1) {
            await fetch(`${uri_principal}/v1/publicacoes/${publicacao.getId()}/enquete/voto?idUsuario=${meusDados.id}&opcao=${opcaoIndex}`, { method: "POST" }).catch(() => {});
        }
    };

    return (
        <Animatable.View animation="fadeInDown" delay={index * 100} useNativeDriver>
            <PublicacaoContainer style={{backgroundColor: colors.surface}} onPress={() => navigation.navigate("Comentario", { publicacao: publicacao })}>
                <UserInfoTop>
                <UsuarioContainerPrincipal>
                    <AvatarImage userId={publicacao.getUsuario().getId()} size={50}/>
                        <UsuarioContainer>
                            <NameRow><UserName>{`@${publicacao.getUsuario().getApelido()}`}</UserName><EmojiBadge emoji={publicacao.getUsuario().getEmoji()} size={18}/></NameRow>
                            <DataPublicacao>{getCurrentDate(publicacao.getDate())}</DataPublicacao>
                        </UsuarioContainer>
                        <InformacaoPublicacao>
                            <CategoriaText 
                            style={{color: getColorCategory(publicacao.getCategoria())}}
                        >{getCategory(publicacao.getCategoria())}</CategoriaText>
                        </InformacaoPublicacao>
                    </UsuarioContainerPrincipal>
                </UserInfoTop>
                <PublicacaoUserContainer>
                    <PublicacaoText numberOfLines={3}>{publicacao.getPublicacao()}</PublicacaoText>
                    {publicacao.getTipo() === PublicacaoTipo.enquete?
                        <PollContainer>
                            {publicacao.getEnqueteOpcoes().map((opcao, opcaoIndex) => {
                                const quantidadeVotos = Number(votos?.[opcaoIndex] || 0);
                                const percentual = totalVotos > 0 ? Math.round((quantidadeVotos / totalVotos) * 100) : 0;
                                return (
                                    <PollOption key={`${publicacao.getId()}-${opcaoIndex}`} onPress={() => votar(opcaoIndex)}>
                                        <PollFill style={{width: votoSelecionado !== null ? `${percentual}%` : "0%"}}/>
                                        <PollText>{opcao}</PollText>
                                        <PollPercent>{votoSelecionado !== null ? `${percentual}%` : ""}</PollPercent>
                                    </PollOption>
                                )
                            })}
                        </PollContainer>:<></>
                    }
                </PublicacaoUserContainer>
                <ComentarioInfo>
                    <NumeroComentarios>{publicacao.getComentarios().length}</NumeroComentarios>
                    <MaterialIcons name="chat-bubble-outline" color={"white"} size={16}></MaterialIcons>
                </ComentarioInfo>
            </PublicacaoContainer>
        </Animatable.View>
    )
}

const PublicacaoText = styled.Text`
    color: white;
`

const PublicacaoUserContainer = styled.View`
    width: 100%;
    min-height: 20px;
    padding-horizontal: 10px;
    padding-vertical: 14px;
`

const UserName = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #26a69a;
`

const NameRow = styled.View`
    flex-direction: row;
    align-items: center;
`

const PollContainer = styled.View`
    width: 100%;
    margin-top: 12px;
    gap: 8px;
`

const PollOption = styled.TouchableOpacity`
    width: 100%;
    min-height: 38px;
    border-width: 1px;
    border-color: #10a17d;
    border-radius: 6px;
    overflow: hidden;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const PollFill = styled.View`
    position: absolute;
    left: 0px;
    top: 0px;
    bottom: 0px;
    background-color: rgba(16, 161, 125, 0.35);
`

const PollText = styled.Text`
    color: white;
    font-weight: 500;
    padding-horizontal: 10px;
    flex: 1;
`

const PollPercent = styled.Text`
    color: white;
    font-weight: 700;
    padding-right: 10px;
`

const DataPublicacao = styled.Text`
    font-size: 10px;
    color: white;
`

const UserInfoTop = styled.View`
    width: 100%;
    height: 60px;
    padding-left: 10px;
    flex-direction: row;
    align-items: center;
    padding-horizontal: 2px;
`

const UsuarioContainerPrincipal = styled.View`
    flex-direction: row;
    width: 100%;
    min-height: 0;
    align-items: center;
`

const UsuarioContainer = styled.View`
    flex-direction: column;
    padding-horizontal: 4px;
`

const PublicacaoContainer = styled.TouchableOpacity`
    width: 100%;
    min-height: 120px;
    max-height: 240px;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: #404040;
`

const ComentarioInfo = styled.View`
    width: 100%;
    height: 28px;
    flex-direction: row;
    align-items: center;
    padding-horizontal: 10px;
`

const NumeroComentarios = styled.Text`
    color: white;
    font-weight: 500;
    font-size: 14px;
    margin-right: 6px;
`

const InformacaoPublicacao = styled.View`
    flex-direction: column;
    height: 30px;
    position: absolute;
    right: 4px;
    top: 7px;
    align-self: flex-end;
`

const CategoriaText = styled.Text`
    color: red;
    font-size: 11px;
`
