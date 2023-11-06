import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/homeInicial";
import Postar from "./components/postar";
import { RootStackParamList } from "./utils/interfaces";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"Home"} screenOptions={{headerShown: false}}>
                <Stack.Screen name={"Home"} component={HomeScreen}/>
                <Stack.Screen name={"Postar"} component={Postar}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
