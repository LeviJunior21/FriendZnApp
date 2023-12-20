import HomeScreen from "../HomeScreen";
import ListaDeChats from "../../chat/ListaDeChats";
import Icon from "react-native-vector-icons/Ionicons";
import Seguindo from "../../seguindo/Seguindo";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
export default function NavigationBottoms() {
    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="TabHome" component={HomeScreen} 
            options={{ tabBarLabel: "Home", tabBarIcon: ({color, size}) => (<Icon name="home-outline" size={size} color={color}/>)}}/>
            <Tab.Screen name="Seguindo" component={Seguindo} 
            options={{ tabBarLabel: "Seguindo", tabBarIcon: ({color, size}) => (<Icon name="eye" size={size} color={color}/>)}}/>
            <Tab.Screen name="Chat" component={ListaDeChats}
            options={{ tabBarLabel: "Chat", tabBarIcon: ({color, size}) => (<Icon name="chatbox-ellipses-outline" size={size} color={color}/>)}}/>
        </Tab.Navigator>
    )
}
