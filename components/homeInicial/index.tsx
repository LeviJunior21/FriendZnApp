import styled from "styled-components/native";
import Constants from "expo-constants";
import HomePublicacoes from "./homePublicacoes";
import TodasCategorias from "./nav/todasCategorias";
import { Nav } from "./nav";
import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import { Dimensions } from "react-native";
import { Categoria } from "../../utils/interfaces";

export default function HomeScreen() {
    const [search, setSearch] = useState<string>("");
    const [openCategoria, setOpenCategoria] = useState<boolean>(false);
    const [categoriaEscolhida, setCategoriaEscolhida] = useState<Categoria>(Categoria.todasCategorias);

    return (
        <Container>
            <StatusBar backgroundColor={"#ffffff"}></StatusBar>
            <Nav categoriaEscolhida={categoriaEscolhida} openCategoria={openCategoria} setOpenCategoria={setOpenCategoria} search={search} setSearch={setSearch}/>
            <HomePublicacoes search={search} categoriaEscolhida={categoriaEscolhida}/>
            <Button>
                <Plus>+</Plus>
            </Button>
            <TodasCategorias openCategoria={openCategoria} setOpenCategoria={setOpenCategoria} categoriaEscolhida={categoriaEscolhida} setCategoriaEscolhida={setCategoriaEscolhida}/>
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
