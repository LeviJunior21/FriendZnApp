import Stomp from "stompjs";
import SockJS from "sockjs-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Component } from "react";
import { ChatController } from "../../controller/chat/ChatController";
import { Client } from "stompjs";
import { Chat } from "../../../model/Chat";
import { Conversa, conversaBuilder } from "../../../model/Conversa";
import { Provider } from "../../data/Provider";
import { PublicacaoController } from "../../controller/publicacao/PublicacaoController";
import { ComentarioController } from "../../controller/comentario/ComentarioController";
import { UsuarioController } from "../../controller/usuario/UsuarioController";
import { NavigationStack } from "./NavigationStack";
import { AppTesteProps, AppTesteStateProps } from "./Interface";

export class AppTeste extends Component<AppTesteProps, AppTesteStateProps> {
    constructor(props: AppTesteProps) {
        super(props);
        
        const myID: number = 1;
        const keyBDChat: string = "myKey";
        const webSocket: Client = Stomp.over(new SockJS('http://10.0.0.181:8080/ws'));
        const comentarioController: ComentarioController = new ComentarioController(webSocket);
        const usuarioController: UsuarioController = new UsuarioController();
        const chatController: ChatController = new ChatController(webSocket, keyBDChat, myID);
        const publicacaoController: PublicacaoController = new PublicacaoController(myID);

        this.state = {
            chatData: [],
            myID,
            keyBDChat,
            webSocket,
            publicacaoController,
            chatController,
            comentarioController,
            usuarioController
        }
    }

    componentDidMount(): void {
        AsyncStorage.setItem("myKey", JSON.stringify([]))
        this.state.webSocket.connect({}, () => {});
        this.state.chatController.lerChats().then(
            (chatsCarregados: Chat[]) => this.setState({ chatData: chatsCarregados })
        );

        this.state.webSocket.connect({}, () => {
            this.state.webSocket.subscribe(`/user/${this.state.myID}/private`, (mensagemI: any) => {
                const data = JSON.parse(mensagemI.body)
                const dadosConversa:Object = this.state.chatController.conversaSubcribeToJSON(data);
                const newConversa: Conversa = conversaBuilder(dadosConversa);
                this.state.chatController.atualizarChats(newConversa).then(
                    (chats: Chat[]) => this.setState({chatData: chats})
                )
            });
        });        
    }

    componentWillUnmount() {
        this.state.webSocket.disconnect(() => {}); 
    }

    render() {

        return (
            <Provider.Provider value={{
                chatController: this.state.chatController, 
                publicacaoController: this.state.publicacaoController, 
                comentarioController: this.state.comentarioController, 
                usuarioController: this.state.usuarioController
            }}>
                <NavigationStack/>
            </Provider.Provider>
        )
    }
}
