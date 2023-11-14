import styled from 'styled-components/native';
import React, { useEffect } from 'react';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import { Categoria, PropsCategoria } from '../../../utils/interfaces';
import { Dimensions, FlatList, ScrollView } from 'react-native';
import { data } from './categories';

const TodasCategorias = (props: PropsCategoria) => {
    const heightShared = useSharedValue(height)
    const showCategorias = (value: number) => {
        heightShared.value = withTiming(value, {duration: 300, });
    }

    const handleCategoria = (categoria: Categoria) => {
        props.setCategoriaEscolhida(categoria);
        props.setOpenCategoria(!props.openCategoria)
    }

    useEffect(() => {
        showCategorias(props.openCategoria? 0.0 * height : height)
    }, [props.openCategoria]);

    return (
        <CategoriaContainer style={{transform: [{translateY: heightShared}]}}>
            <ScrollView style={{flex: 1}} horizontal={false}>
                <FlatList
                    data={data}
                    numColumns={2}
                    horizontal={false}
                    renderItem={({item, index}) => 
                        <CategoriaItemContainer 
                        activeOpacity={1}
                        onPress={() => handleCategoria(item.categoria)}
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
