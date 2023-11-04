import styled from 'styled-components/native';
import React, { useEffect } from 'react';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import { PropsCategoria } from '../../../utils/interfaces';
import { Dimensions } from 'react-native';

const TodasCategorias = (props: PropsCategoria) => {
    const heightShared = useSharedValue(height)
    const showCategorias = (value: number) => {
        heightShared.value = withTiming(value, {duration: 300, })
    }

    useEffect(() => {
        showCategorias(props.openCategoria? 0.0 * height : height)
    }, [props.openCategoria])

    return (
        <CategoriaContainer style={{transform: [{translateY: heightShared}]}}>
        </CategoriaContainer>
    );
};

export default TodasCategorias;

const height = Dimensions.get('window').height;
const CategoriaContainer = styled(Animated.View)`
    top: 50px;
    width: 100%;
    height: ${height - 50};
    position: absolute;
    background-color: green;
    z-index: 2;
`
