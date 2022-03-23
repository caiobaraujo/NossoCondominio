import styled from 'styled-components/native';

export default {
  Container: styled.SafeAreaView`
    flex: 1;
    background-color: #f5f6fa;
  `,
  Scroller: styled.ScrollView`
    flex: 1;
    padding: 20px;
  `,
  Title: styled.Text`
    font-size: 16px;
    color: #000;
    margin: 10px 0;
  `,
  Field: styled.TextInput`
    border-width: 1px;
    border-color: #ccc;
    background-color: #fff;
    border-radius: 4px;
    color: #000;
    padding: 10px;
    font-size: 16px;
  `,
  PhotoArea: styled.View`
    margin-bottom: 30px;
  `,
  PhotoScroll: styled.ScrollView`
    flex: 1;
  `,
  PhotoAddButton: styled.TouchableOpacity`
    width: 65px;
    height: 65px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border-width: 1px;
    border-color: #ccc;
  `,
  PhotoItem: styled.View`
    width: 65px;
    border-width: 1px;
    border-color: #ccc;
    border-radius: 4px;
    padding-bottom: 5px;
    margin-left: 5px;
    align-items: center;
  `,
  PhotoRemoveButton: styled.TouchableOpacity``,
  Photo: styled.Image`
    width: 63px;
    height: 63px;
    margin-bottom: 5px;
    border-radius: 4px;
  `,
  ButtonArea: styled.TouchableOpacity`
    background-color: #8863e6;
    padding: 12px;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
  `,
  ButtonText: styled.Text`
    color: #fff;
    font-size: 16px;
    font-weight: bold;
  `,
  LoadingText: styled.Text`
    font-size: 16px;
    margin: 10px 0;
  `,
};
