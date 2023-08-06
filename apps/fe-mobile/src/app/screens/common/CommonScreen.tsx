import React, { useEffect } from 'react';
import { View, StyleSheet, Image} from 'react-native';
import { StyledSafeView } from '../../components/safe_view';
import { StyledContainer } from '../../components/container';
import { StyledText } from '../../components/text';
import Typography from '../../assets/typography';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/core';

const CSoon = () => {

  const { t } = useTranslation()
  const navigation = useNavigation();
  const styles = createStyles(t)

  return (
    <StyledSafeView>
    <StyledContainer>
      <View style={styles.Container}>
        <StyledText textStyle={Typography.bigTitleMobileMedium} lineHeight={42} marginStyle='marginBottom' marginValue={20} textAlign='center'>{t('msg_shopCheckoutPhrase')}</StyledText>
        <StyledText textStyle={Typography.bodyMedium} lineHeight={25} textAlign='center'>{t('Common_newUserWelcomingMessage')}</StyledText>
      </View> 
    </StyledContainer> 
  </StyledSafeView>
  );
};

export default CSoon;


const createStyles = (
  t: any
) => {
  return StyleSheet.create({  
    Container: {
      justifyContent: 'center', 
      alignItems: 'center',
      alignSelf: 'center',
      flex: 1
    },
    timerContainer: {
      marginTop: 16,
      flexDirection: 'row'
    },
    timerValue: {
      padding: 0,
      paddingLeft: 4
    },
    imageIcon: {
      marginVertical: 42,
      width: 83,
      height: 83
    }
  })
}
