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
        {publicacoesFiltradas.length > 10?
          <NovasPublicacoesBadge>
            <NovasPublicacoesText>Há novas publicações</NovasPublicacoesText>
          </NovasPublicacoesBadge>:<></>
        }
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

const NovasPublicacoesBadge = styled.View`
  align-self: center;
  min-width: 160px;
  height: 28px;
  border-radius: 14px;
  background-color: #10a17d;
  justify-content: center;
  align-items: center;
  margin-vertical: 8px;
`

const NovasPublicacoesText = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: 700;
`
