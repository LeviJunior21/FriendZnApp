import { useState, useEffect, useCallback } from 'react';
import { getPublicacoes } from '../../utils/getPublicacoes';
import { HomeProps } from '../../utils/interfaces';
import { Publicacao } from '../../model/Publicacao';

export function useDataManagement(props: HomeProps) {
  const [publicacoes, setPublicacoes] = useState<Publicacao[]>([]);
  const [filteredPublicacoes, setFilteredPublicacoes] = useState<Publicacao[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const refreshData = useCallback(() => {
    setRefreshing(true);
    getPublicacoes((newPublicacoes) => {
      setPublicacoes(newPublicacoes);
      setFilteredPublicacoes(newPublicacoes);
      setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    getPublicacoes((newPublicacoes) => {
      setPublicacoes(newPublicacoes);
      setFilteredPublicacoes(newPublicacoes);
    });
  }, [ props.meusDados ]);

  useEffect(() => {
    if (props.search === "") {
      setFilteredPublicacoes(publicacoes);
    } else {
      const filtered = publicacoes.filter((publicacao) =>
        publicacao.getPublicacao().toLowerCase().includes(props.search.toLowerCase())
      );
      setFilteredPublicacoes(filtered);
    }
  }, [props.search, publicacoes]);

  return {
    publicacoes,
    filteredPublicacoes,
    refreshing,
    refreshData,
  };
}
