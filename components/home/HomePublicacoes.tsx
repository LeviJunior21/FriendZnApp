import styled from 'styled-components/native';
import { Dimensions, FlatList, RefreshControl } from 'react-native';
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
      <HomeScroll>
        <FlatList
        data={publicacoesFiltradas}
        ItemSeparatorComponent={() => <Separator/>}
        renderItem={({index, item}) => 
          <PublicacaoUser navigation={props.navigation} publicacao={item} index={index}></PublicacaoUser>
        }/>
      </HomeScroll>
    </Container>
  );
}

const height = Dimensions.get("window").height;
const Container = styled.ScrollView`
  width: 100%;
  height: 100%;
  background-color: #303030;
`

const HomeScroll = styled.ScrollView`
  height: ${height - 100}px;
`

const Separator = styled.View`
  width: 100%;
  height: 2px;
  background-color: white;
`