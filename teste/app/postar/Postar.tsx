import Constants from "expo-constants";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";
import { Component, useContext } from "react";
import { Dimensions, FlatList, ScrollView } from "react-native";
import { Categoria } from "../../../utils/interfaces";
import { data } from "../../../components/home/nav/Categorias";
import { PostarParamsProps, PostarProps } from "./Interface";
import { ContextTypeProvider, Provider } from "../../data/Provider";

export class Postar extends Component<PostarProps, PostarParamsProps> {
    constructor(props: PostarProps) {
        super(props);
        const { publicacaoController } = useContext(Provider) as ContextTypeProvider;

        this.state = {
            desabafo: "",
            mostrarCategoria: true,
            navigation: props.navigation,
            enumCategoria: Categoria.selecionar,
            categoria: "Selecione uma categoria...",
            publicacaoController
        }
    }

    render() {

        const handleCategoria = (tituloCategoria: string, enumCategoria: Categoria) => {
            this.setState({
                categoria: tituloCategoria,
                mostrarCategoria: !this.state.mostrarCategoria,
                enumCategoria: enumCategoria
            });
        }

        return (
            <Container>
                <NavContainer>
                    <ArrowBack onPress={() => this.state.navigation.navigate("Home")}>
                        <Icon name={"arrow-back"} color={"white"} size={30}></Icon>
                    </ArrowBack>
                    <TextTop>Escreva algo</TextTop>
                    <ArrowSend onPress={() => this.state.publicacaoController.enviarPublicacao(this.state.enumCategoria, this.state.desabafo)}>
                        <Icon name={"send"} color={"white"} size={24}></Icon>
                    </ArrowSend>
                </NavContainer>
                <SelectCategoty onPress={() => this.setState({mostrarCategoria: !this.state.mostrarCategoria})}>
                    <Categorias>{this.state.categoria}</Categorias>
                    <Icon name={"chevron-down"} size={20} color={"white"}/>
                </SelectCategoty>
                <ScrollView>
                    <Desabafo
                        placeholder={"Desabafe..."}
                        placeholderTextColor={"gray"}
                        cursorColor={"white"}
                        multiline={true}
                        onChangeText={(text) => this.setState({desabafo: text})}
                    />
                </ScrollView>
                <ModalContainer
                    animationType="slide"
                    transparent={true}
                    visible={this.state.mostrarCategoria}
                    
                >
                    <ModalContent>
                        <TextChoice>{"Selecione uma categoria..."}</TextChoice>
                        <FlatList
                            data={data.slice(1)}
                            renderItem={({item, index}) => 
                                <CategoriaButton onPress={() => handleCategoria(item.titulo, item.categoria)}>
                                    <ButtonContainer>
                                        <RoundImage
                                        source={item.image}
                                        ></RoundImage>
                                        <CategoriaText>{item.titulo}</CategoriaText>
                                    </ButtonContainer>
                                </CategoriaButton>
                            }
                        />
                    </ModalContent>
                </ModalContainer>
            </Container>
        )
    }
}

const width = Dimensions.get('window').width;
const Container = styled.View`
    background-color: #303030;
    width: 100%;
    height: 100%;
    margin-top: ${Constants.statusBarHeight}px;
`

const SelectCategoty = styled.TouchableOpacity`
    width: 100%;
    height: 50px;
    border-bottom-width: 1px;
    border-bottom-color: white;
    flex-direction: row;
    align-items: center;
    padding-horizontal: 14px;
    justify-content: space-between;
`

const Categorias = styled.Text`
    color: white;
    font-weight: 500;
    font-size: 16px;
`

const Desabafo = styled.TextInput`
    width: 100%;
    font-size: 18px;
    padding: 10px;
    color: white;
`

const ModalContainer = styled.Modal`
`

const ModalContent = styled.View`
    position: absolute;
    top: 110px;
    width: 80%;
    height: 80%;
    background-color: gray;
    position: absolute;
    border-radius: 10px;
    left: ${0.1 * width}px;
    padding: 10px;
`

const CategoriaButton = styled.TouchableOpacity`
    height: 50px;
    flex-direction: column;
    justify-content: center;
    padding-horizontal: 6px;
`

const CategoriaText = styled.Text`
    color: white;
    margin-left: 10px;
`

const RoundImage = styled.Image`
    width: 42px;
    height: 42px;
    border-radius: 21px;
    background-color: white;
`

const ButtonContainer = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
`

const TextChoice = styled.Text`
    padding: 10px;
    color: white;
    font-size: 18px;
    font-weight: bold;
`

const NavContainer = styled.View`
    width: width;
    height: 50px;
    background-color: #10a17d;
    flex-direction: row;
    align-items: center;
`

const ArrowBack = styled.TouchableOpacity`
    position: absolute;
    height: 50px;
    width: 50px;
    justify-content: center;
    align-items: center;
    left: 0px;
`

const TextTop = styled.Text`
    color: white;
    font-weight: 500;
    font-size: 18px;
    position: absolute;
    left: 50px;
`

const ArrowSend = styled.TouchableOpacity`
    position: absolute;
    right: 0px;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 50px;
`
