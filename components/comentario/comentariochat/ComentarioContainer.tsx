import styled from "styled-components/native";
import { FlatList } from "react-native";
import { getCurrentDate } from "../../../utils/time";
import { VisualizarComentarioProps } from "./Interface";

export default function ComentariosContainer(props: VisualizarComentarioProps) {
    return (
        <Container>{props.loading?
            <ModalContent>
                <Atividade/>
                <MessageLoading>Carregando comentários...</MessageLoading>
            </ModalContent>:
            <FlatList
                data={props.comentarios}
                renderItem={({ item }) => 
                    <ComentarioI>
                        <ContainerUsuario>
                            <TouchUserName onPress={() => props.navigation.navigate("ChatPrivado", { idRemetente: item.getUsuario().getId(), nome: item.getUsuario().getApelido() })}>
                                <NomeUsuario>@{item.getUsuario().getApelido()}</NomeUsuario>
                            </TouchUserName>
                            <TempoPublicacao>{getCurrentDate(new Date())}</TempoPublicacao>
                            <ComentarioRealizado>{item.getComentario()}</ComentarioRealizado>
                        </ContainerUsuario>
                    </ComentarioI>
                }
            />}
            <SpaceBottom/>
        </Container>
    )
}

const Container = styled.SafeAreaView`
    flex: 1;
`

const SpaceBottom = styled.View`
    height: 50px;
`

const Atividade = styled.ActivityIndicator``

const MessageLoading = styled.Text`
    color: white;
`

const ModalContent = styled.View`
    width: 100%;
    height: 80px;
    border-bottom-width: 1px;
    border-bottom-color: white;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20px;
`

const NomeUsuario = styled.Text`
    font-size: 16px;
    color: white;
    font-weight: 500;
`

const TempoPublicacao = styled.Text`
    font-size: 11px;
    color: white;
`
const ContainerUsuario = styled.View`
    width: 100%;
    min-height: 60px;
    flex-direction: column;
`

const ComentarioI = styled.TouchableOpacity`
    width: 100%;
    min-height: 110px;
    padding-vertical: 10px;
    padding-horizontal: 11px;
    background-color: #303030;
    border-bottom-width: 1px;
    border-bottom-color: white;
`

const ComentarioRealizado = styled.Text`
    margin-top: 4px;
    min-height: 10px;
    width: 100%;
    padding-vertical: 10px;
    color: white;
`

const TouchUserName = styled.TouchableOpacity`

`