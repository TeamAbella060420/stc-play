import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import { NAV_ROUTES } from '../../../helpers/navRoutes';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/RootNavigation';
import { translate } from '@fe-monorepo/helper';
import StandardHeader from '../../../components/headers/standard_header';
import ViewContainer from '../../../components/view_container';
import { colors } from '@fe-monorepo/themes';
import { StyledText } from '../../../components/text';
import Typography from '../../../assets/typography';
import { t } from 'i18next';
import Textfield from '../../../components/textfield';
import Button from '../../../components/buttons';
import { useAccount, useCountdown } from '@fe-monorepo/hooks';
import { AccountModel, LockDurationModel } from '@fe-monorepo/models';
import { presentToast } from '../../../helpers/Toast';
import moment from 'moment';

const ChangePasswordScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, NAV_ROUTES.Support>>();
    const { userContext } = useSelector((state: RootState) => state.user);
    const textfieldRef = useRef<TextInput>();
    const { getAccessLockDuration, updateAccountPassword, isAccountPasswordValid, isUpdatedpassword, isSuccessful, isValidAccount, errorCode, errorMessage, lockDuration} = useAccount();

    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [currentPasswordVisiable, setCurrentPasswordVisiable] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [passwordVisiable, setPasswordVisiable] = useState<boolean>(false);
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [confirmPasswordVisiable, setConfirmPasswordVisiable] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isButtonEnable, setButtonEnable] = useState<boolean>(false);
    const [changePasswordLocked, setChangePasswordLock] = useState<boolean>(true);
    const { formattedTime, setNewTime } = useCountdown(0);

    const onConfirmPasswordInputChange = (text) => {
        setConfirmPassword(text)
        if(password === text) {
            setError('')
        }
    }

    const onOldPasswordSet = () => {
        isAccountPasswordValid({password: currentPassword} as AccountModel)
    }

    const onNewPasswordSet = () => {
        if(password !== '' && confirmPassword !== '' && password !== confirmPassword) {
            setError(t('validation_passwords_dont_match'));
            setButtonEnable(false)
        } else if(currentPassword !== '' && password !== '' && confirmPassword !== '' && password === confirmPassword) {
            setButtonEnable(true)
        }
    }

    const updatePassword = () => {
        if(password !== confirmPassword) {
            setError(t('validation_passwords_dont_match'));
            setButtonEnable(false)
        } else {
            updateAccountPassword({
                old_password: currentPassword,
                new_password: password
            } as AccountModel)
        }
    }

    useEffect(() => {
        if(currentPassword !== '' && password !== '' && confirmPassword !== '' && password === confirmPassword) {
            setButtonEnable(true)
        } else {
            setButtonEnable(false)
        }
    }, [password, confirmPassword, currentPassword])

    useEffect(() => {
        if(errorCode || errorMessage){
            if(['2004'].includes(errorCode)) setPasswordError(t('validation_current_password_incorrect'));
        }
    }, [errorCode, errorMessage])

    useEffect(() => {
        if(isUpdatedpassword === true){
            textfieldRef.current.blur();
            setCurrentPassword('');
            setPassword('');
            setConfirmPassword('');
            presentToast({type: 'success', message: t('msg_success_password_change')})
        }
    }, [isUpdatedpassword])

    useEffect(() => {
        if(lockDuration && lockDuration > 0) {
            setNewTime(lockDuration)
        } else if (changePasswordLocked === true && lockDuration < 1) {
            setChangePasswordLock(false)
        }
    }, [lockDuration, isSuccessful])

    useEffect(() => {
        getAccessLockDuration({
            type: 'reset_password',
        } as LockDurationModel)
    }, [])

    const renderTimer = () => {
        return (
            <View style={{paddingVertical: 24}}>
                <StyledText textStyle={Typography.bodyRegular} textColour={colors.black70} textAlign={translate('config_align')} >{t('settings_change_again', {timer: formattedTime})}</StyledText>
            </View>
        )
      };

    return (
        <ViewContainer style={styles.container}>
            <StandardHeader 
                onBackPress={() => navigation.goBack()} 
                label={translate('common_password_capital')}
            />
            <View style={styles.subContainer}>
                <View style={{paddingVertical: 24}}>
                    <StyledText textStyle={Typography.bodyRegular} textColour={colors.black70} textAlign={translate('config_align')} >{translate('common_cannot_change_password')}</StyledText>
                </View>
                {
                    lockDuration && lockDuration > 0 && changePasswordLocked
                    ?
                        renderTimer()
                    :
                        <View>
                            <Textfield
                                ref={textfieldRef}
                                type={"password"}
                                label={t('formAttribute_current_password')}
                                iconName={currentPasswordVisiable ? 'eyeslash' : 'eye'}
                                secureTextEntry={!currentPasswordVisiable}
                                value={currentPassword}
                                onInputChange={(text) => { setPasswordError(''); setCurrentPassword(text)}}
                                onIconPress={() => setCurrentPasswordVisiable(!currentPasswordVisiable)}
                                errorMessage={passwordError}
                                onEndEditing={() => onOldPasswordSet()}
                            />
                            <View style={{paddingBottom: 16}}>
                                <StyledText textStyle={Typography.captionRegular} textColour={colors.black50} textAlign={translate('config_align')} >{ userContext.password_updated_at ? t('settings_password_last_changed', {timestamp: moment(userContext.password_updated_at).format("DD MMMM YYYY")}) : null}</StyledText>
                            </View>
                            <Textfield
                                ref={textfieldRef}
                                checkPasswordStrength
                                type={"password"}
                                label={t('formAttribute_new_password')}
                                iconName={passwordVisiable ? 'eyeslash' : 'eye'}
                                secureTextEntry={!passwordVisiable}
                                value={password}
                                onInputChange={(text) => { setPassword(text)}}
                                onIconPress={() => setPasswordVisiable(!passwordVisiable)}
                                onEndEditing={() => onNewPasswordSet()}
                            />
                            <Textfield
                                ref={textfieldRef}
                                type={"password"}
                                label={t('formAttribute_confirm_password')}
                                iconName={confirmPasswordVisiable ? 'eyeslash' : 'eye'}
                                secureTextEntry={!confirmPasswordVisiable}
                                value={confirmPassword}
                                onInputChange={(text) => {onConfirmPasswordInputChange(text) }}
                                onIconPress={() => setConfirmPasswordVisiable(!confirmPasswordVisiable)}
                                errorMessage={error}
                                onEndEditing={() => onNewPasswordSet()}
                            />
                        </View>
                }
            </View>
            {
                isButtonEnable &&
                <Button
                    style={[styles.button, { borderWidth: 0 }]}
                    label={t('action_change')}
                    disabled={!isButtonEnable}
                    type={isButtonEnable ? 'primary' : null}
                    onPress={() => updatePassword()}
                />
            }
        </ViewContainer>
    );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
    container: { marginBottom: 0, paddingHorizontal: 0 },
    subContainer: { paddingHorizontal: 20 },
    button: { position: 'absolute', right: 20, left: 20, bottom: 50, paddingHorizontal: 20 }
  });