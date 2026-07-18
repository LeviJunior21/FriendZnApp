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
import { ContextProvider, Provider } from "../../utils/Provider";
import AvatarImage from "../avatar/AvatarImage";
import EmojiBadge from "../emoji/EmojiBadge";

const TodosComentarios: React.FC<ComentarioProps> = ({ navigation, route }) => {
    const { publicacao } = route.params;
    const [message, setMessage] = useState<string>('');
    const [comentarios, setComentarios] = useState<Comentario[]>([]);
    const [respostaComentario, setRespostaComentario] = useState<Comentario | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { comentou, setComentou, meusDados, webSock, colors } = useContext<ContextProvider>(Provider);

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
                sendComentario({webSock, meusDados, publicacao, message, setMessage, respostaComentarioId: respostaComentario?.getId()});
                setRespostaComentario(null);
                setComentou(!comentou);
            }
        } else {
            navigation.navigate("Login");
        }
    };

    const abrirChat = () => {
        if (meusDados.id !== -1 && meusDados.codigoAcesso != -1) {
                navigation.navigate("Perfil", { id: publicacao.getUsuario().getId(), apelido: publicacao.getUsuario().getApelido(), navigation: navigation });
        } else {
            navigation.navigate("Login");
        }
    }
    
    return (
        <Container style={{backgroundColor: colors.background}}>
            <NavComentarios navigation={navigation}/>
            <ScrollViewContainer>
                <ContainerPublicacao style={{backgroundColor: colors.elevated}}>
                    <ContainerUsuario>
                        <AvatarImage userId={publicacao.getUsuario().getId()} size={50}/>
                        <InfoUserContainer>
                            <TouchUserName onPress={() => abrirChat()}>
                                <NameRow><NomeUsuario>@{publicacao.getUsuario().getApelido()}</NomeUsuario><EmojiBadge emoji={publicacao.getUsuario().getEmoji()} size={18}/></NameRow>
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
                    onResponderComentario={setRespostaComentario}
                    />
                </ComentarioContainer>
            </ScrollViewContainer>
            <EscreverComentario style={{backgroundColor: colors.background}}>
                {respostaComentario?
                    <ReplyBanner>
                        <ReplyText>Respondendo @{respostaComentario.getUsuario().getApelido()}</ReplyText>
                        <ReplyClose onPress={() => setRespostaComentario(null)}>
                            <Icon name={"close"} color={"white"} size={18}/>
                        </ReplyClose>
                    </ReplyBanner>:<></>
                }
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
    background-color: #36474f;
    padding-horizontal: 10px;
    padding-vertical: 20px;
`

const NomeUsuario = styled.Text`
    font-size: 16px;
    color: #26a69a;
    font-weight: 500;
`

const NameRow = styled.View`
    flex-direction: row;
    align-items: center;
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
    flex-wrap: wrap;
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

const ReplyBanner = styled.View`
    width: 100%;
    min-height: 28px;
    background-color: #10a17d;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-horizontal: 10px;
`

const ReplyText = styled.Text`
    color: white;
    font-size: 12px;
    font-weight: 700;
`

const ReplyClose = styled.TouchableOpacity`
    width: 28px;
    height: 28px;
    align-items: center;
    justify-content: center;
`
