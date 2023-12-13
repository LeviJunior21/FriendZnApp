import styled from "styled-components/native";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/Ionicons";
import ComentariosContainer from "./comentariochat/ComentarioContainer";
import { useContext, useEffect, useState } from "react";
import { ComentarioProps } from "../../utils/interfaces";
import { getCurrentDate } from "../../utils/time";
import { Comentario } from "../../model/Comentario";
import { NavComentarios } from "./navcomentario.tsx/NavComentarios";
import { getComentarios } from "../../utils/getComentarios";
import { sendComentario, updateComentario } from "./wscomentarios/WSComentario";
import { avatarMasculino } from "../../data/avatar";
import { ContextProvider, Provider } from "../../utils/Provider";

const TodosComentarios: React.FC<ComentarioProps> = ({ navigation, route }) => {
    const { publicacao } = route.params;
    const [message, setMessage] = useState<string>('');
    const [comentarios, setComentarios] = useState<Comentario[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { comentou, setComentou, meusDados, webSock } = useContext<ContextProvider>(Provider);

    useEffect(() => {
        getComentarios({ publicacao, setComentarios, setLoading });
        if (webSock.current?.connected) {
            webSock.current?.subscribe("/topic/public/" + publicacao.getId(), function (message) {
                updateComentario({ message, setComentarios });
           });
        }
    }, []);

    const enviar = () => {
        if (meusDados.id !== -1 && meusDados.codigoAcesso !== -1) {
           if (message.length > 0) {
                sendComentario({webSock, meusDados, publicacao, message, setMessage});
                setComentou(!comentou);
            }
        } else {
            navigation.navigate("Login");
        }
    };

    const abrirChat = () => {
        if (meusDados.id !== -1 && meusDados.codigoAcesso != -1) {
            if(meusDados.id !== publicacao.getUsuario().getId()) {
                navigation.navigate("ChatPrivado", { idRemetente: publicacao.getUsuario().getId(), nome: publicacao.getUsuario().getApelido() });
            }
        } else {
            navigation.navigate("Login");
        }
    }
    
    return (
        <Container>
            <NavComentarios navigation={navigation}/>
            <ScrollViewContainer>
                <ContainerPublicacao>
                    <ContainerUsuario>
                        <Avatar source={avatarMasculino}/>
                        <InfoUserContainer>
                            <TouchUserName onPress={() => abrirChat()}>
                                <NomeUsuario>@{publicacao.getUsuario().getApelido()}</NomeUsuario>
                            </TouchUserName>
                            <TempoPublicacao>{getCurrentDate(publicacao.getDate())}</TempoPublicacao>
                        </InfoUserContainer>
                    </ContainerUsuario>
                    <Publicacao>{publicacao.getPublicacao()}</Publicacao>
                </ContainerPublicacao>
                <ComentarioContainer>
                    <ComentariosContainer 
                    remetentePublicacao={publicacao.getUsuario().getId()}
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
    padding-horizontal: 4px;
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
