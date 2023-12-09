import SockJS from "sockjs-client";
import Stomp from "stompjs";
import NavigationStack from "./components/home/rotas/NavigationStack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "./utils/Provider";
import { MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gravarConversa, lerChats } from "./data/chatutils"; 
import { Client } from "stompjs";
import { Chat } from "./model/Chat";
import { Conversa, conversaBuilder } from "./model/Conversa";
import { keyBDChat } from "./data/constants";
import { carregarMyID } from "./data/myId";
import { DadosProps } from "./utils/interfaces";

export default function App() {
    const webSock:MutableRefObject<Client | null> = useRef<Client | null>(null);
    const [chatData, setChatData] = useState<Chat[]>([]);
    const [chatDeletado, setChatDeletado] = useState<boolean>(false);
    const [comentou, setComentou] = useState<boolean>(false);
    const [meusDados, setMeusDados] = useState<DadosProps>({idAuth: -1, idServer: -1});

    useEffect(() => {
        carregarChat(keyBDChat);
        var sock = new SockJS("http://10.0.0.181:8080/ws");
        let stompClient: Client = Stomp.over(sock);
        webSock.current = stompClient;
        webSock.current.connect({}, () => {});
        return () => { if (webSock.current) { 
            webSock.current.disconnect(() => {});
        }};
    },[])

    useLayoutEffect(() => {
        carregarDados();
    }, [ setMeusDados ])

    const carregarDados = async() => {
        carregarMyID(setMeusDados).then(result => {
            if (result == true) {
                console.log("Usuário logado!");
            } else {
                console.log("Usuário não está logado!");
            }
        });
    }

    const carregarChat = async(key: string) => {
        const chatsCarregados: Chat[] = await lerChats(key);
        setChatData(chatsCarregados);
    }

    useEffect(() => {
        carregarChat(keyBDChat);
    }, [chatDeletado, setChatDeletado])

    const atualizarChats = async(newConversa: Conversa) => {
        const chats:Chat[] = await gravarConversa(meusDados.idServer, newConversa, keyBDChat);
        setChatData(chats);
    }
    
    useEffect(() => {
        if (webSock.current !== null && meusDados.idServer !== -1) {
            webSock.current.connect({}, () => {
                webSock.current?.subscribe(`/user/${meusDados.idServer}/private`, function (mensagemI) {
                    const data = JSON.parse(mensagemI.body)
                    const dadosConversa:any = {mensagem: data.mensagem, timestamp: data.timestamp, remetente: data.remetente, receptor: data.receptor, idServer: 1}
                    const newConversa: Conversa = conversaBuilder(dadosConversa);
                    atualizarChats(newConversa);
                });
            });
        }
    }, [ meusDados ]);

    return (
        <Provider.Provider value={{meusDados, setMeusDados, gravarConversa, chatData, setChatData, webSock, setChatDeletado, chatDeletado, comentou, setComentou}}>
            <NavigationContainer>
                <NavigationStack/>
            </NavigationContainer>
        </Provider.Provider>
    )
}
