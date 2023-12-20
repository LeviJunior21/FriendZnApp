import AvatarSkin from "./AvatarSkin";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IonIcons from "react-native-vector-icons/Ionicons";
import IconAwesome from "react-native-vector-icons/FontAwesome";
import styled from "styled-components/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";

const Tab = createBottomTabNavigator();
export default function AvatarBottoms() {
    const routeNames = [
        "AvatarSkin",
        "AvatarPele",
        "AvatarRoute",
        "AvatarEye",
        "AvatarChapeu",
        "AvatarOculos",
    ];
    
    return (
        <GestureHandlerRootView style={{flex: 1}}>
        <Tab.Navigator screenOptions={{headerShown: false}} tabBar={(props) => 
            <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            >
                <FlatList
                data={routeNames}
                horizontal={true}
                keyExtractor={(item) => item.toString()}
                renderItem={({item, index}) => <TabBar key={index} onPress={() => props.navigation.navigate(item)}></TabBar>}
                />
        </ScrollView>
        }>
            <Tab.Screen name="AvatarSkin" component={AvatarSkin}
            options={{ tabBarLabel: "Pele", tabBarIcon: ({color, size}) => (<Icon name="head-outline" size={size} color={color}/>)}}
            />
            <Tab.Screen name="AvatarPele" component={AvatarSkin} 
            options={{ tabBarLabel: "Fundo", tabBarIcon: ({color, size}) => (<IonIcons name="color-palette-outline" size={size} color={color}/>)}}
            />
            <Tab.Screen name="AvatarRoute" component={AvatarSkin} 
            options={{ tabBarLabel: "Roupa", tabBarIcon: ({color, size}) => (<IonIcons name="shirt" size={size} color={color}/>)}}
            />
            <Tab.Screen name="AvatarEye" component={AvatarSkin} 
            options={{ tabBarLabel: "Olhos", tabBarIcon: ({color, size}) => (<IconAwesome name="eye" size={size} color={color}/>)}}
            />
            <Tab.Screen name="AvatarChapeu" component={AvatarSkin} 
            options={{ tabBarLabel: "Chapéu", tabBarIcon: ({color, size}) => (<Icon name="redhat" size={size} color={color}/>)}}
            />
            <Tab.Screen name="AvatarOculos" component={AvatarSkin} 
            options={{ tabBarLabel: "Oculos", tabBarIcon: ({color, size}) => (<IonIcons name="glasses" size={size} color={color}/>)}}
            />

            <Tab.Screen name="AvsatarChapeu" component={AvatarSkin} 
            options={{ tabBarLabel: "Chapéu", tabBarIcon: ({color, size}) => (<Icon name="redhat" size={size} color={color}/>)}}
            />
            <Tab.Screen name="AvastarOculos" component={AvatarSkin} 
            options={{ tabBarLabel: "Oculos", tabBarIcon: ({color, size}) => (<IonIcons name="glasses" size={size} color={color}/>)}}
            />
            <Tab.Screen name="AvatarChapeus" component={AvatarSkin} 
            options={{ tabBarLabel: "Chapéu", tabBarIcon: ({color, size}) => (<Icon name="redhat" size={size} color={color}/>)}}
            />
            <Tab.Screen name="AvatarOculosaa" component={AvatarSkin} 
            options={{ tabBarLabel: "Oculos", tabBarIcon: ({color, size}) => (<IonIcons name="glasses" size={size} color={color}/>)}}
            />
        </Tab.Navigator>
        </GestureHandlerRootView>
    )
}

const TabBar = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    background-color: red;
`

const ScrollView = styled.ScrollView`
    width: 100%;
    position: absolute;
    top: 0;
`