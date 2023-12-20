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
import { RefreshControl } from "react-native-gesture-handler";

export default function Seguindo(props: NavigationProps) {
    const [publicacoesSeguidas, setPublicacoesSeguidas] = useState<Publicacao[]>([]);
    const { comentou, meusDados, publicou } = useContext<ContextProvider>(Provider);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (meusDados.id !== -1 && meusDados.codigoAcesso !== -1) {
            const buscarSeguindo = async() => {
                await getPublicacoesSeguidas(meusDados.id, setPublicacoesSeguidas);
            }; buscarSeguindo();
        }
    }, [comentou, publicou, refreshing]);

    const refreshData = async() => {
        setRefreshing(true);
        await getPublicacoesSeguidas(meusDados.id, setPublicacoesSeguidas);
        setRefreshing(false);
    }

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
            <HomeScroll
            refreshControl={
                <RefreshControl
                refreshing={refreshing} 
                onRefresh={refreshData}/>
            }
            >
                <FlatList
                data={publicacoesSeguidas}
                ItemSeparatorComponent={() => <Separator/>}
                renderItem={({item, index}) => 
                    <PublicacaoUser navigation={props.navigation} publicacao={item} index={index}/>
                }
            />
            </HomeScroll>
        </Container>
    )
}

const height = Dimensions.get("window").height;
const Container = styled.SafeAreaView`
    margin-top: ${Constants.statusBarHeight}px;
    height: ${Dimensions.get("window").height - Constants.statusBarHeight - 20}px;
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

const HomeScroll = styled.ScrollView`
    height: ${height - 100}px;
    width: 100%;
`

const Separator = styled.View`
    width: 100%;
    height: 2px;
    background-color: white;
`
