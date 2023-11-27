import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Component } from "react";
import { RootStackParamList } from "./Interface";
import { NavigationContainer } from "@react-navigation/native";
import { Login } from "../login/Login";
import { Postar } from "../postar/Postar";
import { Bottoms } from "./NavigationBottoms";
import { ChatScreen } from "../chat/ChatScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();
export class NavigationStack extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName={"Login"} screenOptions={{headerShown: false}}>
                    <Stack.Screen name={"Login"} component={Login}/>
                    <Stack.Screen name={"Postar"} component={Postar}/>
                    <Stack.Screen name={"Comentario"} component={Comentario}/>
                    <Stack.Screen name={"Home"} component={Bottoms}/>
                    <Stack.Screen name={"ChatScreen"} component={ChatScreen}/>
                </Stack.Navigator>
           </NavigationContainer>
        )
    }
}
