import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { Dimensions } from "react-native";
import React, { Component } from "react";
import { getCategory } from "../../../../utils/getCategory";
import { NavHomeProps, NavHomeStateProps } from "./Interface";

export class NavHome extends Component<NavHomeProps, NavHomeStateProps> {
    constructor(props: NavHomeProps) {
        super(props);

        this.state = {
            open: false,
            search: props.search,
            setSearch: props.setSearch,
            widthShared: useSharedValue(40),
            openCategoria: props.openCategoria,
            setOpenCategoria: props.setOpenCategoria,
            categoriaEscolhida: props.categoriaEscolhida
        }
    }

    public handlePress(): void {
        const targetWidth = this.state.open ? 40 : width - 50;
        this.state.widthShared.value = withTiming(targetWidth, { duration: 300 });
        this.setState({ open: !this.state.open });
    };

    public handleCategoria(): void {
        this.setState({openCategoria: !this.state.openCategoria});
    }

    render() {
        return (
            <Container>
                <DrawerButton>
                    <Icon name={"menu-outline"} color={"white"} size={30}/>
                </DrawerButton>
                <Categoria onPress={this.handleCategoria}>
                    <TextCategoria>{getCategory(this.state.categoriaEscolhida)}</TextCategoria>
                    <CategoriaAnimatedIcon style={{transform: [{rotate: `${this.state.openCategoria? 180:0}deg`}]}}>
                        <Icon name={"chevron-down"} size={20} color={"white"}/>
                    </CategoriaAnimatedIcon>
                </Categoria>
                <Notification>
                    <Icon name={"notifications"} color={"white"} size={26}/>  
                </Notification>
                <Search style={{width: this.state.widthShared}}>
                    <StyledAnimatedView 
                    style={{
                        width:this.state.widthShared, 
                        borderWidth: this.state.open? 1:0, 
                        backgroundColor: this.state.open? "#303030": "transparent"
                    }}>
                        {this.state.open?
                            <InputSearch 
                            value={this.state.search}
                            style={{display: this.state.open? "flex":"none"}} 
                            numberOfLines={1} 
                            maxLength={36}
                            onChangeText={(text) => this.state.setSearch(text)}
                            cursorColor={"white"}
                            placeholderTextColor={"white"}
                            onSubmitEditing={this.handlePress}
                            placeholder={"Digite aqui"}/>
                            :<></>
                        }
                        <IconSearchContainer onPress={this.handlePress}>
                            <Icon name={this.state.open? "close":"search"} size={20} color={this.state.open? "white":"white"}/>
                        </IconSearchContainer>
                    </StyledAnimatedView>
                </Search>
            </Container>
        )
    }
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
