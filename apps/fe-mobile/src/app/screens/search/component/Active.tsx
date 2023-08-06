import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { translate } from '@fe-monorepo/helper';
import SingleItem from '../../../components/item_list/single_item'
import { StyledText } from '../../../components/text';
import Typography from '../../../assets/typography';
import { StyledContainer } from '../../../components/container';
import { useSearchHistory } from '@fe-monorepo/hooks';


const Active = (keyWord: string) => {

    const sample = [
        { id: '', title: 'iPhone 13 Max' },
        { id: '', title: 'Xbox one'},
        { id: '', title: 'Xbox 360' },
        { id: '', title: 'CS: GO' },
        { id: '', title: 'Apex legends' },
        { id: '', title: 'iPhone 13 Max' },
        { id: '', title: 'Xbox one'},
        { id: '', title: 'Xbox 360' },
        { id: '', title: 'Apex legends' },
        { id: '', title: 'iPhone 13 Max' }
    ];

  const renderItem = ({ item, index }) => {
    return (<SingleItem type={'default'}
        item = {item}
    />);
  };

  return (
    <StyledContainer disableVertical> 
      <FlatList
          data={sample}
          keyExtractor={(_, index) => `${index}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          bounces={false}
      />
    </StyledContainer>
  );
};

export default Active;
