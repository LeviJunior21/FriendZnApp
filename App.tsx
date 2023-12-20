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
import { dadosIniciaisUsuario, keyBDChat, keyUser, uri_principal } from "./data/constants";
import { carregarMyID } from "./data/myId";
import { LoginCadastroReturns } from "./components/usuario/cadastro/Interface";
import { LogBox } from "react-native";
import { verificarExistenciaGithubServidor } from "./utils/getUsuario";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
    const webSock:MutableRefObject<Client | null> = useRef<Client | null>(null);
    const [chatData, setChatData] = useState<Chat[]>([]);
    const [chatDeletado, setChatDeletado] = useState<boolean>(false);
    const [comentou, setComentou] = useState<boolean>(false);
    const [meusDados, setMeusDados] = useState<LoginCadastroReturns>(dadosIniciaisUsuario);
    const [publicou, setPublicou] = useState<boolean>(false);
    LogBox.ignoreAllLogs();
    
    useEffect(() => {
        carregarChat(keyBDChat);
        var sock = new SockJS(uri_principal + "/ws");
        let stompClient: Client = Stomp.over(sock);
        webSock.current = stompClient;
        webSock.current.connect({}, () => {});
        return () => { if (webSock.current) { 
            webSock.current.disconnect(() => {});
        }};
    },[ setMeusDados ])

    useLayoutEffect(() => {
        carregarDados();
    }, [ setMeusDados ])

    const carregarDados = async() => {
        await carregarMyID(setMeusDados).then(result => {
            if (result == true) {
                console.log("Usuário logado!");
            } else {
                console.log("Usuário não está logado!");
            }
        });
        const response = await verificarExistenciaGithubServidor(meusDados.id);
        if (!response) {
            AsyncStorage.setItem(keyUser, JSON.stringify(dadosIniciaisUsuario));
        }
    }

    const carregarChat = async(key: string) => {
        const chatsCarregados: Chat[] = await lerChats(key, meusDados.id);
        setChatData(chatsCarregados);
    }

    useEffect(() => {
        carregarChat(keyBDChat);
    }, [chatDeletado, setChatDeletado])

    const atualizarChats = async(newConversa: Conversa) => {
        const chats:Chat[] = await gravarConversa(meusDados.id, newConversa, keyBDChat);
        setChatData(chats);
    }
    
    useEffect(() => {
        if (webSock.current !== null && meusDados.id !== -1) {
            webSock.current.connect({}, () => {
                webSock.current?.subscribe(`/user/${meusDados.id}/private`, function (mensagemI) {
                    const data = JSON.parse(mensagemI.body)
                    const dadosConversa:any = {mensagem: data.mensagem, timestamp: data.timestamp, remetente: data.remetente, receptor: data.receptor, idServer: meusDados.id}
                    const newConversa: Conversa = conversaBuilder(dadosConversa, meusDados.id);
                    atualizarChats(newConversa);
                });
            });
        }
    }, [ meusDados ]);

    return (
        <Provider.Provider value={{meusDados, setMeusDados, gravarConversa, chatData, setChatData, webSock, setChatDeletado, chatDeletado, comentou, setComentou, publicou, setPublicou}}>
            <NavigationContainer>
                <NavigationStack/>
            </NavigationContainer>
        </Provider.Provider>
    )
}
