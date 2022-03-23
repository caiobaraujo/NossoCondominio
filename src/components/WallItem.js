import React, { useState } from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../services/api';

const Box = styled.View`
  background-color: #fff;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 10px;
  border-width: 2px;
  border-color: #e8e9ed;
`;
const HeaderArea = styled.View`
  flex-direction: row;
  align-items: center;
`;
const InfoArea = styled.View`
  margin-left: 15px;
  flex: 1;
`;
const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #000;
`;
const Date = styled.Text`
  font-size: 14px;
  color: #9c9db9;
`;
const Body = styled.Text`
  font-size: 14px;
  color: #000;
  margin: 15px 0;
`;
const FooterArea = styled.View`
  flex-direction: row;
  align-items: center;
`;
const LikeButton = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
`;

const LikeText = styled.Text`
  font-size: 14px;
  color: #9c9db9;
  margin-left: 5px;
  margin-right: 5px;
`;

export default ({ data }) => {
  const [likeCount, setLikeCount] = useState(data.likes);

  const [liked, setLiked] = useState(data.liked);

  const handleLike = async () => {
    setLiked(!liked);
    const result = await api.likeWallPost(data.id);
    if (result.error === '') {
      setLikeCount(result.likes);
      setLiked(result.liked);
    } else {
      alert(result.error);
    }
  };

  return (
    <Box>
      <HeaderArea>
        <Icon name="newspaper-o" size={30} color="#8863e6" />
        <InfoArea>
          <Title>{data.title}</Title>
          <Date>{data.datecreated}</Date>
        </InfoArea>
      </HeaderArea>
      <Body>{data.body}</Body>
      <FooterArea>
        <LikeButton onPress={handleLike}>
          {liked ? (
            <Icon name="heart" size={17} color="#f00" />
          ) : (
            <Icon name="heart-o" size={17} color="#9c9db9" />
          )}
        </LikeButton>
        <LikeText>
          {likeCount} like{likeCount === 1 ? '' : 's'}
        </LikeText>
      </FooterArea>
    </Box>
  );
};
