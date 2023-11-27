import { RootStackParamList } from "../principal/Interface";

export interface LoginProps {
    navigation: LoginNavigationNone
}

interface LoginNavigationNone {
    navigate: (routeName: keyof RootStackParamList) => void;
}

export interface LoginStateProps {
    userInfo: UserInfo,
    accept: boolean,
    save: boolean,
    accessToken: string,
    loginPress: boolean,
    hasData: boolean,
    navigation: LoginNavigationNone
}

export interface UserInfo {

}

export interface FazerLoginProps {
    userInfo: any;
    setUserInfo: (userInfo: UserInfo) => void;
}

export interface FazerLoginStateProps {
    userInfo: any;
    setUserInfo:  (userInfo: UserInfo) => void;

}