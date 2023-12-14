import { DrawerDescriptorMap, DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import { DrawerNavigationState, NavigationProp, ParamListBase } from "@react-navigation/native";
import { RootStackParamList } from "../../utils/interfaces";

export interface DrawerProps {
    state: DrawerNavigationState<ParamListBase>; 
    navigation: DrawerNavigationHelpers; 
    descriptors: DrawerDescriptorMap; 
}
