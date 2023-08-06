import React, { useState, useEffect } from 'react'
import { View, GestureResponderEvent, StyleSheet, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import Button from '../../../components/buttons'
import Textfield from '../../../components/textfield';
import Icon from '../../../components/Icon';
import Link from '../../../components/link';
import Typography from '../../../assets/typography';
import { Validator } from '@fe-monorepo/helper';

export interface ResetPasswordFormProps {
  onPressCallBack?: (password?: string) => void,
}

export const ResetPasswordForm = ( props: ResetPasswordFormProps) => {
    const theme = useSelector((state: RootState) => state.app.themes);
    const { onPressCallBack } = props;

    const { t } = useTranslation()

    const [password, setPassword] = useState<string>('');
    const [passwordVisiable, setPasswordVisiability] = useState<boolean>(false);

    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [confirmPasswordVisiable, setConfirmPasswordVisiability] = useState<boolean>(false);
    const [error, setError] = useState<string>(null);

    const [isButtonEnable, setButtonEnable] = useState<boolean>(false);

    const styles = createStyles(t);

    const saveNewPassword = () => {

        if(password !== confirmPassword) {
            setError(t('validation_passwords_dont_match'))
        } else {
            onPressCallBack(password)
        }
    }

    const onPasswordSet = () => {
        if(password !== '' && confirmPassword !== '' && password !== confirmPassword) {
            setError(t('validation_passwords_dont_match'))
        }
    }

    const onConfirmPasswordInputChange = (text) => {
        setConfirmPassword(text)
        if(password === text) {
            setError('')
        }
    }

    const onPasswordIconPress = () => {
        setPasswordVisiability(!passwordVisiable)
    }

    const onConfirmPasswordIconPress = () => {
        setConfirmPasswordVisiability(!confirmPasswordVisiable)
    }

    useEffect(() => {
        const validPassword = password !== '' && Validator.isValidPasswordMinLength(password)
        setButtonEnable(( validPassword && confirmPassword !== '' && password === confirmPassword) ? true : false) 
    },[password, confirmPassword])

    return (
        <View style={styles.container}> 
            <Textfield
                checkPasswordStrength
                type={"password"}
                label={t('formAttribute_password')}
                iconName={passwordVisiable ? 'eyeslash' : 'eye'}
                secureTextEntry={!passwordVisiable}
                value={password}
                onInputChange={(text) => { setPassword(text)}}
                onIconPress={() => onPasswordIconPress()}
                onEndEditing={() => onPasswordSet()}
            />
            <Textfield
                type={"password"}
                label={t('formAttribute_confirm_password')}
                iconName={confirmPasswordVisiable ? 'eyeslash' : 'eye'}
                secureTextEntry={!confirmPasswordVisiable}
                value={confirmPassword}
                onInputChange={(text) => {onConfirmPasswordInputChange(text) }}
                onIconPress={() => onConfirmPasswordIconPress()}
                errorMessage={error}
                onEndEditing={() => onPasswordSet()}
            />
            <Button
                style={[styles.button, { borderWidth: 0 }]}
                label={t('common_continue')}
                disabled={!isButtonEnable}
                type={isButtonEnable ? 'primary' : null}
                onPress={() => saveNewPassword()}
            />
        </View>    
    );
};

const createStyles = (
        t: any
    ) => {
    return StyleSheet.create({
    container: {
        marginTop: 20
    },
    button: {
        marginTop: 20,
        direction: t('config_dir')
    },
    })
}
