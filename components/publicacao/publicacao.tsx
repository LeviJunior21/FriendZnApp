import styled from "styled-components/native";
import React from "react";
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getCurrentDate } from "../../utils/time";
import { PublicacaoProps } from "../../utils/interfaces";
import { getCategory, getColorCategory } from "../../utils/getCategory";

export const PublicacaoUser:React.FC<PublicacaoProps> = ({publicacao, index}) => {
    return (
        <Animatable.View animation="fadeInDown" delay={index * 100} useNativeDriver>
            <PublicacaoContainer>
                <UserInfoTop>
                    <UserName>{`@${publicacao.getUsuario().getApelido()}`}</UserName>
                    <InformaacaoPublicacao>
                        <DataPublicacao>{getCurrentDate(publicacao.getDate())}</DataPublicacao>
                        <CategoriaText style={{color: getColorCategory(1)}}>{getCategory(1)}</CategoriaText>
                    </InformaacaoPublicacao>
                </UserInfoTop>
                <PublicacaoUserContainer>
                    <PublicacaoText numberOfLines={3}>{publicacao.getPublicacao()}</PublicacaoText>
                </PublicacaoUserContainer>
                <ComentarioInfo>
                    <NumeroComentarios>{publicacao.getComentarios().length}</NumeroComentarios>
                    <MaterialIcons name="chat-bubble-outline"color={"black"} size={16}></MaterialIcons>
                </ComentarioInfo>
            </PublicacaoContainer>
        </Animatable.View>
    )
}

const PublicacaoText = styled.Text`
`

const PublicacaoUserContainer = styled.View`
  width: 100%;
  height: 60%;
  padding: 10px;
  background-color: white;
`

const UserName = styled.Text`
  font-size: 16px;
  font-weight: bold;
`

const DataPublicacao = styled.Text`
  font-size: 10px;
`

const UserInfoTop = styled.View`
  width: 100%;
  height: 20%;
  background-color: white;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 2px;
  justify-content: space-between;
`

const PublicacaoContainer = styled.TouchableOpacity`
  width: 100%;
  min-height: 120px;
  max-height: 150px;
  background-color: white;
`

const ComentarioInfo = styled.View`
    width: 100%;
    height: 20%;
    flex-direction: row;
    align-items: center;
    padding-horizontal: 10px;
    background-color: white;
`

const NumeroComentarios = styled.Text`
    color: black;
    font-weight: 500;
    font-size: 14px;
    margin-right: 6px;
`

const InformaacaoPublicacao = styled.View`
  flex-direction: column;
  height: 30px;
`

const CategoriaText = styled.Text`
    color: red;
    font-size: 11px;
`