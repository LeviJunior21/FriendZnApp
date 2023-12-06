import styled from 'styled-components/native';
import { FlatList, RefreshControl } from 'react-native';
import { PublicacaoUser } from '../publicacao/Publicacao';
import { Categoria, HomeProps } from '../../utils/interfaces';
import { useDataManagement } from './UseDataManagement';

export default function HomePublicacoes(props: HomeProps) {
  const { filteredPublicacoes, refreshing, refreshData } = useDataManagement(props);

  const publicacoesFiltradas = props.categoriaEscolhida === Categoria.todasCategorias
  ? filteredPublicacoes
  : filteredPublicacoes.filter((publicacao) => publicacao.getCategoria() === props.categoriaEscolhida);

  return (
    <Container
    refreshControl={
      <RefreshControl 
      refreshing={refreshing} 
      onRefresh={refreshData}/>
    }
    >
      <FlatList
      data={publicacoesFiltradas}
      renderItem={({index, item}) => 
        <PublicacaoUser navigation={props.navigation} publicacao={item} index={index}></PublicacaoUser>
      }/>
    </Container>
  );
}

const Container = styled.ScrollView`
  width: 100%;
  height: 100%;
  background-color: #303030;
`
