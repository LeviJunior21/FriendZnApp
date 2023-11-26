import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/homeInicial";
import Postar from "./components/postar";
import { RootStackParamList } from "./utils/interfaces";
import Login from "./components/login";
import TodosComentarios from "./components/comentario";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import Chats from "./components/chat";
import ChatScreen from "./components/chat/chatScreen";
import { Provider } from "./utils/Provider";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { gravarConversa, lerChats } from "./data/utils"; 
import { Client } from "stompjs";
import { Chat } from "./model/Chat";
import { Conversa, TipoConversa, conversaBuilder } from "./model/Conversa";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { myID } from "./data/myId";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    const webSock:MutableRefObject<Client | null> = useRef<Client | null>(null);
    const [chatData, setChatData] = useState<Chat[]>([]);

    useEffect(() => {
        AsyncStorage.setItem("myKey", JSON.stringify([]))
        carregarChat("myKey")
        var sock = new SockJS("http://10.0.0.181:8080/ws");
        let stompClient: Client = Stomp.over(sock);
        webSock.current = stompClient;
        webSock.current.connect({}, () => {
            if (webSock.current?.connected) {
                console.log("Conexão WebSocket estabelecida");
            } else {
                console.log("Conexão WebSocket não está estabelecida");
            }
        })
    
        return () => {
            if (webSock.current) { webSock.current.disconnect(() => { console.log("Desconectado.") }); }
        };
    },[])

    const carregarChat = async(key: string) => {
        const chatsCarregados: Chat[] = await lerChats(key);
        setChatData(chatsCarregados);
    }
    
    useEffect(() => {
        if (webSock.current != null) {
            webSock.current.connect({}, function (frame) {
                webSock.current?.subscribe(`/user/${myID}/private`, function (mensagemI) {
                    console.log("\n\n\n\n\n\n\nRecebida:" + mensagemI.body + "\n\n\n\n\n\n")
                    const data = JSON.parse(mensagemI.body)
                    const dadosConversa:any = {mensagem: data.mensagem, timestamp: data.timestamp, tipoConversa: data.tipoConversa, remetente: data.remetente, receptor: data.receptor}
                    const newConversa: Conversa = conversaBuilder(dadosConversa);
                    atualizarChats(newConversa);
                });
            });
        }
    }, [])

    const atualizarChats = async(newConversa: Conversa) => {
        const chats:Chat[] = await gravarConversa(newConversa, "myKey");
        setChatData(chats);
    }

    return (
        <Provider.Provider value={{gravarConversa, chatData, setChatData, webSock}}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={"Login"} screenOptions={{headerShown: false}}>
                    <Stack.Screen name={"Login"} component={Login}/>
                    <Stack.Screen name={"Postar"} component={Postar}/>
                    <Stack.Screen name={"Comentario"} component={TodosComentarios}/>
                    <Stack.Screen name={"Home"} component={Bottoms}/>
                    <Stack.Screen name={"ChatScreen"} component={ChatScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider.Provider>
    )
}

const Tab = createBottomTabNavigator();
function Bottoms() {
    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="TabHome" component={HomeScreen} 
            options={{ tabBarLabel: "Home", tabBarIcon: ({color, size}) => (<Icon name="home-outline" size={size} color={color}/>)}}/>
            <Tab.Screen name="Chat" component={Chats}
            options={{ tabBarLabel: "Chat", tabBarIcon: ({color, size}) => (<Icon name="chatbox-ellipses-outline" size={size} color={color}/>)}}/>
        </Tab.Navigator>
    )

}
