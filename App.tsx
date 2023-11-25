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
import { Conversa, TipoConversa } from "./model/Conversa";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    const webSock:MutableRefObject<Client | null> = useRef<Client | null>(null);

    const [chatData, setChatData] = useState<Chat[]>([
        Chat.builder()
            .withConversas([
                Conversa.builder()
                .withMensagem("Oi")
                .withRemetente(1)
                .withTimestamp(new Date())
                .withTipoConversa(TipoConversa.SENDER)
                .build()
            ])
            .withRemetente(1)
            .withTimestamp(new Date())
            .build()
    ]);

    useEffect(() => {
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

    useEffect(() => {
        (async() => {
            try {
                const todosChats:Chat[] = await lerChats("myKey");
                //setChatData(todosChats);
            }
            catch(e) {console.log("Ocorreu um erro ao recuperar os chats")}
        })();
    }, [])

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
