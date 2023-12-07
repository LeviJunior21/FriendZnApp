import styled from "styled-components/native";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CadastroProps } from "./Interface";
import { useEffect, useState } from "react";
import { keyUser } from "../../../data/constants";
import { cadastrarUsuario } from "../utils/CadastrarUsuario";

const Cadastro:React.FC<CadastroProps> = ({ navigation, route }) => {
    const [imageLogin, setImageLogin] = useState<string>("https://i.redd.it/rdv8uzobsmv71.png");
    const [apelido, setApelido] = useState<string>("");
    const { dados } = route.params;

    useEffect(() => {
        const carregarDados = async() => {
            console.log(dados)
        }; carregarDados();
    }, []);

    const cadastrar = async() => {
        
        const dadosLogin = {apelido: apelido, dadosLogin: dados};
        const response = await cadastrarUsuario(dadosLogin);
        
        const myID = Number(response.id);
        const responseOk: boolean = myID > 0;
        console.log("idAuth: " + dados.id)
        console.log("idServer: " + myID)

        if (responseOk) {
            const myInfo = {idAuth: Number(dados.id), idServer: myID};
            const myInfoString = JSON.stringify(myInfo);
            try {
                await AsyncStorage.setItem(keyUser, myInfoString);
                console.log("salvo")
            }
            catch(e: any) {}
            navigation.navigate("Home");
        } else {
            navigation.navigate("Login");
        }
    };
    

    return (
        <Container>
            <NavCadastroContainer>
                <ButtonBack onPress={() => navigation.navigate("Login")}>
                    <Icon name={"arrow-back"} size={30} color={"white"}></Icon>
                </ButtonBack>
                <TextNavCadastro>Cadastrar Usuário</TextNavCadastro>
            </NavCadastroContainer>
            <AvatarContainer>
                <Avatar source={{uri: imageLogin}}></Avatar>
                <EscolhaAvatarContainer>
                    <SelecionarImagemText>Selecione a imagem</SelecionarImagemText>
                    <EscolhaContainer>
                        <BotaoEscolhaAvatar onPress={() => setImageLogin("https://i.redd.it/rdv8uzobsmv71.png")}>
                            <CadastrarText>Padrão</CadastrarText>
                        </BotaoEscolhaAvatar>
                        <BotaoEscolhaAvatar onPress={() => setImageLogin(dados.avatar_url)}>
                            <CadastrarText>GitHub</CadastrarText>
                        </BotaoEscolhaAvatar>
                    </EscolhaContainer>
                </EscolhaAvatarContainer>
            </AvatarContainer>
            <InformacoesContainer>
                <ApelidoText>Insira um apelido:</ApelidoText>
                <ApelidoInput 
                onChangeText={(text: string) => setApelido(text)}
                placeholder={"Digite o seu apelido..."}
                style={{borderColor: (apelido == "")? "red":"green"}}
                numberOfLines={1} 
                maxLength={14}
                />
            </InformacoesContainer>
            <CadastrarContainer>
                <BotaoCadastro onPress={() => cadastrar()}>
                    <CadastrarText>Cadastrar</CadastrarText>
                </BotaoCadastro>
            </CadastrarContainer>
        </Container>
    )
}

export default Cadastro;

const NavCadastroContainer = styled.View`
    width: 100%;
    height: 50px;
    background-color: #10a17d;
    margin-top: ${Constants.statusBarHeight}px;
    flex-direction: row;
    align-items: center;
`

const Container = styled.View`
    flex: 1;
    background-color: #303030;
    flex-direction: column;
    align-items: center;
`

const Avatar = styled.Image`
    width: 200px;
    height: 200px;
    border-radius: 100px;
    border-width: 2px;
    border-color: white;
    background-color: red;
`

const AvatarContainer = styled.View`
    width: 100%;
    height: 360px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    justify-content: space-evenly;
    margin-top: 20px;
`

const EscolhaAvatarContainer = styled.View`
    margin-top: 40px;
    width: 300px;
    height: 140px;
    gap: 10px;
`

const EscolhaContainer = styled.View`
    width: 100%;
    height: 60px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
`

const BotaoEscolhaAvatar = styled.TouchableOpacity`
    width: 150px;
    height: 50px;
    border-radius: 10px;
    background-color: white;
    justify-content: center;
    align-items: center;
`

const InformacoesContainer = styled.View`
    width: 320px;
    height: 100px;
    padding: 10px;
    justify-content: center;
    align-items: center;
`

const CadastrarContainer = styled.View`
    width: 100%;
    height: 140px;
    justify-content: center;
    align-items: center;
`

const BotaoCadastro = styled.TouchableOpacity`
    width: 200px;
    height: 50px;
    border-radius: 10px;
    background-color: white;
    justify-content: center;
    align-items: center;
`

const CadastrarText = styled.Text`
    font-size: 18px;
    font-weight: 500;
    color: black;
`

const ApelidoInput = styled.TextInput`
    width: 300px;
    height: 50px;
    background-color: white;
    padding: 10px;
    border-radius: 4px;
    border-width: 2px;
    color: black;
    font-weight: bold;
    font-size: 18px;
`

const ApelidoText = styled.Text`
    color: white;
    align-self: flex-start;
`

const SelecionarImagemText = styled.Text`
    color: white;
    bottom: 0px;
`

const ButtonBack = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    justify-content: center;
    align-items: center;
`

const TextNavCadastro = styled.Text`
    color: white;
    font-size: 18px;
    font-weight: 500;
`
