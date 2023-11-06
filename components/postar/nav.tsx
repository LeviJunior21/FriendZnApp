import Icon from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";

export const Nav = () => {
    return (
        <Container>
            <ArrowBack>
                <Icon name={"arrow-back"} color={"white"} size={30}></Icon>
            </ArrowBack>
            <TextTop>Escreva algo</TextTop>
            <ArrowSend>
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
