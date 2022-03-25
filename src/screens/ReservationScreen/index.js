import React, { useState, useEffect } from 'react';
import C from './style';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import { useStateValue } from '../../contexts/StateContext';

import DocItem from '../../components/DocItem';

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Reservas Disponíveis',
    });
    getReservations();
  }, []);

  const getReservations = async () => {
    setList([]);
    setLoading(true);
    const result = await api.getReservations();
    setLoading(false);
    if (result.error === '') {
      setList(result.list);
    } else {
      alert(result.error);
    }
  };

  return (
    <C.Container>
      <C.Scroller>
        <C.ButtonArea onPress={null}>
          <C.ButtonText>Minhas Reservas</C.ButtonText>
        </C.ButtonArea>
        <C.Title>Selecione uma Área</C.Title>

        {loading && <C.LoadingIcon size="large" cor="#8863e6" />}

        {!loading && list.length === 0 && (
          <C.NoListText>Nenhuma reserva disponível</C.NoListText>
        )}
      </C.Scroller>
    </C.Container>
  );
};
