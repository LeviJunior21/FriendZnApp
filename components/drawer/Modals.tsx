import { Dispatch, SetStateAction, useState } from "react"
import { Dimensions, Modal } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import styled from "styled-components/native"

interface ModalDrawerProps {
    aberto: boolean, 
    setAberto: Dispatch<SetStateAction<boolean>>
}
export const ModalDrawer = (props: ModalDrawerProps) => {
    const [indexSelecionado, setIndexSelecionado] = useState<number>(-1);

    const alterarEmoji = async(emoji: number) => {
        props.setAberto(false);
    }

    const removerEmoji = async() => {
        props.setAberto(false);
    }

    const bandeiras = [{emoji: "🇧🇷"}, {emoji: "🇨🇦"}, {emoji: "🇺🇸"}, {emoji: "🇦🇷"}, {emoji: "🇺🇾"},  {emoji: "🇲🇽"}, {emoji: "🇻🇪"}, {emoji: "🇯🇲"}]

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
                        <EmoteTextContainer>
                            <EmoteText>Bandeiras</EmoteText>
                        </EmoteTextContainer>
                        <EmoteContainer>
                            <FlatList
                            data={bandeiras}
                            numColumns={7}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item, index}) => 
                                <EmojiButton 
                                style={{borderColor: (index === indexSelecionado)? "white": "#303030"}}
                                onPress={() => setIndexSelecionado(index)}
                                >
                                    <EmojiText>{item.emoji}</EmojiText>
                                </EmojiButton>
                            }
                            />
                        </EmoteContainer>
                    </EmojiScroll>
                </Emojis>
                <ModalOptions>
                    <Buttons>
                        <ButtonChoice onPress={() => removerEmoji()}>
                            <TextButtonChoice>Remover</TextButtonChoice>
                        </ButtonChoice>
                    </Buttons>
                    <Buttons>
                        <ButtonChoice onPress={() => props.setAberto(false)}>
                            <TextButtonChoice>Cancelar</TextButtonChoice>
                        </ButtonChoice>
                        <ButtonChoice onPress={() => alterarEmoji(indexSelecionado)}>
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