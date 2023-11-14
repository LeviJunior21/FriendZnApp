import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/homeInicial";
import Postar from "./components/postar";
import { RootStackParamList } from "./utils/interfaces";
import Login from "./components/login";
import TodosComentarios from "./components/comentario";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"Login"} screenOptions={{headerShown: false}}>
                <Stack.Screen name={"Login"} component={Login}/>
                <Stack.Screen name={"Home"} component={HomeScreen}/>
                <Stack.Screen name={"Postar"} component={Postar}/>
                <Stack.Screen name={"Comentario"} component={TodosComentarios}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
