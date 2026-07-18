import AsyncStorage from "@react-native-async-storage/async-storage";

export type NotificationType = "comentario" | "mencao" | "resposta" | "mensagem" | "chat_solicitacao" | "chamada";

export interface AppNotification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
    actorId?: number;
    actorName?: string;
    actorEmoji?: string;
    avatarUrl?: string;
    publicacaoId?: number;
    comentarioId?: number;
    chatId?: number;
}

export const notificationsKey = "friendzn-notifications";

export const carregarNotificacoes = async (): Promise<AppNotification[]> => {
    const raw = await AsyncStorage.getItem(notificationsKey);
    if (!raw) return [];
    return JSON.parse(raw);
};

export const salvarNotificacoes = async (notifications: AppNotification[]): Promise<void> => {
    await AsyncStorage.setItem(notificationsKey, JSON.stringify(notifications.slice(0, 80)));
};

export const montarNotificacao = (notification: Omit<AppNotification, "id" | "timestamp" | "read">): AppNotification => ({
    ...notification,
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    timestamp: new Date().toISOString(),
    read: false,
});
