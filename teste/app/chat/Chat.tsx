import Constants from "expo-constants";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";
import { Component, useContext } from "react";
import { ContextTypeProvider, Provider } from "../../data/Provider";
import { Chat } from "../../../model/Chat";
import { FlatList } from "react-native";
import { ChatAppProps, ChatAppStateProps } from "./Interfaces";
import { ChatItem } from "./ChatItem";

export class ChatApp extends Component<ChatAppProps, ChatAppStateProps> {
    constructor(props: ChatAppProps) {
        super(props);
        const { chatController } = useContext(Provider) as ContextTypeProvider;

        this.state = {
            chatData: [],
            navigation: props.navigation,
            chatController
        }
    }

    componentDidMount(): void {
        this.state.chatController.lerChats().then(
            (chats: Chat[]) => this.setState({ chatData: chats })
        )
    }

    render() {
        return (
            <Container>
                <NavContainer>
                    <NavButtonDrawer>
                        <Icon name={"menu-outline"} size={30} color={"white"}></Icon>
                    </NavButtonDrawer>
                </NavContainer>
                <FlatList
                data={this.state.chatData.filter((chat:Chat) => chat.getConversas().length > 0)}
                renderItem={({item}) => 
                    <ChatItem chat={item} navigation={this.state.navigation}/>
                }
            />
        </Container>
        )
    }
}

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #303030;
    margin-top: ${Constants.statusBarHeight}px;
`

const NavContainer = styled.View`
    width: 100%;
    height: 50px;
    align-items: center;
    flex-direction: row;
    background-color: #10a17d;
`

const NavButtonDrawer = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    justify-content: center;
    align-items: center;
`