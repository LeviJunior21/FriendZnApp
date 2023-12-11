import styled from "styled-components/native";
import React from "react";
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getCurrentDate } from "../../utils/time";
import { PublicacaoProps } from "../../utils/interfaces";
import { getCategory, getColorCategory } from "../../utils/getCategory";
import { avatarMasculino } from "../../data/avatar";

export const PublicacaoUser:React.FC<PublicacaoProps> = ({ publicacao, index, navigation }) => {
    return (
        <Animatable.View animation="fadeInDown" delay={index * 100} useNativeDriver>
            <PublicacaoContainer onPress={() => navigation.navigation.navigate("Comentario", { publicacao: publicacao })}>
                <UserInfoTop>
                    <Avatar source={avatarMasculino}/>
                    <UserName>{`@${publicacao.getUsuario().getApelido()}`}</UserName>
                    <InformacaoPublicacao>
                        <DataPublicacao>{getCurrentDate(publicacao.getDate())}</DataPublicacao>
                        <CategoriaText 
                        style={{color: getColorCategory(publicacao.getCategoria())}}
                        >{getCategory(publicacao.getCategoria())}</CategoriaText>
                    </InformacaoPublicacao>
                </UserInfoTop>
                <PublicacaoUserContainer>
                    <PublicacaoText numberOfLines={3}>{publicacao.getPublicacao()}</PublicacaoText>
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
  background-color: #404040;
`

const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`

const UserName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: white;
  margin-left: 4px;
`

const DataPublicacao = styled.Text`
  font-size: 10px;
  color: white;
`

const UserInfoTop = styled.View`
  width: 100%;
  height: 60px;
  padding-left: 10px;
  background-color: #404040;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 2px;
`

const PublicacaoContainer = styled.TouchableOpacity`
  width: 100%;
  min-height: 120px;
  max-height: 240px;
  padding-top: 10px;
  padding-bottom: 10px;
`

const ComentarioInfo = styled.View`
    width: 100%;
    height: 28px;
    flex-direction: row;
    align-items: center;
    padding-horizontal: 10px;
    background-color: #404040;
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
  right: 0px;
  top: 10px;
  align-self: flex-end;
`

const CategoriaText = styled.Text`
    color: red;
    font-size: 11px;
`
