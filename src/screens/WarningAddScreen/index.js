import React, { useState, useEffect } from 'react';
import C from './style';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import { useStateValue } from '../../contexts/StateContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();
  const [warnText, setWarnText] = useState('');
  const [photoList, setPhotoList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Adicionar uma Ocorrência',
    });
  }, []);

  const handleAddPhoto = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      let list = [...photoList];
      list.push(result.uri);
      setPhotoList(list);
    }
  };

  const handleDelPhoto = (url) => {
    let list = [...photoList];
    list = list.filter((item) => item !== url);
    setPhotoList(list);
  };

  const handleSaveWarn = async () => {
    if (warnText !== '') {
      const result = await api.addWarning(warnText, photoList);
      if (result.error === '') {
        navigation.navigate('WarningScreen');
      } else {
        alert(result.error);
      }
    } else {
      alert('Descreva a ocorrência');
    }
  };

  return (
    <C.Container>
      <C.Scroller>
        <C.Title>Descreva a ocorrência</C.Title>

        <C.Field
          placeholder="Ex: Vizinho X está com o som alto"
          value={warnText}
          onChangeText={(t) => setWarnText(t)}
        />
        <C.Title>Fotos Relacionadas</C.Title>
        <C.PhotoArea>
          <C.PhotoScroll horizontal={true}>
            <C.PhotoAddButton onPress={handleAddPhoto}>
              <Icon name="camera" size={24} color="#000" />
            </C.PhotoAddButton>
            {photoList.map((item, index) => (
              <C.PhotoItem key={index}>
                <C.Photo source={{ uri: item }} />
                <C.PhotoRemoveButton onPress={() => handleDelPhoto(item)}>
                  <Icon name="remove" size={16} color="#f00" />
                </C.PhotoRemoveButton>
              </C.PhotoItem>
            ))}
          </C.PhotoScroll>
        </C.PhotoArea>
        {loading && <C.LoadingText>Enviando foto. Aguarde</C.LoadingText>}
        <C.ButtonArea onPress={handleSaveWarn}>
          <C.ButtonText>Salvar</C.ButtonText>
        </C.ButtonArea>
      </C.Scroller>
    </C.Container>
  );
};
