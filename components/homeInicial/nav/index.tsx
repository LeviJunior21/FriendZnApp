import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { Dimensions } from "react-native";
import React, { useState } from "react";
import { NavProps } from "../../../utils/interfaces";

export const Nav: React.FC<NavProps> = ({ search, setSearch, openCategoria, setOpenCategoria }) => {
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
            <DrawerButton>
                <Icon name={"menu-outline"} color={"black"} size={30}/>
            </DrawerButton>
            <Categoria onPress={handleCategoria}>
                <TextCategoria>{"Todas\nCategorias"}</TextCategoria>
                <CategoriaAnimatedIcon style={{transform: [{rotate: `${openCategoria? 180:0}deg`}]}}>
                    <Icon name={"chevron-down"} size={20}></Icon>
                </CategoriaAnimatedIcon>
            </Categoria>
            <Notification>
                <Icon name={"notifications"} color={"black"} size={26}/>  
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
                        <Icon name={open?"close":"search"} size={20} color={open? "white":"black"}/>
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
    align-items: center;
    z-index: 3;
`

const DrawerButton = styled.View`
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
    width: 30%;
    height: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const TextCategoria = styled.Text`
    width: 80%;
    color: black;
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
