import Icon from "react-native-vector-icons/Ionicons"
import styled from "styled-components/native"
import { RootStackParamList } from "../../utils/interfaces"
import { NavigationProp } from "@react-navigation/native";

export default function Nav() {
    return (
        <Container>
            <ButtonDrawer>
                <Icon name={"menu-outline"} size={30} color={"white"}></Icon>
            </ButtonDrawer>
        </Container>
    )
}

interface Props{
    navigation: NavigationProp<RootStackParamList, "Home">;
    nome: string
}
export function NavChat(props: Props) {
    return (
        <NavChatContainer>
            <ButtonBack onPress={() => props.navigation.goBack()}>
                <Icon name={"arrow-back"} color={"white"} size={30}/>
            </ButtonBack>
            <AvatarContainer>
                <Avatar></Avatar>
                <Nome numberOfLines={1}>@{props.nome}</Nome>
            </AvatarContainer>
            <Options>
                <Icon name={"ellipsis-vertical"} color={"white"} size={24}/>
            </Options>
        </NavChatContainer>
    )
}

const Container = styled.View`
    width: 100%;
    height: 60px;
    background-color: #10a17d;
`

const ButtonDrawer = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    justify-content: center;
    align-items: center;
`

const NavChatContainer = styled.View`
    width: 100%;
    height: 60px;
    align-items: center;
    flex-direction: row;
    background-color: #10a17d;
`

const ButtonBack = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    justify-content: center;
    align-items: center;
`

const AvatarContainer = styled.View`
    height: 100%;
    flex-direction: row;
    align-items: center;
`

const Avatar = styled.View`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-color: white;
`

const Nome = styled.Text`
    color: white;
    font-size: 18px;
    font-weight: 500;
    margin-left: 10px;
`

const Options = styled.TouchableOpacity`
    widht: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 10px;
`
