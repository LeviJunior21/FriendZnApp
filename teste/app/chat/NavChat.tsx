import Constants from "expo-constants";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";
import { Component, useContext } from "react";
import { Dimensions, Modal } from "react-native";
import { ContextTypeProvider, Provider } from "../../data/Provider";
import { NavChatParamsProps, NavChatProps } from "./Interfaces";

export class NavChat extends Component<NavChatProps, NavChatParamsProps> {
    constructor(props: NavChatProps) {
        super(props);
        const { chatController } = useContext(Provider) as ContextTypeProvider;

        this.state = {
            nome: props.nome,
            idRemetente: props.idRemetente,
            modalVisible: false,
            chatController,
            navigation: props.navigation
        };
    }

    deleteAndGoBack = async(id: number) => {
        await this.state.chatController.deleteChat(id);
        this.setState({ modalVisible: false });
        this.state.navigation.goBack();
    };

    mostrarModal = () => {
        this.setState({ modalVisible: !this.state.modalVisible });
    };

    render() {
        return (
            <NavChatContainer>
                <ButtonBack onPress={() => this.state.navigation.goBack()}>
                    <Icon name={"arrow-back"} color={"white"} size={30}/>
                </ButtonBack>
                <AvatarContainer>
                    <Avatar></Avatar>
                    <Nome numberOfLines={1}>@{this.state.nome}</Nome>
                </AvatarContainer>
                <Options onPress={() => this.mostrarModal()}>
                    <Icon name={"ellipsis-vertical"} color={"white"} size={24}/>
                </Options>
                <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                >
                    <ModalContainer>
                        <ModalView>
                            <ModalEscolha onPress={() => this.deleteAndGoBack(this.state.idRemetente)}>
                                <FecharModalText>{"Apagar Chat"}</FecharModalText>
                            </ModalEscolha>
                            <ModalEscolha>
                                <FecharModalText>{"Denunciar"}</FecharModalText>
                            </ModalEscolha>
                        </ModalView>
                        <FecharModal onPress={() => this.mostrarModal()}>
                            <FecharModalText>{"Fechar"}</FecharModalText>
                        </FecharModal>
                    </ModalContainer>
                </Modal>
            </NavChatContainer>
        )
    }
}

const height = Dimensions.get('window').height;
const Container = styled.View`
    width: 100%;
    height: 50px;
    align-items: center;
    flex-direction: row;
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