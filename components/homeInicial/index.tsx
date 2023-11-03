import styled from 'styled-components/native';
import { FlatList, RefreshControl } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { Publicacao } from '../../model/Publicacao';
import { PublicacaoUser } from '../publicacao/publicacao';
import { getPublicacoes } from '../../utils/getPublicacoes';
import { publicacaoDefault } from './defaultMessage';
import { HomeProps } from '../../utils/interfaces';
import { useDataManagement } from './useDataManagement';

export default function App(props: HomeProps) {
  const { publicacoes, filteredPublicacoes, refreshing, refreshData } = useDataManagement(props);

  return (
    <Container
    refreshControl={
      <RefreshControl 
      refreshing={refreshing} 
      onRefresh={refreshData}/>
    }
    >
      <FlatList
      ItemSeparatorComponent={() => <Separator/>}
      data={filteredPublicacoes}
      renderItem={({index, item}) => 
        <PublicacaoUser publicacao={item} index={index}></PublicacaoUser>
      }/>
    </Container>
  );
}

const Indicator = styled.ActivityIndicator`
`

const Container = styled.ScrollView`
  width: 100%;
  height: 100%;
  background-color: #303030;
`

const Separator = styled.View`
  height: 2px;
`
