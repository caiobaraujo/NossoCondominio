import React, { useState } from 'react';
import C from './style';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import { useStateValue } from '../../contexts/StateContext';

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginButton = async () => {
    if (cpf && password) {
      let response = await api.login(cpf, password);
      if (response.error === '') {
        dispatch({ type: 'setToken', payload: { token: response.token } });

        dispatch({ type: 'setUser', payload: { user: response.user } });
        navigation.reset({
          index: 1,
          routes: [{ name: 'ChoosePropertyScreen' }],
        });
      } else {
        alert(response.error);
      }
    } else {
      alert('Preencha todos os campos');
    }
  };

  const handleRegisterButton = () => {
    navigation.navigate('RegisterScreen');
  };

  return (
    <C.Container>
      <C.Logo
        source={require('../../assets/undraw_home.png')}
        resizeMode="contain"
      />
      <C.Field
        placeholder="Digite seu CPF"
        keyboardType="numeric"
        value={cpf}
        onChangeText={(t) => setCpf(t)}
      />
      <C.Field
        placeholder="Digite sua Senha"
        secureTextEntry={true}
        value={password}
        onChangeText={(t) => setPassword(t)}
      />

      <C.ButtonArea onPress={handleLoginButton}>
        <C.ButtonText>Entrar</C.ButtonText>
      </C.ButtonArea>

      <C.ButtonArea onPress={handleRegisterButton}>
        <C.ButtonText>Cadastrar</C.ButtonText>
      </C.ButtonArea>
    </C.Container>
  );
};
