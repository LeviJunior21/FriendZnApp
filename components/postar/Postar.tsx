import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from 'expo-constants';
import { Nav } from "./NavPostar"
import { useContext, useState } from "react"
import { Dimensions, FlatList, ScrollView } from "react-native";
import { data } from "../home/nav/Categorias";
import { Categoria, Navigation, PublicacaoTipo } from "../../utils/interfaces";
import { ContextProvider, Provider } from "../../utils/Provider";

export default function Postar(navigation: Navigation) {
    const [ categoria, setCategoria ] = useState<string>("Selecione uma categoria...");
    const [ mostrarCategoria, setMostrarCategoria ] = useState<boolean>(true);
    const [ desabafo, setDesabafo ] = useState<string>("");
    const [ tipo, setTipo ] = useState<PublicacaoTipo>(PublicacaoTipo.desabafo);
    const [ enqueteOpcoes, setEnqueteOpcoes ] = useState<string[]>(["", ""]);
    const [ enumCategoria, setEnumCatgegotia ] = useState<Categoria>(Categoria.selecionar)
    const { meusDados, colors } = useContext<ContextProvider>(Provider);

    const handleCategoria = (tituloCategoria: string, enumCategoria: Categoria) => {
        setCategoria(tituloCategoria);
        setMostrarCategoria(!mostrarCategoria);
        setEnumCatgegotia(enumCategoria);
    }

    return (
        <Container style={{backgroundColor: colors.background}}>
            <Nav meusDados={meusDados} navigation={navigation} categoria={enumCategoria} desabafo={desabafo} tipo={tipo} enqueteOpcoes={enqueteOpcoes}></Nav>
            <SelectCategoty onPress={() => setMostrarCategoria(!mostrarCategoria)}>
                <Categorias
                >{categoria}
                </Categorias>
                <Icon name={"chevron-down"} size={20} color={"white"}/>
            </SelectCategoty>
            <TipoContainer>
                <TipoButton style={{backgroundColor: tipo === PublicacaoTipo.desabafo ? colors.primary : colors.surface}} onPress={() => setTipo(PublicacaoTipo.desabafo)}>
                    <TipoText>Desabafo</TipoText>
                </TipoButton>
                <TipoButton style={{backgroundColor: tipo === PublicacaoTipo.enquete ? colors.primary : colors.surface}} onPress={() => setTipo(PublicacaoTipo.enquete)}>
                    <TipoText>Enquete</TipoText>
                </TipoButton>
            </TipoContainer>
            <ScrollView>
                <Desabafo
                    placeholder={"Desabafe..."}
                    placeholderTextColor={"gray"}
                    cursorColor={"white"}
                    multiline={true}
                    onChangeText={(text) => setDesabafo(text)}
                />
                {tipo === PublicacaoTipo.enquete?
                    <EnqueteContainer>
                        <EnqueteTitle>Opções da enquete</EnqueteTitle>
                        {enqueteOpcoes.map((opcao, index) => (
                            <OpcaoInput
                                key={index}
                                placeholder={`Opção ${index + 1}`}
                                placeholderTextColor={"gray"}
                                cursorColor={"white"}
                                value={opcao}
                                onChangeText={(text) => setEnqueteOpcoes((current) => current.map((item, itemIndex) => itemIndex === index ? text : item))}
                            />
                        ))}
                        {enqueteOpcoes.length < 5?
                            <AdicionarOpcao onPress={() => setEnqueteOpcoes((current) => [...current, ""])}>
                                <Icon name={"add"} color={"white"} size={18}/>
                                <AdicionarOpcaoText>Adicionar opção</AdicionarOpcaoText>
                            </AdicionarOpcao>:<></>}
                    </EnqueteContainer>:<></>
                }
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

const TipoContainer = styled.View`
    width: 100%;
    height: 54px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border-bottom-width: 1px;
    border-bottom-color: white;
`

const TipoButton = styled.TouchableOpacity`
    height: 36px;
    min-width: 120px;
    border-radius: 6px;
    align-items: center;
    justify-content: center;
`

const TipoText = styled.Text`
    color: white;
    font-weight: 600;
`

const EnqueteContainer = styled.View`
    padding-horizontal: 10px;
    padding-bottom: 20px;
    gap: 8px;
`

const EnqueteTitle = styled.Text`
    color: white;
    font-weight: bold;
    font-size: 16px;
`

const OpcaoInput = styled.TextInput`
    width: 100%;
    min-height: 42px;
    border-width: 1px;
    border-color: gray;
    border-radius: 6px;
    color: white;
    padding-horizontal: 10px;
`

const AdicionarOpcao = styled.TouchableOpacity`
    height: 40px;
    flex-direction: row;
    align-items: center;
    gap: 6px;
`

const AdicionarOpcaoText = styled.Text`
    color: white;
    font-weight: 600;
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
