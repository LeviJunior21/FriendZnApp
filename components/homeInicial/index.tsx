import styled from 'styled-components/native';
import { Dimensions, FlatList, RefreshControl } from 'react-native';
import { PublicacaoUser } from '../publicacao/publicacao';
import { HomeProps } from '../../utils/interfaces';
import { useDataManagement } from './useDataManagement';
import TodasCategorias from './nav/todasCategorias';

export default function App(props: HomeProps) {
  const { filteredPublicacoes, refreshing, refreshData } = useDataManagement(props);

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

const height = Dimensions.get('window').height;
const Container = styled.ScrollView`
  width: 100%;
  height: 100%;
  background-color: #303030;
`

const Separator = styled.View`
  height: 2px;
`
