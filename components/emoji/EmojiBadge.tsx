import styled from "styled-components/native";

interface EmojiBadgeProps {
    emoji?: string;
    size?: number;
}

export default function EmojiBadge({ emoji = "", size = 20 }: EmojiBadgeProps) {
    if (!emoji) return null;

    if (emoji.startsWith("http")) {
        return <AnimatedEmoji style={{ width: size, height: size }} source={{ uri: emoji }}/>;
    }

    return <EmojiText style={{ fontSize: size }}>{emoji}</EmojiText>;
}

const AnimatedEmoji = styled.Image`
    margin-left: 4px;
`;

const EmojiText = styled.Text`
    margin-left: 4px;
`;
