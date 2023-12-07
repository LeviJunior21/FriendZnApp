import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../utils/interfaces";
import Login from "../../login/Login";
import Postar from "../../postar/Postar";
import TodosComentarios from "../../comentario/TodosComentarios";
import NavigationBottoms from "./NaviagationBottoms";
import ChatPrivado from "../../chat/chatprivado/ChatPrivado";
import Cadastro from "../../usuario/cadastro/Cadastro";
import { useContext, useEffect } from "react";
import { ContextProvider, Provider } from "../../../utils/Provider";

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function NavigationStack() {
    const { meusDados } = useContext<ContextProvider>(Provider);

    const logado = () => { return (meusDados.idAuth != -1); }
    useEffect(()=> {}, [meusDados]);

    return (
        <Stack.Navigator initialRouteName={logado()? "Home" : "Login"} screenOptions={{headerShown: false}}>
            <Stack.Screen name={"Login"} component={Login}/>
            <Stack.Screen name={"Postar"} component={Postar}/>
            <Stack.Screen name={"Comentario"} component={TodosComentarios}/>
            <Stack.Screen name={"Home"} component={NavigationBottoms}/>
            <Stack.Screen name={"ChatPrivado"} component={ChatPrivado}/>
            <Stack.Screen name={"Cadastro"} component={Cadastro}/>
        </Stack.Navigator>
    )
}
