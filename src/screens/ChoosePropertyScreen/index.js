import React, { useState } from 'react';
import C from './style';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import { useStateValue } from '../../contexts/StateContext';

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  return (
    <C.Container>
      <C.Logo
        source={require('../../assets/undraw_home.png')}
        resizeMode="contain"
      />
    </C.Container>
  );
};
