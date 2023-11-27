import Constants from "expo-constants";
import styled from "styled-components/native";
import TodasCategorias from "./NavHome/TodasCategorias";
import { Component } from "react";
import { HomeProps, HomeStateProps } from "./Interface";
import { StatusBar } from "expo-status-bar";
import { HomePublicacoes } from "./HomePublicacoes";
import { Categoria } from "../../../utils/interfaces";
import { NavHome } from "./NavHome/NavHome";

export default class Home extends Component<HomeProps, HomeStateProps> {
    constructor(props: HomeProps) {
        super(props);

        this.state = {
            search: "",
            openCategoria: false,
            navigation: props.navigation,
            categoriaEscolhida: Categoria.todasCategorias
        }
    }

    public setOpenCategoria(openCategoria: boolean) {
        this.setState({ openCategoria: openCategoria});
    }

    public setSearch(search: string) {
        this.setState({ search: search});
    }

    public setCategoriaEscolhida(categoriaEscolhida: Categoria) {
        this.setState({ categoriaEscolhida: categoriaEscolhida });
    }

    render() {
       return (
            <Container>
                <StatusBar backgroundColor={"#ffffff"}></StatusBar>
                <NavHome categoriaEscolhida={this.state.categoriaEscolhida} openCategoria={this.state.openCategoria} search={this.state.search} setOpenCategoria={this.setOpenCategoria} setSearch={this.setSearch}/>
                <HomePublicacoes navigation={this.state.navigation} search={this.state.search} categoriaEscolhida={this.state.categoriaEscolhida}/>
                <Button onPress={() => this.state.navigation.navigate("Postar")}>
                    <Plus>+</Plus>
                </Button>
                <TodasCategorias openCategoria={this.state.openCategoria} categoriaEscolhida={this.state.categoriaEscolhida} setOpenCategoria={this.setOpenCategoria} setCategoriaEscolhida={this.setCategoriaEscolhida}/>
            </Container>
        )
    }
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
