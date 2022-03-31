import React, { useState, useEffect } from 'react';
import C from './style';

import { useNavigation } from '@react-navigation/native';
import { useStateValue } from '../../contexts/StateContext';
import ReservationItem from '../../components/ReservationItem';

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  const lista = [
    {
      id: 1,
      title: 'Piscina',
      image:
        'https://www.marol.com.br/blog/wp-content/uploads/2020/04/piscina-de-fibra-1030x687.jpg',
      dates: ['Segunda à Sexta: 8:00 às 18:00'],
    },
    {
      id: 2,
      title: 'Academia',
      image:
        'https://scproduction.s3.sa-east-1.amazonaws.com/wysiwyg_uploads/cms/images/2018/10/01/19/07-h9ytse3i.JPG',
      dates: ['Segunda à Sexta: 8:00 às 18:00'],
    },
    {
      id: 3,
      title: 'Churrasqueira',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsCa832R433DZe1Y2GlAZc0Zpog5pZ5tanPw&usqp=CAU',
      dates: ['Segunda à Sexta: 8:00 às 18:00'],
    },
    {
      id: 4,
      title: 'Piscina de novo',
      image:
        'https://www.marol.com.br/blog/wp-content/uploads/2020/04/piscina-de-fibra-1030x687.jpg',
      dates: ['Segunda à Sexta: 8:00 às 18:00'],
    },
  ];

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Reservas Disponíveis',
    });
    getReservations(lista);
  }, []);

  const getReservations = (lista) => {
    setList([]);
    setLoading(true);
    setList(lista);
    setLoading(false);
  };

  return (
    <C.Container>
      <C.Scroller contentContainerStyle={{ paddingBottom: 40 }}>
        <C.ButtonArea
          onPress={() => navigation.navigate('ReservationMyScreen')}
        >
          <C.ButtonText>Minhas Reservas</C.ButtonText>
        </C.ButtonArea>
        <C.Title>Selecione uma Área</C.Title>

        {loading && <C.LoadingIcon size="large" cor="#8863e6" />}

        {!loading && list.length === 0 && (
          <C.NoListArea>
            <C.NoListText>Nenhuma reserva disponível</C.NoListText>
          </C.NoListArea>
        )}
        {list.map((item, id) => (
          <ReservationItem key={id} data={item} />
        ))}
      </C.Scroller>
    </C.Container>
  );
};
