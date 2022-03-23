import React, { useState } from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../services/api';
import { Linking } from 'react-native';

const Box = styled.TouchableOpacity`
  background-color: #fff;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 10px;
  border-width: 2px;
  border-color: #e8e9ed;
  flex-direction: row;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 18px;
  margin-left: 10px;
  color: #000;
`;

export default ({ data }) => {
  const handleClick = async () => {
    const supported = await Linking.canOpenURL(data.fileurl);
    if (supported) {
      Linking.openURL(data.fileurl);
    } else {
      alert('Não foi possível abrir o arquivo');
    }
  };

  return (
    <Box onPress={handleClick}>
      <Icon name="file-text" size={30} color="#8863e6" />
      <Title>{data.title}</Title>
    </Box>
  );
};
