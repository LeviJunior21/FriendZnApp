import styled from "styled-components/native"
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export const Nav = () => {
    const navigation = useNavigation();
    return (
        <Container>
            <ArrowBack onPress={() => {navigation.navigate({name: "Home"})}}>
                <Icon name={"arrow-back"} color={"white"} size={30}></Icon>
            </ArrowBack>
            <TextTop>Desabafo</TextTop>
            <ArrowSend onPress={() => {}}>
                <Icon name={"ellipsis-vertical"} color={"white"} size={20}></Icon>
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
