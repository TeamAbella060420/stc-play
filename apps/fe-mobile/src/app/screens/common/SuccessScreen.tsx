import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { StyledText } from '../../components/text';
import Typography from '../../assets/typography';
import { StyledSafeView } from '../../components/safe_view';
import { StyledContainer } from '../../components/container';
import { NAV_ROUTES } from '../../helpers/navRoutes';
import { colors, spacing } from '@fe-monorepo/themes';
import fonts from 'libs/assets/src/fonts';
import { CommonActions, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootNavigation';
import Icon from '../../components/Icon';
import Button from '../../components/buttons';

export interface SuccessData {
  type?: string;
}

export type SuccessRouteProp = RouteProp<RootStackParamList, NAV_ROUTES.Success>;

type SuccessNavProps = StackNavigationProp<RootStackParamList, NAV_ROUTES.Success>;

export interface SuccessProps {
  route: SuccessRouteProp;
  navigation: SuccessNavProps;
}

export const SuccessScreen = ({ route, navigation }) => {
  const type = route?.params?.type ?? '';
  const isNewPasswordSuccess = type === 'forgotPassword';
  const enableTimer = type !== 'forgotPassword';
  const { t } = useTranslation();
  const viewAlignment = isNewPasswordSuccess ? t('config_flex') : 'center';
  const textAlignment = isNewPasswordSuccess ? t('config_align') : 'center';
  const styles = createStyles(t, viewAlignment, textAlignment);
  const [countdownTimer, setcountdownTimer] = useState(5);

  useEffect(() => {
    let timer;
    if (enableTimer) {
      if (countdownTimer > 0) {
        timer = setInterval(() => {
          setcountdownTimer(prevState => prevState - 1);
        }, 1000);
      } else {
        navigation.navigate(NAV_ROUTES.Questionnaire);
        clearInterval(timer);
      }
    }

    return () => {
      clearInterval(timer);
    };
  }, [countdownTimer]);

  const onPress = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: NAV_ROUTES.SignIn }]
      })
    );
  };

  return (
    <StyledSafeView>
      <StyledContainer>
        <View style={styles.Container}>
          <Icon name="taskSuccess" width={82} height={82} style={styles.imageStyle} />
          <StyledText textStyle={{ ...Typography.bigTitleMobileMedium }} lineHeight={42} textAlign={textAlignment}>
            {isNewPasswordSuccess ? t('password_success_screen') : t('success_screen')}
          </StyledText>
          <View style={styles.timerContainer}>
            <StyledText textStyle={styles.journeyStarts} type="disabled" lineHeight={spacing[24]} textAlign={textAlignment}>
              {isNewPasswordSuccess ? t('password_updated_success_screen') : <Text>{t('your_journey_starts')}...</Text>}
            </StyledText>
          </View>
          {enableTimer && (
            <Text style={[{ ...Typography.bigTitleWebMedium, color: colors.sunset, ...styles.centerText }, styles.timerValue]}>
              {countdownTimer}
            </Text>
          )}
          {isNewPasswordSuccess && <Button style={styles.btnStyle} onPress={() => onPress()} type="primary" label={t('action_signin')} />}
        </View>
      </StyledContainer>
    </StyledSafeView>
  );
};

const createStyles = (t: any, viewAlignment: string, textAlignment: string) => {
  return StyleSheet.create({
    Container: {
      alignItems: viewAlignment,
      flex: 1,
      marginHorizontal: 0,
      marginTop: 133
    },
    timerContainer: {
      alignItems: viewAlignment,
      marginTop: 16,
      flexDirection: t('config_row')
    },
    timerValue: {
      padding: 0,
      paddingHorizontal: 4
    },
    imageIcon: {
      marginVertical: 42,
      width: 83,
      height: 83
    },
    centerText: {
      textAlign: textAlignment,
      margin: Platform.OS === 'ios' ? 4 : 0,
      lineHeight: undefined,
      marginTop: 62
    },
    journeyStarts: {
      fontFamily: fonts.STCForward,
      fontWeight: '400',
      fontSize: spacing[18]
    },
    btnStyle: { marginTop: spacing[40], width: '100%' },
    imageStyle: { marginBottom: spacing[40] }
  });
};
