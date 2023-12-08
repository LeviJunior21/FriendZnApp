import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { useState } from "react";
import { Dimensions } from "react-native";
import { NavProps } from "../../../utils/interfaces";
import { getCategory } from "../../../utils/getCategory";

export const NavCategoria: React.FC<NavProps> = ({navigation, categoriaEscolhida, search, setSearch, openCategoria, setOpenCategoria }) => {
    const widthShared = useSharedValue(40);
    const [open, setOpen] = useState(false);

    const handlePress = () => {
        const targetWidth = open ? 40 : width - 50;
        widthShared.value = withTiming(targetWidth, { duration: 300 });
        setOpen(!open);
    };

    const handleCategoria = () => {
        setOpenCategoria(!openCategoria);
    }

    return (
        <Container>
            <DrawerButton onPress={() => navigation.navigate("Configuracoes", {navigation: navigation})}>
                <Icon name={"menu-outline"} color={"white"} size={30}/>
            </DrawerButton>
            <Categoria onPress={handleCategoria}>
                <TextCategoria>{getCategory(categoriaEscolhida)}</TextCategoria>
                <CategoriaAnimatedIcon style={{transform: [{rotate: `${openCategoria? 180:0}deg`}]}}>
                    <Icon name={"chevron-down"} size={20} color={"white"}/>
                </CategoriaAnimatedIcon>
            </Categoria>
            <Notification>
                <Icon name={"notifications"} color={"white"} size={26}/>  
            </Notification>
            <Search style={{width: widthShared}}>
                <StyledAnimatedView 
                style={{
                    width: widthShared, 
                    borderWidth: open? 1:0, 
                    backgroundColor: open? "#303030": "transparent"
                }}>
                    {open?
                        <InputSearch 
                        value={search}
                        style={{display: open? "flex":"none"}} 
                        numberOfLines={1} 
                        maxLength={36}
                        onChangeText={(text) => setSearch(text)}
                        cursorColor={"white"}
                        placeholderTextColor={"white"}
                        onSubmitEditing={handlePress}
                        placeholder={"Digite aqui"}/>
                        :<></>
                    }
                    <IconSearchContainer onPress={handlePress}>
                        <Icon name={open?"close":"search"} size={20} color={open? "white":"white"}/>
                    </IconSearchContainer>
                </StyledAnimatedView>
            </Search>
        </Container>
    )
}

const width = Dimensions.get('window').width;
const Container = styled.View`
    width: 100%;
    height: 50px;
    flex-direction: row;
    border-bottom-width: 2px;
    border-bottom-color: black;
    background-color: #10a17d;
    align-items: center;
    z-index: 3;
`

const DrawerButton = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    justify-content: center;
    align-items: center;
`

const Search = styled(Animated.View)`
    height: 50px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    position: absolute;
    right: 6px;
`

const IconSearchContainer = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const StyledAnimatedView = styled(Animated.View)`
    height: 40px;
    border-radius: 20px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    color: black;
`

const InputSearch = styled.TextInput`
    height: 40px;
    width: 80%;
    border-radius: 6px;
    border-color: black;
    color: white;
`

const Categoria = styled.TouchableOpacity`
    margin-left: 10px;
    width: 30%;
    height: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const TextCategoria = styled.Text`
    width: 80%;
    color: white;
    font-size: 14px;
    font-weight: bold;
    flex-wrap: wrap;
`

const CategoriaAnimatedIcon = styled(Animated.View)`

`

const Notification = styled.TouchableOpacity`
    position: absolute;
    right: 70px;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    justify-content: center;
    align-items: center;
`
