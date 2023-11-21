import Icon from "react-native-vector-icons/Ionicons"
import styled from "styled-components/native"
import { Navigation } from "../../utils/interfaces"

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
    navigation: Navigation;
}
export function NavChat(props: Props) {
    return (
        <NavChatContainer>
            <ButtonBack onPress={() => props.navigation.navigation.navigate("Chat")}>
                <Icon name={"arrow-back"} color={"white"} size={30}/>
            </ButtonBack>
        </NavChatContainer>
    )
}

const Container = styled.View`
    width: 100%;
    height: 50px;
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
    height: 50px;
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