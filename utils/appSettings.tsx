import AsyncStorage from "@react-native-async-storage/async-storage";

export type ThemeMode = "dark" | "light";
export type ChatStartPermission = "todos" | "solicitacao" | "nenhum";

export interface AppSettings {
    themeMode: ThemeMode;
    notificacoesGerais: boolean;
    notificacoesComentarios: boolean;
    notificacoesMensagens: boolean;
    tocarSomNotificacao: boolean;
    vibrarNotificacao: boolean;
    quemPodeIniciarChat: ChatStartPermission;
}

export const appSettingsKey = "friendzn-app-settings";

export const defaultAppSettings: AppSettings = {
    themeMode: "dark",
    notificacoesGerais: true,
    notificacoesComentarios: true,
    notificacoesMensagens: true,
    tocarSomNotificacao: true,
    vibrarNotificacao: true,
    quemPodeIniciarChat: "solicitacao",
};

export const themeColors = {
    dark: {
        background: "#303030",
        surface: "#404040",
        elevated: "#36474f",
        primary: "#10a17d",
        text: "#ffffff",
        mutedText: "#c9c9c9",
        border: "#707070",
        input: "#262626",
    },
    light: {
        background: "#f5f7f8",
        surface: "#ffffff",
        elevated: "#e9f6f2",
        primary: "#087a60",
        text: "#14201d",
        mutedText: "#57645f",
        border: "#cfd8d5",
        input: "#ffffff",
    },
};

export const carregarAppSettings = async (): Promise<AppSettings> => {
    const raw = await AsyncStorage.getItem(appSettingsKey);
    if (!raw) return defaultAppSettings;
    return { ...defaultAppSettings, ...JSON.parse(raw) };
};

export const salvarAppSettings = async (settings: AppSettings): Promise<void> => {
    await AsyncStorage.setItem(appSettingsKey, JSON.stringify(settings));
};
