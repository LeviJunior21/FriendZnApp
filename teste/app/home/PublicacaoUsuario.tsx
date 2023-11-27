import styled from "styled-components/native";
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Component } from "react";
import { PublicacaoUsuarioProps } from "./Interface";
import { getCurrentDate } from "../../../utils/time";
import { getCategory, getColorCategory } from "../../../utils/getCategory";

export class PublicacaoUsuario extends Component<PublicacaoUsuarioProps, PublicacaoUsuarioProps> {
    constructor(props: PublicacaoUsuarioProps) {
        super(props);

        this.state = {
            index: props.index,
            navigation: props.navigation,
            publicacao: props.publicacao
        }
    }

    render() {
        return (
            <Animatable.View animation="fadeInDown" delay={this.state.index * 100} useNativeDriver>
                <PublicacaoContainer onPress={() => this.state.navigation.navigate("Comentario", { publicacao: this.state.publicacao })}>
                    <UserInfoTop>
                        <UserName>{`@${this.state.publicacao.getUsuario().getApelido()}`}</UserName>
                        <InformacaoPublicacao>
                            <DataPublicacao>{getCurrentDate(this.state.publicacao.getDate())}</DataPublicacao>
                            <CategoriaText 
                            style={{color: getColorCategory(this.state.publicacao.getCategoria())}}
                            >{getCategory(this.state.publicacao.getCategoria())}</CategoriaText>
                        </InformacaoPublicacao>
                    </UserInfoTop>
                    <PublicacaoUserContainer>
                        <PublicacaoText numberOfLines={3}>{this.state.publicacao.getPublicacao()}</PublicacaoText>
                    </PublicacaoUserContainer>
                    <ComentarioInfo>
                        <NumeroComentarios>{this.state.publicacao.getComentarios().length}</NumeroComentarios>
                        <MaterialIcons name="chat-bubble-outline"color={"white"} size={16}></MaterialIcons>
                    </ComentarioInfo>
                </PublicacaoContainer>
            </Animatable.View>
        )
    }
}

const PublicacaoText = styled.Text`
  color: white;
`

const PublicacaoUserContainer = styled.View`
  width: 100%;
  min-height: 60px;
  padding-horizontal: 10px;
  padding-vertical: 14px;
  background-color: #303030;
`

const UserName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: white;
`

const DataPublicacao = styled.Text`
  font-size: 10px;
  color: white;
`

const UserInfoTop = styled.View`
  width: 100%;
  height: 30px;
  padding-left: 10px;
  background-color: #303030;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 2px;
  justify-content: space-between;
`

const PublicacaoContainer = styled.TouchableOpacity`
  width: 100%;
  min-height: 120px;
  max-height: 150px;
  border-bottom-width: 2px;
  border-bottom-color: white;
`

const ComentarioInfo = styled.View`
    width: 100%;
    height: 30px;
    flex-direction: row;
    align-items: center;
    padding-horizontal: 10px;
    background-color: #303030;
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
`

const CategoriaText = styled.Text`
    color: red;
    font-size: 11px;
`
