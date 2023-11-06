import Icon from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";
import { enviarPublicacao } from "./enviarPublicacao";
import { PublicacaoUsuario } from "../../utils/interfaces";

export const Nav = (props: PublicacaoUsuario) => {
    return (
        <Container>
            <ArrowBack>
                <Icon name={"arrow-back"} color={"white"} size={30}></Icon>
            </ArrowBack>
            <TextTop>Escreva algo</TextTop>
            <ArrowSend onPress={() => enviarPublicacao(props.categoria, props.desabafo)}>
                <Icon name={"send"} color={"white"} size={24}></Icon>
            </ArrowSend>
        </Container>
    )
}

const Container = styled.View`
    width: width;
    height: 50px;
    background-color: #10a17d;
    flex-direction: row;
    align-items: center;
`

const ArrowBack = styled.TouchableOpacity`
    position: absolute;
    height: 50px;
    width: 50px;
    justify-content: center;
    align-items: center;
    left: 0px;
`

const TextTop = styled.Text`
    color: white;
    font-weight: 500;
    font-size: 18px;
    position: absolute;
    left: 50px;
`

const ArrowSend = styled.TouchableOpacity`
    position: absolute;
    right: 0px;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 50px;
`
