import { FlatList, Pressable, Text, Image, View } from 'react-native';
import React, { useState } from 'react';
import ViewContainer from '../../components/view_container';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import { getStyle } from '@fe-monorepo/themes';
import styles from './styles';
import { translate } from '@fe-monorepo/helper';
import StickyBottom from './StickyBottom';
import colors from 'libs/themes/src/colors';
import images from '../../assets/images';
import Loading from '../../components/Loading';

const Questionnaire = () => {
  const choices = [
    { answer: translate('questionnaire_1') },
    { answer: translate('questionnaire_2') },
    { answer: translate('questionnaire_3') },
    { answer: translate('questionnaire_4') },
    { answer: translate('questionnaire_5') }
  ];
  const { themes, isRTL, isLoading } = useSelector((state: RootState) => state.app);
  const [selected, setSelected] = useState(null);
  const submitDisabled = selected === null || isLoading;
  const textAlign = isRTL ? 'right' : 'left';

  const renderItem = ({ item, index }) => {
    const isSelected = selected === index;
    const borderColor = isSelected ? colors.sunset : getStyle(themes).textColor10;
    const backgroundColor = isSelected ? 'rgba(233, 95, 42, 0.1)' : null;
    return (
      <Pressable
        onPress={() => setSelected(index)}
        key={`choices_idx${index}`}
        style={[styles.cardContainer, { borderColor, backgroundColor }]}
      >
        {isSelected ? <Image source={images.icon_check_circle} style={styles.iconContainer} /> : <View style={styles.iconContainer} />}
        <Text style={[styles.questionsLabel, { color: getStyle(themes).textColor, textAlign }]}>{item.answer}</Text>
      </Pressable>
    );
  };

  return (
    <>
      <ViewContainer style={[styles.container]}>
        <Text style={[styles.title, { color: getStyle(themes).textColor, textAlign }]}>{translate('questionnaire_title')}</Text>
        <Text style={[styles.description, { color: getStyle(themes).textColor50, textAlign }]}>
          {translate('questionnaire_description')}
        </Text>
        <FlatList
          style={styles.mt32}
          data={choices}
          keyExtractor={(_, index) => `choices_idx${index}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          bounces={false}
        />
      </ViewContainer>
      <StickyBottom selectedChoice={selected + 1} theme={themes} isRTL={isRTL} disabled={submitDisabled} />
      {isLoading && <Loading />}
    </>
  );
};

export default Questionnaire;
