import React, { useEffect } from 'react';
import C from './style';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import { useStateValue } from '../../contexts/StateContext';

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();
  useEffect(() => {
    const checkLogin = async () => {
      let token = await api.getToken();
      if (token) {
        let response = await api.validateToken();
        if (response.error === '') {
          dispatch({
            type: 'setUser',
            payload: {
              user: response.user,
            },
          });

          navigation.reset({
            index: 1,
            routes: [{ name: 'ChoosePropertyScreen' }],
          });
        } else {
          alert(result.token);
          dispatch({
            type: 'setToken',
            payload: {
              token: '',
            },
          });

          navigation.reset({
            index: 1,
            routes: [{ name: 'LoginScreen' }],
          });
        }
      } else {
        navigation.reset({
          index: 1,
          routes: [{ name: 'LoginScreen' }],
        });
      }
    };

    checkLogin();
  }, []);
  // funcao temporaria, remover
  const handleLogout = async () => {
    await api.logout();
    navigation.reset({
      index: 1,
      routes: [{ name: 'LoginScreen' }],
    });
  };
  return (
    <C.Container>
      <C.LoadingIcon color="8863E6" size="large" />
      <C.Button title="Sair" onPress={handleLogout} />
    </C.Container>
  );
};
