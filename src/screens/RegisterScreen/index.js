import React, { useState, useEffect } from 'react';
import C from './style';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import { useStateValue } from '../../contexts/StateContext';

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Fazer Cadastro',
    });
  }, []);

  const handleRegisterButton = async () => {
    if (name && email && cpf && password && passwordConfirm) {
      let response = await api.register(
        name,
        cpf,
        email,
        password,
        passwordConfirm
      );
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
  return (
    <C.Container>
      <C.Field
        placeholder="Digite seu Nome Completo"
        value={name}
        onChangeText={(t) => setName(t)}
      />

      <C.Field
        placeholder="Digite seu CPF"
        keyboardType="numeric"
        value={cpf}
        onChangeText={(t) => setCpf(t)}
      />
      <C.Field
        placeholder="Digite seu E-mail"
        value={email}
        onChangeText={(t) => setEmail(t)}
      />
      <C.Field
        placeholder="Digite sua Senha"
        secureTextEntry={true}
        value={password}
        onChangeText={(t) => setPassword(t)}
      />
      <C.Field
        placeholder="Confirme sua Senha"
        // secureTextEntry={true}
        value={passwordConfirm}
        onChangeText={(t) => setPasswordConfirm(t)}
      />

      <C.ButtonArea onPress={handleRegisterButton}>
        <C.ButtonText>Cadastrar</C.ButtonText>
      </C.ButtonArea>
    </C.Container>
  );
};
