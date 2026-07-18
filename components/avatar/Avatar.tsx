import styled from "styled-components/native";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/Ionicons";
import { useContext, useState } from "react";
import { ImageSourcePropType } from "react-native";
import { avatarFeminino, avatarMasculino } from "../../data/avatar";
import { ContextProvider, Provider } from "../../utils/Provider";
import { Navigation } from "../../utils/interfaces";

export default function Avatar(props: Navigation) {
    const { colors } = useContext<ContextProvider>(Provider);
    const [selectedAvatar, setSelectedAvatar] = useState<ImageSourcePropType>(avatarMasculino);

    const selecionarAvatar = () => {
        props.navigation.goBack();
    }

    return (
        <Container style={{backgroundColor: colors.background}}>
            <NavContainer style={{backgroundColor: colors.primary}}>
                <RouteNavContainer>
                    <ButtonBack onPress={() => props.navigation.goBack()}>
                        <Icon name={"arrow-back"} color={"white"} size={30}/>
                    </ButtonBack>
                    <TextRoute>Escolha seu avatar</TextRoute>
                </RouteNavContainer>
                <SelecionarButton onPress={selecionarAvatar}>
                    <SelecionarButtonText>SELECIONAR</SelecionarButtonText>
                </SelecionarButton>
            </NavContainer>

            <AvatarContainer>
                <AvatarUserContainer>
                    <AvatarView>
                        <AvatarPreview source={selectedAvatar}/>
                    </AvatarView>
                </AvatarUserContainer>
                <SectionTitle>Avatares</SectionTitle>
                <OptionsRow>
                    <PresetButton onPress={() => setSelectedAvatar(avatarMasculino)}>
                        <AvatarOption source={avatarMasculino}/>
                        <PresetText>Masculino</PresetText>
                    </PresetButton>
                    <PresetButton onPress={() => setSelectedAvatar(avatarFeminino)}>
                        <AvatarOption source={avatarFeminino}/>
                        <PresetText>Feminino</PresetText>
                    </PresetButton>
                </OptionsRow>
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
    background-color: white;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`

const AvatarPreview = styled.Image`
    width: 90px;
    height: 90px;
`

const OptionsRow = styled.View`
    flex-direction: row;
    padding-horizontal: 10px;
    gap: 10px;
`

const SectionTitle = styled.Text`
    color: white;
    font-size: 16px;
    font-weight: 700;
    padding-horizontal: 12px;
    padding-vertical: 8px;
`

const PresetButton = styled.TouchableOpacity`
    width: 96px;
    height: 106px;
    align-items: center;
    justify-content: center;
    border-width: 1px;
    border-color: gray;
    border-radius: 6px;
`

const AvatarOption = styled.Image`
    width: 62px;
    height: 62px;
    border-radius: 31px;
    background-color: white;
`

const PresetText = styled.Text`
    color: white;
    font-size: 12px;
    margin-top: 6px;
`
