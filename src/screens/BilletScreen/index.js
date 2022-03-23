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
  const [docList, setDocList] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Boletos',
    });
    getBillets();
  }, []);

  const getBillets = async () => {
    setDocList([]);
    setLoading(true);
    const result = await api.getBillets();
    setLoading(false);
    if (result.error === '') {
      setDocList(result.list);
    } else {
      alert(result.error);
    }
  };

  return (
    <C.Container>
      {!loading && docList.length === 0 && (
        <C.NoListArea>
          <C.NoListText>Não há Boletos desta unidade</C.NoListText>
        </C.NoListArea>
      )}
      <C.List
        data={docList}
        onRefresh={getBillets}
        refreshing={loading}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <DocItem data={item} />}
      ></C.List>
    </C.Container>
  );
};
