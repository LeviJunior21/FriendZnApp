import styled from 'styled-components/native';
import React, { Component } from 'react';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import { Categoria } from '../../../../utils/interfaces';
import { Dimensions, FlatList, ScrollView } from 'react-native';
import { data } from '../../../../components/home/nav/Categorias';
import { TodasCategoriasProps, TodasCategoriasStateProps } from './Interface';

export class TodasCategorias extends Component<TodasCategoriasProps, TodasCategoriasStateProps> {
    constructor(props: TodasCategoriasProps) {
        super(props);

        this.state = {
            openCategoria: props.openCategoria,
            categoriaEscolhida: props.categoriaEscolhida,
            setOpenCategoria: props.setOpenCategoria,
            setCategoriaEscolhida: props.setCategoriaEscolhida,
            heightShared: useSharedValue(height)
        }
    }
    
    private showCategorias(value: number): void {
        this.state.heightShared.value = withTiming(value, {duration: 300, });
    }

    handleCategoria = (categoria: Categoria) => {
        this.state.setCategoriaEscolhida(categoria);
        this.state.setOpenCategoria(!this.state.openCategoria)
    }

    componentDidUpdate(prevProps: Readonly<TodasCategoriasProps>, prevState: Readonly<TodasCategoriasStateProps>): void {
        if (this.state.openCategoria !== prevState.openCategoria) {
            this.showCategorias(this.state.openCategoria? 0.0 * height : height)

        }
    }

    render() {
        return (
            <CategoriaContainer style={{transform: [{translateY: this.state.heightShared}]}}>
                <ScrollView style={{flex: 1}} horizontal={false}>
                    <FlatList
                        data={data}
                        numColumns={2}
                        horizontal={false}
                        renderItem={({item, index}) => 
                            <CategoriaItemContainer 
                            activeOpacity={1}
                            onPress={() => this.handleCategoria(item.categoria)}
                            >
                                <Categorias
                                source={item.image}
                                imageStyle={{
                                    opacity: 0.8, 
                                    objectFit: "cover", 
                                    width: 0.5 * width,
                                    height: 113,
                                    flex: 1
                                }}>
                                    <Texto>{item.titulo}</Texto>
                                </Categorias>
                            </CategoriaItemContainer>
                        }
                    />
                </ScrollView>
            </CategoriaContainer>
       );
    }
};

export default TodasCategorias;

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const CategoriaContainer = styled(Animated.View)`
    top: 50px;
    width: 100%;
    height: ${height - 50}px;
    position: absolute;
    z-index: 2;
`

const CategoriaItemContainer = styled.TouchableOpacity`
    width: 50%;
    height: 113px;
`

const Categorias = styled.ImageBackground`
    width: 100%;
    height: 100%;
    border-width: 2px;
    border-color: black;
    background-color: white;
    justify-content: center;
    align-items: center;
`

const Texto = styled.Text`
    color: white;
    font-size: 20px;
    font-weight: 500;
    text-shadow-color: black;
    text-shadow-offset: 1px 1px;
    text-shadow-radius: 2px;

`
