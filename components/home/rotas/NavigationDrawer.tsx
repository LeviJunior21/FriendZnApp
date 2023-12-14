import { createDrawerNavigator } from "@react-navigation/drawer";
import NavigationBottoms from "./NaviagationBottoms";
import CustomDrawerContent from "../../drawer/CustomDrawerContent";
import { Navigation } from "../../../utils/interfaces";

const Drawer = createDrawerNavigator();

export default function NavigationDrawer() {
    return (
        <Drawer.Navigator screenOptions={{headerShown: false}} drawerContent={(props) => <CustomDrawerContent navigation={props.navigation}/>}>
            <Drawer.Screen name={"BottomsScreen"} component={NavigationBottoms}/>
        </Drawer.Navigator>
    )
}
