import React, { useState, useEffect } from 'react';
import C from './style';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import { useStateValue } from '../../contexts/StateContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  const [loading, setLoading] = useState(true);
  const [wallList, setWallList] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Mural de Avisos',
    });
    getWall();
  }, []);

  const getWall = async () => {
    setLoading(true);
    const result = await api.getWall();
    setLoading(false);
    if (result.error === '') {
      //setWallList(result.list);
    } else {
      alert(result.error);
    }
  };

  return (
    <C.Container>
      {loading && <C.LoadingIcon color="#8863e6" size="large" />}
      {!loading && wallList.length === 0 && (
        <C.NoListArea>
          <C.NoListText>Não há nenhum aviso no mural</C.NoListText>
        </C.NoListArea>
      )}
    </C.Container>
  );
};
