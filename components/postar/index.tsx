import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";
import { Nav } from "./nav"
import { useState } from "react"
import { Dimensions, FlatList, ScrollView } from "react-native";
import { data } from "../homeInicial/nav/categories";

export default function Postar() {
    const [categoria, setCategoria] = useState<string>("Selecione uma categoria...");
    const [mostrarCategoria, setMostrarCategoria] = useState<boolean>(true);

    const handleCategoria = (novaCategoria: string) => {
        setCategoria(novaCategoria);
        setMostrarCategoria(!mostrarCategoria);
    }

    return (
        <Container>
            <Nav></Nav>
            <SelectCategoty onPress={() => setMostrarCategoria(!mostrarCategoria)}>
                <Categoria 
                >{categoria}
                </Categoria>
                <Icon name={"chevron-down"} size={20} color={"white"}/>
            </SelectCategoty>
            <ScrollView>
                <Desabafo
                    placeholder={"Desabafe..."}
                    placeholderTextColor={"gray"}
                    cursorColor={"white"}
                    multiline={true}
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
                        data={data}
                        renderItem={({item, index}) => 
                            <CategoriaButton onPress={() => handleCategoria(item.titulo)}>
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

const Categoria = styled.Text`
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
    left: ${0.1 * width};
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
