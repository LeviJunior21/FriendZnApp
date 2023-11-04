import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import styled from 'styled-components/native';

interface Props {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}
const TodasCategorias = (props: Props) => {
    const heightShared = useSharedValue(0);

    const showCategorias = () => {
        const withHeight = props.open? 40: height;
        heightShared.value = withTiming(withHeight, {duration: 300})
        props.setOpen(!open);
    }

    useEffect(() => {
        showCategorias();
    }, [open])

    return (
        <AlertContainer style={{height: heightShared.value}}>
            <TouchableOpacity style={{width: 40, height: 40, backgroundColor: 'red'}} onPress={showCategorias}></TouchableOpacity>
        </AlertContainer>
    );
};

export default TodasCategorias;
const height = Dimensions.get('window').height;

const AlertContainer = styled(Animated.View)`
    width: 100%;
    top: 50px;
    position: absolute;
    background-color: green;
    z-index: 4;
`
