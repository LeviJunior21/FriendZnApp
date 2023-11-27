import Home from "../home/Home";
import Icon from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Component } from "react";
import { ChatApp } from "../chat/Chat";

const Tab = createBottomTabNavigator();
export class Bottoms extends Component {
    render() {
        return (
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name="TabHome" component={Home}
                options={{ tabBarLabel: "Home", tabBarIcon: ({color, size}) => (<Icon name="home-outline" size={size} color={color}/>)}}/>
                <Tab.Screen name="Chat" component={ChatApp}
                options={{ tabBarLabel: "Chat", tabBarIcon: ({color, size}) => (<Icon name="chatbox-ellipses-outline" size={size} color={color}/>)}}/>
            </Tab.Navigator>
        )
    }
}
