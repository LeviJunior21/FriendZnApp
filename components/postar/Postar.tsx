import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from 'expo-constants';
import { Nav } from "./NavPostar"
import { useContext, useState } from "react"
import { Dimensions, FlatList, ScrollView } from "react-native";
import { data } from "../home/nav/Categorias";
import { Categoria, Navigation } from "../../utils/interfaces";
import { ContextProvider, Provider } from "../../utils/Provider";

export default function Postar(navigation: Navigation) {
    const [categoria, setCategoria] = useState<string>("Selecione uma categoria...");
    const [mostrarCategoria, setMostrarCategoria] = useState<boolean>(true);
    const [desabafo, setDesabafo] = useState<string>("");
    const [enumCategoria, setEnumCatgegotia] = useState<Categoria>(Categoria.selecionar)
    const { meusDados } = useContext<ContextProvider>(Provider);

    const handleCategoria = (tituloCategoria: string, enumCategoria: Categoria) => {
        setCategoria(tituloCategoria);
        setMostrarCategoria(!mostrarCategoria);
        setEnumCatgegotia(enumCategoria);
    }

    return (
        <Container>
            <Nav meusDados={meusDados} navigation={navigation} categoria={enumCategoria} desabafo={desabafo}></Nav>
            <SelectCategoty onPress={() => setMostrarCategoria(!mostrarCategoria)}>
                <Categorias
                >{categoria}
                </Categorias>
                <Icon name={"chevron-down"} size={20} color={"white"}/>
            </SelectCategoty>
            <ScrollView>
                <Desabafo
                    placeholder={"Desabafe..."}
                    placeholderTextColor={"gray"}
                    cursorColor={"white"}
                    multiline={true}
                    onChangeText={(text) => setDesabafo(text)}
                />
            </ScrollView>
            <ModalContainer
                animationType="slide"
                transparent={true}
                visible={mostrarCategoria}
                
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
