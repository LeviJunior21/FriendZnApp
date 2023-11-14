import styled from "styled-components/native";
import { FlatList } from "react-native";
import { getCurrentDate } from "../../utils/time";
import { PropsVisualizarComentario } from "../../utils/interfaces";
import { Comentario } from "../../model/Comentario";
import { useEffect } from "react";

export default function ComentariosContainer(props: PropsVisualizarComentario) {
    
    useEffect(() => {
        const onMessageCallback = (novoComentario: Comentario) => {
            props.setComentarios((prevComentarios) => [...prevComentarios, novoComentario]);
        };

        props.webSocket.onMessage(onMessageCallback);

        return () => {
            props.webSocket.onMessage(onMessageCallback);
        };
    }, [props.webSocket]);

    return (
        <Container>
            {props.loading?
            <ModalContent>
                <Atividade/>
                <MessageLoading>Carregando comentários...</MessageLoading>
            </ModalContent>:
            <FlatList
                data = {props.comentarios}
                renderItem={({item, index}) => 
                    <ComentarioI>
                        <ContainerUsuario>
                            <NomeUsuario>@{item.getUsuario().getApelido()}</NomeUsuario>
                            <TempoPublicacao>{getCurrentDate(new Date())}</TempoPublicacao>  
                            <ComentarioRealizado>{item.getComentario()}</ComentarioRealizado>
                        </ContainerUsuario>
                    </ComentarioI>
                }
            />
            }
        </Container>
    )
}

const Container = styled.SafeAreaView`
    flex: 1;
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
    font-size: 18px;
    color: white;
    font-weight: 500;
`

const TempoPublicacao = styled.Text`
    font-size: 11px;
    color: white;
`
const ContainerUsuario = styled.View`
    width: 70%;
    height: 60px;
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
    min-height: 100px;
    width: 100%;
    padding-vertical: 10px;
    color: white;
`
