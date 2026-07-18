export interface AvatarPreset {
    id: string;
    label: string;
    style: "avataaars" | "adventurer" | "notionists" | "thumbs";
    seed: string;
    options?: Record<string, string>;
}

export interface AvatarExtensionLayer {
    id: string;
    label: string;
    svg?: string;
    dicebearOption?: Record<string, string>;
}

export const avatarPresets: AvatarPreset[] = [
    { id: "calm", label: "Calmo", style: "avataaars", seed: "friendzn-calm", options: { accessories: "prescription01", top: "shortHairShortFlat", facialHair: "blank" } },
    { id: "focus", label: "Foco", style: "avataaars", seed: "friendzn-focus", options: { accessories: "round", top: "shortHairTheCaesar", facialHair: "blank" } },
    { id: "soft", label: "Leve", style: "notionists", seed: "friendzn-soft" },
    { id: "space", label: "Espacial", style: "adventurer", seed: "friendzn-space" },
    { id: "spark", label: "Faísca", style: "thumbs", seed: "friendzn-spark" },
];

export const avatarExtensionLayers: AvatarExtensionLayer[] = [
    { id: "skin-light", label: "Pele clara", dicebearOption: { skinColor: "f8d25c" } },
    { id: "skin-brown", label: "Pele marrom", dicebearOption: { skinColor: "ae5d29" } },
    { id: "glasses-round", label: "Óculos redondo", dicebearOption: { accessories: "round" } },
    { id: "glasses-prescription", label: "Óculos fino", dicebearOption: { accessories: "prescription01" } },
];

export const buildDicebearUri = (preset: AvatarPreset, extraOptions: Record<string, string> = {}) => {
    const options = { seed: preset.seed, ...preset.options, ...extraOptions };
    const params = Object.entries(options)
        .filter(([, value]) => value !== undefined && value !== "")
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join("&");
    return `https://api.dicebear.com/9.x/${preset.style}/svg?${params}`;
};

export const avatarStorageKey = "friendzn-avatar-preset";
