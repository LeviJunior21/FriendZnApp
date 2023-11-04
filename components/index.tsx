import styled from "styled-components/native";
import Constants from "expo-constants";
import HomePublicacoes from "./homeInicial";
import TodasCategorias from "./homeInicial/nav/todasCategorias";
import { Nav } from "./homeInicial/nav";
import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import { Dimensions } from "react-native";

export default function HomeScreen() {
    const [search, setSearch] = useState<string>("");
    const [openCategoria, setOpenCategoria] = useState<boolean>(false);

    return (
        <Container>
            <StatusBar backgroundColor={"#ffffff"}></StatusBar>
            <Nav openCategoria={openCategoria} setOpenCategoria={setOpenCategoria} search={search} setSearch={setSearch}/>
            <HomePublicacoes search={search}/>
            <Button>
                <Plus>+</Plus>
            </Button>
            <TodasCategorias openCategoria={openCategoria}/>
        </Container>
    )
}

const height = Dimensions.get('window').height;
const Container = styled.SafeAreaView`
    width: 100%;
    height: 100%;
    margin-top: ${Constants.statusBarHeight};
`

const Button = styled.TouchableOpacity`
    width: 80px;
    height: 80px;
    border-radius: 40px;
    background-color: green;
    position: absolute;
    right: 10px;
    bottom: 40px;
    z-index: 2;
    justify-content: center;
    align-items: center;
`

const Plus = styled.Text`
    color: white;
    font-size: 18px;
`
