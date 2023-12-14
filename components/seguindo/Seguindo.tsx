import styled from "styled-components/native"
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/Ionicons";
import { Dimensions, FlatList } from "react-native";
import { PublicacaoUser } from "../publicacao/Publicacao";
import { NavigationProps } from "./Interface";
import { Publicacao } from "../../model/Publicacao";
import { useContext, useEffect, useState } from "react";
import { ContextProvider, Provider } from "../../utils/Provider";
import { getPublicacoesSeguidas } from "../../utils/getPublicacoesSeguidas";

export default function Seguindo(props: NavigationProps) {
    const [publicacoesSeguidas, setPublicacoesSeguidas] = useState<Publicacao[]>([]);
    const { comentou, meusDados } = useContext<ContextProvider>(Provider);

    useEffect(() => {
        const buscarSeguindo = async() => {
            await getPublicacoesSeguidas(meusDados.id, setPublicacoesSeguidas);
        }; buscarSeguindo();
    }, [comentou]);

    return (
        <Container>
            <NavContainer>
                <NavButtonIconContainer onPress={() => props.navigation.openDrawer()}>
                    <Icon name={"menu-outline"} color={"white"} size={30}/>
                </NavButtonIconContainer>
                <NavButtonIconContainer>
                    <Icon name={"notifications"} color={"white"} size={26}/>
                </NavButtonIconContainer>
            </NavContainer>
            <FlatList
            data={publicacoesSeguidas}
            renderItem={({item, index}) => 
                <PublicacaoUser navigation={props.navigation} publicacao={item} index={index}/>
            }
            />
        </Container>
    )
}

const Container = styled.SafeAreaView`
    margin-top: ${Constants.statusBarHeight}px;
    height: ${Dimensions.get("window").height - Constants.statusBarHeight}px;
    background-color: #303030;
`

const NavContainer = styled.View`
    width: 100%;
    height: 50px;
    background-color: #10a17d;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const NavButtonIconContainer = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    justify-content: center;
    align-items: center;
`
