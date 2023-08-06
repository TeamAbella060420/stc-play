import React, { useState, useEffect } from 'react'
import { View, GestureResponderEvent, StyleSheet, Pressable, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { getStyle } from '@fe-monorepo/themes';
import { Easing, runOnJS, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { StyledText } from '../../../components/text';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import Button from '../../../components/buttons'
import Textfield from '../../../components/textfield';
import Icon from '../../../components/Icon';
import Link from '../../../components/link';
import Typography from '../../../assets/typography';
import { AnimatedText } from '../../../components/animated_text';
import { formatMinutes } from '@fe-monorepo/helper';


export interface PasswordFormProps {
  onPressCallBack?: (password?: string, saveCredentials?: boolean, event?: GestureResponderEvent) => void,
  errorMessage?: string,
  exceededPasswordAttempt?: boolean  
  resetPasswordAttempts?: () => void,
  onForgotPassword?: () => void,
}

export const PasswordForm = ( props: PasswordFormProps) => {
    const theme = useSelector((state: RootState) => state.app.themes);
    const { onPressCallBack, errorMessage, exceededPasswordAttempt, resetPasswordAttempts, onForgotPassword } = props;
    const { t } = useTranslation()
    const [isMatch, setMatchStatus] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isButtonEnable, setButtonEnable] = useState<boolean>(false);
    const [isPasswordEnable, setPasswordEnable] = useState<boolean>(true);
    const [saveCredentials, setCredentials] = useState<boolean>(false);
    const [passwordVisiable, setPasswordVisiability] = useState<boolean>(false);
    const [error, setError] = useState<string>(null);
    const styles = createStyles(t)
    const RefreshSeconds = 60;
    const timerInMin = 15;
    const animatedValue = useSharedValue(timerInMin * 100);
    const RefreshMilliseconds = RefreshSeconds * timerInMin * 1000;
    
    useEffect(() =>
    {
        if(password.length > 2) {
            setButtonEnable(true)
        } else {
            setButtonEnable(false)
        }
    },[password])

    useEffect(() =>
    {        
        if(exceededPasswordAttempt) {
            startTimer();
            setPasswordEnable(false)
        }
    },[exceededPasswordAttempt])

    const validateAccount = () => {
       onPressCallBack(password, saveCredentials)
    }

    const saveUserCredentials = () => {
        setCredentials(!saveCredentials)
    }

    const onIconPress = () => {
        setPasswordVisiability(!passwordVisiable)
    } 

    const animatedCountdownText = useDerivedValue(() => {
        'worklet';
        
        const time = Math.floor((RefreshSeconds * animatedValue.value) / 100) + 1;
        return formatMinutes(time);
    });

    const startTimer = () => {
        animatedValue.value = timerInMin * 100;
        animatedValue.value = withTiming(
            0,
            {
                duration: RefreshMilliseconds,
                easing: Easing.linear
            },
            finished => runOnJS(animatedFinished)(finished)
        );
    };

    const animatedFinished = (finished: boolean) => {
        if (finished) { 
            setPasswordEnable(true)
            resetPasswordAttempts(); 
        }
    };    

    return (
        <View style={styles.container}> 
            <Textfield
                type={passwordVisiable ? 'default' : "password"}
                label={t('formAttribute_password')}
                iconName={passwordVisiable ? 'eyeslash' : 'eye'}
                secureTextEntry={!passwordVisiable}
                disabled={!isPasswordEnable}
                value={password}
                onInputChange={(text) => { setError(isMatch); setPassword(text)}}
                onIconPress={() => onIconPress()}
                errorMessage={errorMessage || error}
            />
            {
                exceededPasswordAttempt
                ?
                    <View style={styles.timer}>
                        <StyledText textStyle={Typography.bodyRegular}>{t('common_otp_resend_in')}</StyledText>
                        <AnimatedText textStyle={Typography.bodyMedium} type="primary" text={animatedCountdownText} style={styles.timerValue} />
                    </View>
                :
                    <>
                        <View style={styles.passwordOptionsContainer}>
                            <View style={styles.passwordForgottenContainer}>
                                <Pressable onPress={() => saveUserCredentials()}>
                                    <Icon name={saveCredentials ? "check" : "unchecked"} width={18} height={18} fill={getStyle(theme).iconColor} stroke={getStyle(theme).iconColor} />
                                </Pressable>
                                <StyledText textStyle={Typography.bodyRegular} textAlign={'center'} type='primary'>{t('formAttribute_remember_password')}</StyledText>
                            </View>
                            <View>
                                <Link label={t('common_forgot_password')} type='primary' onPress={()=>{onForgotPassword()}}/>
                            </View>
                        </View>
                        <Button style={styles.button} label={t('common_continue')} disabled={!isButtonEnable}  type={'primary'} onPress={()=>validateAccount()}/>
                    </>
            }
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
    passwordOptionsContainer: {
        marginTop: 30,
        marginBottom: 32,
        flexDirection: t('config_row'),
        justifyContent: 'space-between'
    },
    passwordForgottenContainer: {
        flexDirection: t('config_row'),
        alignItems: 'center',
        gap: 8
    },
    timer: {
        marginVertical: 40,
        flexDirection: t('config_row'),
        alignItems: t('config_flex'),
        alignContent: 'center'
    },
    timerValue: {
        padding: 0,
        marginHorizontal: 4,
        marginTop: -1,
        lineHeight: Platform.OS === 'ios' ? 0 : 24
    },
    })
}
