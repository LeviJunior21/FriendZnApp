import { Dispatch, SetStateAction, useCallback, useContext, useState } from "react"
import { Dimensions, Modal } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import styled from "styled-components/native"
import { ContextProvider, Provider } from "../../utils/Provider"
import { alterarEmoji, emojis } from "./Service"

interface ModalDrawerProps {
    aberto: boolean, 
    setAberto: Dispatch<SetStateAction<boolean>>
}

export const ModalDrawer = (props: ModalDrawerProps) => {
    const { meusDados, setMeusDados } = useContext<ContextProvider>(Provider);
    const [indexSelecionado, setIndexSelecionado] = useState({indexArray: -1, indexEmoji: -1});

    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={props.aberto}
        >
            <Container>
                <Emojis>
                    <TextEmojiPrincipal>Como você está se sentindo?</TextEmojiPrincipal>
                    <EmojiScroll>
                        <EmoteContainer>
                            <FlatList
                            data={emojis}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={(props1) =>
                                <>
                                <EmoteTextContainer>
                                    <EmoteText>{props1.item.titulo}</EmoteText>
                                </EmoteTextContainer>
                                <FlatList
                                data={props1.item.emojis}
                                numColumns={7}
                                renderItem={({item, index}) => 
                                    <EmojiButton 
                                    style={{borderColor: (props1.index === indexSelecionado.indexArray && index === indexSelecionado.indexEmoji)? "white": "#303030"}}
                                    onPress={() => setIndexSelecionado({indexArray: props1.index, indexEmoji: index})}
                                    >
                                        <EmojiText>{item.emoji}</EmojiText>
                                    </EmojiButton>
                                }
                                />
                                </>
                            }
                            />
                        </EmoteContainer>
                    </EmojiScroll>
                </Emojis>
                <ModalOptions>
                    <Buttons>
                        <ButtonChoice onPress={() => alterarEmoji(-1, -1, props.setAberto, meusDados, setMeusDados)}>
                            <TextButtonChoice>Remover</TextButtonChoice>
                        </ButtonChoice>
                    </Buttons>
                    <Buttons>
                        <ButtonChoice onPress={() => props.setAberto(false)}>
                            <TextButtonChoice>Cancelar</TextButtonChoice>
                        </ButtonChoice>
                        <ButtonChoice onPress={() => alterarEmoji(indexSelecionado.indexArray, indexSelecionado.indexEmoji, props.setAberto, meusDados, setMeusDados)}>
                            <TextButtonChoice>Ok</TextButtonChoice>
                        </ButtonChoice>
                    </Buttons>
                </ModalOptions>
            </Container>
        </Modal>
    )
}

const width = Dimensions.get("window").width;
const Container = styled.View`
    width: ${0.8 * width}px;
    height: 340px;
    background-color: #303030;
    margin-top: ${0.5  * width + 50}px;
    margin-left: ${0.1 * width}px;
    flex-direction: column;
    
`

const ModalOptions = styled.View`
    width: 100%;
    height: 40px;
    align-self: flex-end;
    position: absolute;
    bottom: 0px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-horizontal: 10px;
`

const Buttons = styled.View`
    height: 100%;
    min-width: 0px;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
`

const ButtonChoice = styled.TouchableOpacity`
    min-width: 30px;
    height: 100%;
    justify-content: center;
    align-items: center;
    padding: 10px;
`

const TextButtonChoice = styled.Text`
    color: white;
    color: #10a17d;
`

const Emojis = styled.View`
    width: 100%;
    height: 300px;
    padding-horizontal: 20px;
    padding-vertical: 10px;
`

const EmojiScroll = styled.ScrollView`
    width: 100%;
    height: 100%;
`

const TextEmojiPrincipal = styled.Text`
    color: white;
`

const EmoteTextContainer = styled.View`
    height: 50px;
    flex-direction: column;
    justify-content: center;
`

const EmoteText = styled.Text`
    color: white;
    font-weight: 14px;
    font-weight: bold;
`

const EmojiButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    border-width: 2px;
    justify-content: center;
    align-items: center;
`

const EmojiText = styled.Text`
    font-size: 20px;
`

const EmoteContainer = styled.View`
    width: 100%;
    min-height: 20px;
`