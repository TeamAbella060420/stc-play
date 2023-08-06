import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NAV_ROUTES } from '../../helpers/navRoutes';
import { useAccount } from '@fe-monorepo/hooks';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootNavigation';
import { StyledSafeView } from '../../components/safe_view';
import { StyledContainer } from '../../components/container';
import { Header } from './component/header.component';
import { AccountModel, UserModel } from '@fe-monorepo/models';
import { RootState, setUser, useAppDispatch } from '@fe-monorepo/store';
import Textfield from '../../components/textfield';
import Button from '../../components/buttons';
import { View, StyleSheet } from 'react-native';
import { CHANNEL, LOGIN_TYPES, OTP_TYPES_SCREENS } from '@fe-monorepo/helper';
import { useFormValidation } from '../../hooks/useFormValidation';
import { RouteProp } from '@react-navigation/native';
import { useSelector } from 'react-redux';

type AdditionalInputNavProp = StackNavigationProp<RootStackParamList, NAV_ROUTES.AdditionalInput>;
export type AdditionalInputRouteProp = RouteProp<RootStackParamList, NAV_ROUTES.AdditionalInput>;

export interface AdditionalInputProps {
  route: AdditionalInputRouteProp;
  navigation: AdditionalInputNavProp;
}

export interface AdditionalInputData {
  provider?: LOGIN_TYPES;
}

export const AdditionalInputScreen = ({ route, navigation }: AdditionalInputProps) => {
  const { provider } = route.params;
  const { t } = useTranslation();
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [isButtonEnable, setButtonEnable] = useState<boolean>(false);
  const { userContext } = useSelector((state: RootState) => state.user);
  const styles = createStyles(t);
  const { validateEmail, validateUsername, validateEmailTyping, validateUsernameTyping, errorEmail, errorUsername } = useFormValidation();
  const { getUserProfile, updateUsernameAndEmail, isUpdatedAccount } = useAccount();
  const dispatch = useAppDispatch();
  const isEmailVisible = [LOGIN_TYPES.TWITTER, LOGIN_TYPES.FACE_BOOK].includes(provider);

  const onPressBackButton = () => {
    navigation.navigate(NAV_ROUTES.SignUp);
  };

  const updateProfile = () => {
    updateUsernameAndEmail({
      email: email,
      username: username
    } as AccountModel);
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  useEffect(() => {
    if (userContext) {
      if (isEmailVisible) {
        if (userContext.email) {
          setEmail(userContext.email);
        } else {
          setEmail('');
        }
      }
    }
  }, [userContext]);

  useEffect(() => {
    if (isUpdatedAccount) {
      dispatch(
        setUser({
          username: username,
          email: email
        } as UserModel)
      );
      if (isEmailVisible) {
        navigation.navigate(NAV_ROUTES.Otp, { email: email, type: OTP_TYPES_SCREENS.SIGN_UP_EMAIL_OTP, channel: CHANNEL.EMAIL });
      } else {
        navigation.navigate(NAV_ROUTES.Success);
      }
    }
  }, [isUpdatedAccount]);

  useEffect(() => {
    if (isEmailVisible) {
      if (errorEmail === '' && errorUsername === '' && username !== '' && email !== '') {
        setButtonEnable(true);
      } else {
        setButtonEnable(false);
      }
    } else if (errorUsername === '' && username !== '') {
      setButtonEnable(true);
    } else {
      setButtonEnable(false);
    }
  }, [username, email, errorEmail, errorUsername]);

  const eventValidateEmail = () => {
    if (provider === LOGIN_TYPES.TWITTER) {
      validateEmail(email, NAV_ROUTES.AdditionalInput, userContext.email);
    } else {
      validateEmail(email, NAV_ROUTES.AdditionalInput);
    }
  };

  const eventWhenTyping = (value: string) => {
    setEmail(value);
    validateEmailTyping(value, NAV_ROUTES.AdditionalInput);
  };

  const eventUsernameTyping = (value: string) => {
    setUsername(value);
    validateUsernameTyping(value, NAV_ROUTES.AdditionalInput);
  };

  const eventVaidateUsername = () => {
    validateUsername(username, NAV_ROUTES.AdditionalInput);
  };

  return (
    <StyledSafeView>
      <StyledContainer type="scrollview">
        <Header
          title={isEmailVisible ? t('common_almost_done') : t('common_create_username')}
          subtitle={isEmailVisible ? t('common_almost_created') : t('common_almost_created_enter_username')}
          onPress={onPressBackButton}
        />

        <View style={styles.container}>
          {isEmailVisible && (
            <Textfield
              type="email"
              label={t('formAttribute_email')}
              iconName={'closeRegular'}
              value={email}
              onInputChange={text => {
                eventWhenTyping(text);
              }}
              onIconPress={() => {
                setEmail('');
              }}
              errorMessage={email === '' ? '' : errorEmail}
              onEndEditing={eventValidateEmail}
            />
          )}
          <Textfield
            type="default"
            label={t('formAttribute_username')}
            iconName={'closeRegular'}
            value={username}
            onInputChange={text => {
              eventUsernameTyping(text);
            }}
            onIconPress={() => {
              setUsername('');
            }}
            errorMessage={username === '' ? '' : errorUsername}
            onEndEditing={eventVaidateUsername}
          />

          <Button
            style={[styles.button]}
            label={t('common_continue')}
            disabled={!isButtonEnable}
            type={isButtonEnable ? 'primary' : null}
            onPress={() => updateProfile()}
          />
        </View>
      </StyledContainer>
    </StyledSafeView>
  );
};

const createStyles = (t: any) => {
  return StyleSheet.create({
    container: {
      marginTop: 46
    },
    button: {
      marginTop: 40,
      direction: t('config_dir')
    }
  });
};
