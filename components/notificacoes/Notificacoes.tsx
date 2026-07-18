import { useContext, useEffect } from "react";
import styled from "styled-components/native";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/Ionicons";
import { ContextProvider, Provider } from "../../utils/Provider";
import { Navigation } from "../../utils/interfaces";
import AvatarImage from "../avatar/AvatarImage";
import EmojiBadge from "../emoji/EmojiBadge";
import { getCurrentDate } from "../../utils/time";

export default function Notificacoes(props: Navigation) {
    const { notifications, markNotificationsRead, colors } = useContext<ContextProvider>(Provider);

    useEffect(() => {
        markNotificationsRead();
    }, []);

    return (
        <Container style={{backgroundColor: colors.background}}>
            <NavContainer style={{backgroundColor: colors.primary}}>
                <ButtonNavIcon onPress={() => props.navigation.goBack()}>
                    <Icon name={"arrow-back"} color={"white"} size={30}/>
                </ButtonNavIcon>
                <NavText>Notificações</NavText>
            </NavContainer>
            <Scroll>
                {notifications.length === 0?
                    <EmptyText style={{color: colors.mutedText}}>Nenhuma notificação por enquanto.</EmptyText>:
                    notifications.map((notification) => (
                        <NotificationItem key={notification.id} style={{backgroundColor: colors.surface, borderColor: colors.border}}>
                            <AvatarImage userId={notification.actorId} size={48}/>
                            <NotificationContent>
                                <TitleRow>
                                    <Title style={{color: colors.text}}>{notification.title}</Title>
                                    <EmojiBadge emoji={notification.actorEmoji} size={18}/>
                                </TitleRow>
                                <Message style={{color: colors.text}} numberOfLines={3}>{notification.message}</Message>
                                {notification.actorName?
                                    <Meta style={{color: colors.mutedText}}>@{notification.actorName} · {getCurrentDate(new Date(notification.timestamp))}</Meta>:
                                    <Meta style={{color: colors.mutedText}}>{getCurrentDate(new Date(notification.timestamp))}</Meta>
                                }
                                {notification.type === "chat_solicitacao" || notification.title.toLowerCase().includes("solicitação")?
                                    <ActionRow>
                                        <ActionButton style={{backgroundColor: colors.primary}}>
                                            <ActionText>Aceitar</ActionText>
                                        </ActionButton>
                                        <ActionButton style={{borderColor: colors.border}}>
                                            <ActionText style={{color: colors.text}}>Negar</ActionText>
                                        </ActionButton>
                                    </ActionRow>:<></>
                                }
                            </NotificationContent>
                        </NotificationItem>
                    ))
                }
            </Scroll>
        </Container>
    )
}

const Container = styled.SafeAreaView`
    flex: 1;
    margin-top: ${Constants.statusBarHeight}px;
`;

const NavContainer = styled.View`
    width: 100%;
    height: 50px;
    flex-direction: row;
    align-items: center;
`;

const ButtonNavIcon = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    justify-content: center;
    align-items: center;
`;

const NavText = styled.Text`
    color: white;
    font-size: 20px;
    font-weight: 600;
`;

const Scroll = styled.ScrollView`
    flex: 1;
`;

const NotificationItem = styled.View`
    min-height: 92px;
    flex-direction: row;
    padding: 12px;
    border-bottom-width: 1px;
`;

const NotificationContent = styled.View`
    flex: 1;
    margin-left: 10px;
`;

const TitleRow = styled.View`
    flex-direction: row;
    align-items: center;
`;

const Title = styled.Text`
    font-weight: 700;
    font-size: 15px;
`;

const Message = styled.Text`
    margin-top: 3px;
    font-size: 14px;
`;

const Meta = styled.Text`
    margin-top: 6px;
    font-size: 11px;
`;

const EmptyText = styled.Text`
    padding: 20px;
`;

const ActionRow = styled.View`
    flex-direction: row;
    gap: 8px;
    margin-top: 10px;
`;

const ActionButton = styled.TouchableOpacity`
    min-width: 90px;
    height: 34px;
    border-radius: 6px;
    border-width: 1px;
    justify-content: center;
    align-items: center;
`;

const ActionText = styled.Text`
    color: white;
    font-weight: 700;
`;
