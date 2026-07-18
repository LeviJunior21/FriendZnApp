import styled from "styled-components/native";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/Ionicons";
import AvatarBottoms from "./AvatarBottoms";

export default function Avatar() {
    return (
        <Container>
            <NavContainer>
                <RouteNavContainer>
                    <ButtonBack>
                        <Icon name={"arrow-back"} color={"white"} size={30}/>
                    </ButtonBack>
                    <TextRoute>Escolha seu avatar</TextRoute>
                </RouteNavContainer>
                <SelecionarButton>
                    <SelecionarButtonText>SELECIONAR</SelecionarButtonText>
                </SelecionarButton>
            </NavContainer>

            <AvatarContainer>
                <AvatarUserContainer>
                    <AvatarView></AvatarView>
                </AvatarUserContainer>
               <AvatarBottoms/>
            </AvatarContainer>
        </Container>
    )
}


const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #303030;
    margin-top: ${Constants.statusBarHeight}px;
`

const NavContainer = styled.View`
    width: 100%;
    height: 50px;
    padding-horizontal: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: green;
`

const RouteNavContainer = styled.View`
    flex-direction: row;
    align-items: center;
`

const ButtonBack = styled.TouchableOpacity`
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
`

const TextRoute = styled.Text`
    color: white;
    font-size: 18px;
    font-weight: 500;
    margin-left: 10px;
`

const SelecionarButton = styled.TouchableOpacity`
    min-width: 10px;
`

const SelecionarButtonText = styled.Text`
    color: white;
`

const AvatarContainer = styled.View`
    flex: 1;
`

const AvatarUserContainer = styled.View`
    width: 100%;
    height: 130px;
    justify-content: center;
    align-items: center;
`

const AvatarView = styled.View`
    width: 90px;
    height: 90px;
    border-radius: 45px;
    background-color: green;
    justify-content: center;
    align-items: center;
`
