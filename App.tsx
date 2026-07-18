import SockJS from "sockjs-client";
import Stomp from "stompjs";
import NavigationStack from "./components/home/rotas/NavigationStack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "./utils/Provider";
import { MutableRefObject, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
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
import { AppSettings, carregarAppSettings, salvarAppSettings, themeColors } from "./utils/appSettings";
import { AppNotification, carregarNotificacoes, montarNotificacao, salvarNotificacoes } from "./utils/notificacoes";

export default function App() {
    const webSock:MutableRefObject<Client | null> = useRef<Client | null>(null);
    const [chatData, setChatData] = useState<Chat[]>([]);
    const [chatDeletado, setChatDeletado] = useState<boolean>(false);
    const [comentou, setComentou] = useState<boolean>(false);
    const [meusDados, setMeusDados] = useState<LoginCadastroReturns>(dadosIniciaisUsuario);
    const [publicou, setPublicou] = useState<boolean>(false);
    const [appSettings, setAppSettings] = useState<AppSettings>({ themeMode: "dark", notificacoesGerais: true, notificacoesComentarios: true, notificacoesMensagens: true, tocarSomNotificacao: true, vibrarNotificacao: true, quemPodeIniciarChat: "solicitacao" });
    const [notifications, setNotifications] = useState<AppNotification[]>([]);
    const colors = useMemo(() => themeColors[appSettings.themeMode], [appSettings.themeMode]);
    const unreadNotificationCount = useMemo(() => notifications.filter((notification) => !notification.read).length, [notifications]);
    LogBox.ignoreAllLogs();
    
    useEffect(() => {
        carregarChat(keyBDChat);
        carregarPreferencias();
        return () => { if (webSock.current) { 
            webSock.current.disconnect(() => {});
        }};
    },[ setMeusDados ])

    useEffect(() => {
        salvarAppSettings(appSettings);
    }, [appSettings]);

    useEffect(() => {
        salvarNotificacoes(notifications);
    }, [notifications]);

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

    const carregarPreferencias = async() => {
        const [settings, notificacoes] = await Promise.all([
            carregarAppSettings(),
            carregarNotificacoes()
        ]);
        setAppSettings(settings);
        setNotifications(notificacoes);
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

    const addNotification = (notification: AppNotification) => {
        setNotifications((current) => [notification, ...current].slice(0, 80));
    }

    const markNotificationsRead = () => {
        setNotifications((current) => current.map((notification) => ({ ...notification, read: true })));
    }
    
    useEffect(() => {
        if (webSock.current !== null && meusDados.id !== -1) {
            webSock.current.disconnect(() => {});
        }
        if (meusDados.id !== -1) {
            var sock = new SockJS(uri_principal + "/ws");
            let stompClient: Client = Stomp.over(sock);
            webSock.current = stompClient;
            webSock.current.connect({}, () => {
                webSock.current?.subscribe(`/user/${meusDados.id}/private`, function (mensagemI) {
                    const data = JSON.parse(mensagemI.body);
                    const dadosConversa:any = {mensagem: data.mensagem, timestamp: data.timestamp, remetente: data.remetente, receptor: data.receptor, idServer: meusDados.id};
                    const newConversa: Conversa = conversaBuilder(dadosConversa, meusDados.id);
                    atualizarChats(newConversa);
                    if (data.remetente !== meusDados.id && appSettings.notificacoesGerais && appSettings.notificacoesMensagens) {
                        addNotification(montarNotificacao({
                            type: "mensagem",
                            title: data.solicitacao ? "Solicitação para mandar mensagem" : "Nova mensagem",
                            message: data.mensagem,
                            actorId: data.remetente,
                            actorName: data.apelidoRemetente,
                            actorEmoji: data.emojiRemetente,
                        }));
                    }
                });
                webSock.current?.subscribe(`/user/${meusDados.id}/notifications`, function (mensagemI) {
                    const data = JSON.parse(mensagemI.body);
                    if (appSettings.notificacoesGerais) {
                        addNotification(montarNotificacao({
                            type: data.type || "mencao",
                            title: data.title || "Nova notificação",
                            message: data.message || data.mensagem || "",
                            actorId: data.actorId,
                            actorName: data.actorName,
                            actorEmoji: data.actorEmoji,
                            publicacaoId: data.publicacaoId,
                            comentarioId: data.comentarioId,
                        }));
                    }
                });
                webSock.current?.subscribe(`/user/${meusDados.id}/calls`, function (mensagemI) {
                    const data = JSON.parse(mensagemI.body);
                    addNotification(montarNotificacao({
                        type: "chamada",
                        title: data.status === "ended" ? "Chamada encerrada" : "Chamada recebida",
                        message: data.groupCall ? "Ligação em grupo" : "Ligação individual",
                        actorId: data.callerId,
                        actorName: data.callerName,
                        actorEmoji: data.callerEmoji,
                    }));
                });
            });
        }
    }, [ meusDados, appSettings.notificacoesGerais, appSettings.notificacoesMensagens ]);

    return (
        <Provider.Provider value={{meusDados, setMeusDados, gravarConversa, chatData, setChatData, webSock, setChatDeletado, chatDeletado, comentou, setComentou, publicou, setPublicou, appSettings, setAppSettings, colors, notifications, setNotifications, unreadNotificationCount, addNotification, markNotificationsRead}}>
            <NavigationContainer>
                <NavigationStack/>
            </NavigationContainer>
        </Provider.Provider>
    )
}
