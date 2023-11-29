import Icon from "react-native-vector-icons/Ionicons"
import styled from "styled-components/native"
import Constants from "expo-constants";
import { RootStackParamList } from "../../../utils/interfaces"
import { NavigationProp } from "@react-navigation/native";
import { deleteChat } from "../../../data/chatutils";
import { Dimensions, Modal } from "react-native";
import { useContext, useState } from "react";
import { ContextProvider, Provider } from "../../../utils/Provider";
import { NavChatProps } from "./Interface";
import { avatar } from "../../../data/avatar";

export function NavChat(props: NavChatProps) {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const { chatDeletado, setChatDeletado } = useContext<ContextProvider>(Provider);

    const deleteAndGoBack = async(id: number) => {
        await deleteChat(id, "myKey");
        setModalVisible(false);
        setChatDeletado(!chatDeletado);
        props.navigation.goBack();
    }

    const mostrarModal = () => {
        setModalVisible(!modalVisible)
    }

    return (
        <NavChatContainer>
            <ButtonBack onPress={() => props.navigation.goBack()}>
                <Icon name={"arrow-back"} color={"white"} size={30}/>
            </ButtonBack>
            <AvatarContainer>
                <Avatar source={avatar}/>
                <Nome numberOfLines={1}>@{props.nome}</Nome>
            </AvatarContainer>
            <Options onPress={() => mostrarModal()}>
                <Icon name={"ellipsis-vertical"} color={"white"} size={24}/>
            </Options>
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            >
                <ModalContainer>
                    <ModalView>
                        <ModalEscolha onPress={() => deleteAndGoBack(props.idRemetente)}>
                            <FecharModalText>{"Apagar Chat"}</FecharModalText>
                        </ModalEscolha>
                        <ModalEscolha>
                            <FecharModalText>{"Denunciar"}</FecharModalText>
                        </ModalEscolha>
                    </ModalView>
                    <FecharModal onPress={() => mostrarModal()}>
                        <FecharModalText>{"Fechar"}</FecharModalText>
                    </FecharModal>
                </ModalContainer>
            </Modal>
        </NavChatContainer>
    )
}

const height = Dimensions.get('window').height;

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

const Avatar = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
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

const ModalContainer = styled.View`
    margin-top: ${height/2 - Constants.statusBarHeight - 100}px;
    width: 200px;
    height: 200px;
    border-radius: 10px;
    background-color: white;
    align-self: center;
    border-width: 2px;
    border-color: black;
`

const FecharModal = styled.TouchableOpacity`
    width: 80%;
    height: 36px;
    border-radius: 10px;
    background-color: blue;
    align-self: center;
    position: absolute;
    bottom: 10px;
    justify-content: center;
    align-items: center;
`

const FecharModalText = styled.Text`
    color: white;
    font-size: 14px;
    font-weight: 500;
`

const ModalView = styled.View`
    margin-top: 20px;
    width: 80%;
    height: 124px;
    align-self: center;
    flex-direction: column;
    justify-content: space-evenly;
`

const ModalEscolha = styled.TouchableOpacity`
    width: 100%;
    height: 40px;
    border-radius: 4px;
    background-color: blue;
    justify-content: center;
    align-items: center;
`