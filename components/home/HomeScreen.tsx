import styled from "styled-components/native";
import Constants from "expo-constants";
import HomePublicacoes from "./HomePublicacoes";
import TodasCategorias from "./nav/TodasCategorias";
import { NavCategoria } from "./nav/NavCategoria";
import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import { Categoria, Navigation } from "../../utils/interfaces";

export default function HomeScreen(props: Navigation) {
    const [search, setSearch] = useState<string>("");
    const [openCategoria, setOpenCategoria] = useState<boolean>(false);
    const [categoriaEscolhida, setCategoriaEscolhida] = useState<Categoria>(Categoria.todasCategorias);

    return (
        <Container>
            <StatusBar backgroundColor={"#ffffff"}></StatusBar>
            <NavCategoria categoriaEscolhida={categoriaEscolhida} openCategoria={openCategoria} setOpenCategoria={setOpenCategoria} search={search} setSearch={setSearch}/>
            <HomePublicacoes navigation={props} search={search} categoriaEscolhida={categoriaEscolhida}/>
            <Button onPress={() => props.navigation.navigate("Postar")}>
                <Plus>+</Plus>
            </Button>
            <TodasCategorias openCategoria={openCategoria} setOpenCategoria={setOpenCategoria} categoriaEscolhida={categoriaEscolhida} setCategoriaEscolhida={setCategoriaEscolhida}/>
        </Container>
    )
}

const Container = styled.SafeAreaView`
    width: 100%;
    height: 100%;
    margin-top: ${Constants.statusBarHeight}px;
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