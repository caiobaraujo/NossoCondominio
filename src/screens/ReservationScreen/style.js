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

  LoadingIcon: styled.ActivityIndicator``,

  NoListArea: styled.View`
    justify-content: center;
    align-items: center;
    padding: 30px;
  `,
  NoListText: styled.Text`
    font-size: 16px;
    color: #000;
  `,
  ButtonArea: styled.TouchableOpacity`
    background-color: #8863e6;
    padding: 12px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
  `,
  ButtonText: styled.Text`
    color: #fff;
    font-size: 16px;
    font-weight: bold;
  `,
  Title: styled.Text`
    font-size: 17px;
    margin: 10px 0;
  `,
};
