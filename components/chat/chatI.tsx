import styled from "styled-components/native";
import { Chat } from "../../model/Chat";
import { getCurrentDate } from "../../utils/time";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Navigation, RootStackParamList } from "../../utils/interfaces";

interface Props{
    chat: Chat;
    navigation: Navigation;
}

export default function ChatI(props: Props) {
    return (
        <Container onPress={() => props.navigation.navigation.navigate("ChatScreen")}>
            <AvatarContainer>
                <Avatar></Avatar>
            </AvatarContainer>
            <UserOutros>
                <NameHourContainer>
                    <Nome>@{props.chat.getRemetente()}</Nome>
                    <Hora>{getCurrentDate(props.chat.getTimestamp())}</Hora>
                </NameHourContainer>
                <Mensagem numberOfLines={1}>{props.chat.getConversas()[0].getMensagem()}</Mensagem>
            </UserOutros>
        </Container>
    )
}

const Container = styled.TouchableOpacity`
    width: 100%;
    height: 80px;
    border-bottom-width: 1px;
    border-bottom-color: white;
    flex-direction: row;
    padding-vertical: 10px;
`

const AvatarContainer = styled.View`
    width: 70px;
    height: 70px;
`

const UserOutros = styled.View`
    flex: 1;
`

const NameHourContainer = styled.View`
    width: 100%;
    height: 34px;
    flex-direction: row;
    align-itens: center;
    justify-content: space-between;
    padding-horizontal: 4px;
`

const Nome = styled.Text`
    color: white;
    font-size: 14px;
    font-weight: 500;
`

const Hora = styled.Text`
    color: white;
    font-size: 11px;
    font-weight: 500;
`

const Mensagem = styled.Text`
    padding-horizontal: 6px;
    color: white;
`

const Avatar = styled.View`
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background-color: white;
`
