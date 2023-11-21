import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/homeInicial";
import Postar from "./components/postar";
import { RootStackParamList } from "./utils/interfaces";
import Login from "./components/login";
import TodosComentarios from "./components/comentario";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import Chats from "./components/chat";
import ChatScreen from "./components/chat/chatScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"Login"} screenOptions={{headerShown: false}}>
                <Stack.Screen name={"Login"} component={Login}/>
                <Stack.Screen name={"Postar"} component={Postar}/>
                <Stack.Screen name={"Comentario"} component={TodosComentarios}/>
                <Stack.Screen name={"Home"} component={Bottoms}/>
                <Stack.Screen name={"ChatScreen"} component={ChatScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const Tab = createBottomTabNavigator();
function Bottoms() {
    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="TabHome" component={HomeScreen} 
            options={{ tabBarLabel: "Home", tabBarIcon: ({color, size}) => (<Icon name="home-outline" size={size} color={color}/>)}}/>
            <Tab.Screen name="Chat" component={Chats}
            options={{ tabBarLabel: "Chat", tabBarIcon: ({color, size}) => (<Icon name="chatbox-ellipses-outline" size={size} color={color}/>)}}/>
        </Tab.Navigator>
    )
}
