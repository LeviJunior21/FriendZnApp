import Login from "../../login/Login";
import Postar from "../../postar/Postar";
import TodosComentarios from "../../comentario/TodosComentarios";
import ChatPrivado from "../../chat/chatprivado/ChatPrivado";
import Cadastro from "../../usuario/cadastro/Cadastro";
import Configuracoes from "../../configuracoes/Configuracoes";
import NavigationDrawer from "./NavigationDrawer";
import Perfil from "../../perfil/Perfil";
import EditarPerfil from "../../editarperfil/EditarPerfil";
import Avatar from "../../avatar/Avatar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../utils/interfaces";

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function NavigationStack() {

    return (
        <Stack.Navigator initialRouteName={"Home"} screenOptions={{headerShown: false}}>
            <Stack.Screen name={"Login"} component={Login}/>
            <Stack.Screen name={"Postar"} component={Postar}/>
            <Stack.Screen name={"Comentario"} component={TodosComentarios}/>
            <Stack.Screen name={"Home"} component={NavigationDrawer}/>
            <Stack.Screen name={"ChatPrivado"} component={ChatPrivado}/>
            <Stack.Screen name={"Cadastro"} component={Cadastro}/>
            <Stack.Screen name={"Configuracoes"} component={Configuracoes}/>
            <Stack.Screen name={"Perfil"} component={Perfil}/>
            <Stack.Screen name={"EditarPerfil"} component={EditarPerfil}/>
            <Stack.Screen name={"Avatar"} component={Avatar}/>
        </Stack.Navigator>
    )
}
