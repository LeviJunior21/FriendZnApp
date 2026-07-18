import { ImageSourcePropType } from "react-native";
import styled from "styled-components/native";
import { avatarMasculino } from "../../data/avatar";

interface AvatarImageProps {
    userId?: number;
    size?: number;
    source?: ImageSourcePropType;
}

export default function AvatarImage({ size = 50, source = avatarMasculino }: AvatarImageProps) {
    return <LocalAvatar style={{ width: size, height: size, borderRadius: size / 2 }} source={source}/>;
}

const LocalAvatar = styled.Image`
    background-color: white;
`;
