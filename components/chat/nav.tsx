import Icon from "react-native-vector-icons/Ionicons"
import styled from "styled-components/native"

export default function Nav() {
    return (
        <Container>
            <ButtonDrawer>
                <Icon name={"menu-outline"} size={30} color={"white"}></Icon>
            </ButtonDrawer>
        </Container>
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
