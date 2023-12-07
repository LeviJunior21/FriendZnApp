import styled from "styled-components/native";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/Ionicons";
import ComentariosContainer from "./comentariochat/ComentarioContainer";
import SockJS from "sockjs-client";
import Stomp, { Client } from "stompjs";
import { useContext, useEffect, useRef, useState } from "react";
import { ComentarioProps } from "../../utils/interfaces";
import { getCurrentDate } from "../../utils/time";
import { Comentario } from "../../model/Comentario";
import { NavComentarios } from "./navcomentario.tsx/NavComentarios";
import { getComentarios } from "../../utils/getComentarios";
import { sendComentario, updateComentario } from "./wscomentarios/WSComentario";
import { avatar } from "../../data/avatar";
import { ContextProvider, Provider } from "../../utils/Provider";

const TodosComentarios: React.FC<ComentarioProps> = ({ navigation, route }) => {
    const { publicacao } = route.params;
    const [message, setMessage] = useState<string>('');
    const [comentarios, setComentarios] = useState<Comentario[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const webSock = useRef<Client>(Stomp.over(new SockJS("http://10.0.0.181:8080/ws")));
    const { comentou, setComentou, meusDados } = useContext<ContextProvider>(Provider);

    useEffect(() => {
        getComentarios({ publicacao, setComentarios, setLoading });
        webSock.current.connect({}, () => {
            webSock.current?.subscribe("/topic/public/" + publicacao.getId(), function (message) {
                updateComentario({ message, setComentarios });
            });
        });
        return () => { if (webSock.current) { webSock.current.disconnect(() => {}); }};
    }, []);

    const enviar = () => {
        if (message.length > 0) { 
            sendComentario({webSock, meusDados, publicacao, message, setMessage});
            setComentou(!comentou);
        }
    };
    
    return (
        <Container>
            <NavComentarios navigation={navigation}/>
            <ScrollViewContainer>
                <ContainerPublicacao>
                    <ContainerUsuario>
                        <Avatar source={avatar}/>
                        <InfoUserContainer>
                            <TouchUserName onPress={() => navigation.navigate("ChatPrivado", { idRemetente: publicacao.getUsuario().getId(), nome: publicacao.getUsuario().getApelido() })}>
                                <NomeUsuario>@{publicacao.getUsuario().getApelido()}</NomeUsuario>
                            </TouchUserName>
                            <TempoPublicacao>{getCurrentDate(publicacao.getDate())}</TempoPublicacao>
                        </InfoUserContainer>
                    </ContainerUsuario>
                    <Publicacao>{publicacao.getPublicacao()}</Publicacao>
                </ContainerPublicacao>
                <ComentarioContainer>
                    <ComentariosContainer 
                    loading={loading}
                    id={publicacao.getId()} 
                    comentarios={comentarios}
                    setComentarios={setComentarios}
                    navigation={navigation}
                    />
                </ComentarioContainer>
            </ScrollViewContainer>
            <EscreverComentario>
                <Input 
                placeholder="Escreva uma mensagem..." 
                placeholderTextColor={"white"} 
                onChangeText={(text) => setMessage(text)}
                value={message}
                cursorColor={"white"} 
                multiline={true}></Input>
                <BotaoEnviar onPress={() => enviar()}>
                    <Icon name={"send"} color={"green"} size={24}/>
                </BotaoEnviar>
            </EscreverComentario>
        </Container>
    )
}

export default TodosComentarios;

const Container = styled.SafeAreaView`
    flex: 1;
    margin-top: ${Constants.statusBarHeight}px;
    background-color: #303030;
`

const ContainerPublicacao = styled.View`
    min-height: 140px;
    width: 100%;
    background-color: #136075;
    padding-horizontal: 10px;
    padding-vertical: 20px;
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
    width: 70%;
    height: 60px;
    flex-direction: row;
    align-items: center;
`

const Publicacao = styled.Text`
    margin-top: 10px;
    width: 100%;
    min-height: 10px;
    color: white;
`

const ComentarioContainer = styled.View`
    flex: 1;
    background-color: #303030;
`
const EscreverComentario = styled.View`
    position: absolute;
    z-index: 2;
    background-color: #303030;
    width: 100%;
    min-height: 50px;
    max-height: 130px;
    bottom: 0px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-top-width: 1px;
    border-top-color: white;
`

const Input = styled.TextInput`
    width: 90%;
    min-height: 46px;
    max-height: 126px;
    color: white;
    font-size: 16px;
    padding-horizontal: 2px;
    padding-vertical: 6px;
`

const BotaoEnviar = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    height: 46px;
    width: 10%;
`

const ScrollViewContainer = styled.ScrollView`
    flex: 1;
`

const TouchUserName = styled.TouchableOpacity`
`

const InfoUserContainer = styled.View`
    margin-left: 4px;
    height: 100%;
    flex: 1;
    flex-direction: column;
    justify-content: center;
`

const Avatar = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
`
