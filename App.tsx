import SockJS from "sockjs-client";
import Stomp from "stompjs";
import NavigationStack from "./components/home/rotas/NavigationStack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "./utils/Provider";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { gravarConversa, lerChats } from "./data/utils"; 
import { Client } from "stompjs";
import { Chat } from "./model/Chat";
import { Conversa, conversaBuilder } from "./model/Conversa";
import { myID } from "./data/myId";

export default function App() {
    const webSock:MutableRefObject<Client | null> = useRef<Client | null>(null);
    const [chatData, setChatData] = useState<Chat[]>([]);
    const [chatDeletado, setChatDeletado] = useState<boolean>(false);

    useEffect(() => {
        //AsyncStorage.setItem("myKey", JSON.stringify([]))
        carregarChat("myKey")
        var sock = new SockJS("http://10.0.0.181:8080/ws");
        let stompClient: Client = Stomp.over(sock);
        webSock.current = stompClient;
        webSock.current.connect({}, () => {
            if (webSock.current?.connected) { console.log("Conexão WebSocket estabelecida"); } 
            else { console.log("Conexão WebSocket não está estabelecida"); }
        })
        return () => { if (webSock.current) { webSock.current.disconnect(() => { console.log("Desconectado.") }); }};
    },[])

    const carregarChat = async(key: string) => {
        const chatsCarregados: Chat[] = await lerChats(key);
        setChatData(chatsCarregados);
    }

    useEffect(() => {
        carregarChat("myKey");
    }, [chatDeletado, setChatDeletado])

    const atualizarChats = async(newConversa: Conversa) => {
        const chats:Chat[] = await gravarConversa(newConversa, "myKey");
        setChatData(chats);
    }
    
    useEffect(() => {
        if (webSock.current != null) {
            webSock.current.connect({}, function (frame) {
                webSock.current?.subscribe(`/user/${myID}/private`, function (mensagemI) {
                    const data = JSON.parse(mensagemI.body)
                    const dadosConversa:any = {mensagem: data.mensagem, timestamp: data.timestamp, tipoConversa: data.tipoConversa, remetente: data.remetente, receptor: data.receptor}
                    const newConversa: Conversa = conversaBuilder(dadosConversa);
                    atualizarChats(newConversa);
                });
            });
        }
    }, [])

    return (
        <Provider.Provider value={{gravarConversa, chatData, setChatData, webSock, setChatDeletado, chatDeletado}}>
            <NavigationContainer>
                <NavigationStack/>
            </NavigationContainer>
        </Provider.Provider>
    )
}
