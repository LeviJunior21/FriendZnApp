import styled from 'styled-components/native';
import { FlatList, RefreshControl } from 'react-native';
import { HomePublicacoesProps, HomePublicacoesStateProps } from './Interface';
import { PublicacaoUsuario } from './PublicacaoUsuario';
import { Component, useContext } from 'react';
import { ContextTypeProvider, Provider } from '../../data/Provider';
import { Publicacao } from '../../../model/Publicacao';

export class HomePublicacoes extends Component<HomePublicacoesProps, HomePublicacoesStateProps> {
    constructor(props: HomePublicacoesProps) {
        super(props);
        const { publicacaoController } = useContext(Provider) as ContextTypeProvider;

        this.state = {
            navigation: props.navigation,
            search: props.search,
            categoriaEscolhida: props.categoriaEscolhida,
            publicacaoController,
            refreshing: false,
            publicacoesFiltradas: [],
            publicacoes: []
        }
    }

    public refreshData(): void {
        this.setState({refreshing: true});
        this.state.publicacaoController.getPublicacoes().then((newPublicacoes: Publicacao[]) => {
            this.setState({
                publicacoes: newPublicacoes,
                publicacoesFiltradas: newPublicacoes,
                refreshing: false
            })
        });
    }

    componentDidMount(): void {
        this.state.publicacaoController.getPublicacoes().then((newPublicacoes: Publicacao[]) => {
            this.setState({
                publicacoes: newPublicacoes,
                publicacoesFiltradas: newPublicacoes
            })
        });

        this.refreshData();
      }

    componentDidUpdate(prevProps: HomePublicacoesProps, prevState: HomePublicacoesStateProps): void {
        if (this.state.search !== prevState.search) {
            if (this.state.search === "") {
                this.setState({publicacoesFiltradas: this.state.publicacoes});
            } else {
                const filtered = this.state.publicacoes.filter((publicacao: Publicacao) =>
                    publicacao.getPublicacao().toLowerCase().includes(this.state.search.toLowerCase())
                );
                this.setState({publicacoesFiltradas: filtered});
            }
        }
    }

    render() {

        return (
            <Container
            refreshControl = {
                <RefreshControl 
                refreshing={this.state.refreshing} 
                onRefresh={() => this.refreshData()}/>
            }>
                <FlatList
                data={this.state.publicacoesFiltradas}
                renderItem={({index, item}) => 
                    <PublicacaoUsuario navigation={this.state.navigation} publicacao={item} index={index}></PublicacaoUsuario>
                }/>
            </Container>
        )
    }
}

const Container = styled.ScrollView`
  width: 100%;
  height: 100%;
  background-color: #303030;
`
