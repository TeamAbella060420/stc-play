import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, Pressable, Platform } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { getStyle } from '@fe-monorepo/themes';
import { styles } from './style';
import { TextFieldProps } from './types';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import Icon from '../Icon';
import colors from 'libs/themes/src/colors';
import images from '../../assets/images';
import Typography from '../../assets/typography';
import i18next from 'i18next';
import PasswordStrength from './passwordStrength';

const Textfield = forwardRef((props: TextFieldProps, ref) => {
  const {
    type,
    style,
    value,
    label,
    labelStyle,
    placeholder,
    subValue,
    otpLength,
    otpResendMessage,
    onPress,
    onInputChange,
    iconName,
    actionIconName,
    onIconPress,
    disabled,
    errorMessage,
    dropdown,
    keyboardType = 'default',
    secureTextEntry,
    hasIcon = false,
    textIconName,
    onEndEditing,
    checkPasswordStrength,
    editable
  } = props;
  const theme = useSelector((state: RootState) => state.app.themes);
  const isRTL = useSelector((state: RootState) => state.app.isRTL);
  const [focus, setFocus] = useState<boolean>(false);
  const [hasValue, setHasValue] = useState<boolean>(value === '' ? false : true);
  const [otp, setOTP] = useState<string>('');
  const inputRef = useRef<TextInput>();
  const otpInputRef = useRef([]);
  const animatedView = useSharedValue<string>(getStyle(theme).disabledColor);
  const animatedColorText = useSharedValue<string>(getStyle(theme).disabledColor);
  const animatedSizeText = useSharedValue<number>(styles().defaultLabel.fontSize);
  const animatedLocationText = useSharedValue<number>(0);
  const animatedShake = useSharedValue(0);
  const shakeAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withRepeat(withTiming(animatedShake.value * 2, { duration: 100 }), 5, true) }]
    };
  });
  const animatedViewStyle = useAnimatedStyle(() => {
    return { borderBottomColor: animatedView.value };
  });

  const animatedTextColor = useAnimatedStyle(() => {
    return { color: animatedColorText.value, fontSize: animatedSizeText.value, top: value.length > 0 ? 0 : animatedLocationText.value };
  });
  const animatedIcon = useAnimatedStyle(() => {
    return { top: animatedLocationText.value };
  });
  const animatedTextWithIconColor = useAnimatedStyle(() => {
    return { color: animatedColorText.value, fontSize: animatedSizeText.value };
  });
  const animatedIconColor = useAnimatedStyle(() => {
    return { tintColor: animatedColorText.value };
  });

  const handleLabelPress = () => {
    inputRef.current.focus();
  };

  const handleInputText = (text: string) => {
    setHasValue(text?.length > 0 ? true : false);
    onInputChange(text);
  };

  const handleOTPInputText = (text: string, index: number) => {
    const newOTP = otp.substring(0, index) + text + otp.substring(index + 1, otp.length);

    setOTP(newOTP);

    onInputChange(newOTP);
    setHasValue(newOTP[index]?.length > 0 ? true : false);

    //set focus on the correct field
    if (text.length > 0 && newOTP.length - 1 !== index && newOTP.length !== otpLength) {
      otpInputRef.current[newOTP.length].focus();
    } else {
      if (text.length > 0 && index + 1 !== otpLength) {
        otpInputRef.current[index + 1].focus();
      } else if (text.length < 1 && index !== 0) {
        otpInputRef.current[index - 1].focus();
      }
    }
  };

  useEffect(() => {
    const labelColor =
      focus || (hasValue !== false && errorMessage && errorMessage !== '') ? colors.sunset : getStyle(theme).secondaryColor;
    const labelSize = focus || hasValue || type === 'phone' ? styles().focusedLabel : styles().defaultLabel;
    const labelPosition = focus || hasValue || type === 'phone' ? 0 : labelSize.lineHeight * (Platform.OS === 'android' ? 1.5 : 1.75);
    const lineColor = disabled
      ? getStyle(theme).disabledColor
      : hasValue !== false && errorMessage && errorMessage !== ''
      ? colors.red
      : focus
      ? colors.sunset
      : getStyle(theme).disabledColor;

    animatedView.value = withTiming(lineColor, { duration: 250 });
    animatedSizeText.value = withTiming(labelSize.fontSize, { duration: 250 });
    animatedColorText.value = withTiming(labelColor, { duration: 250 });
    animatedLocationText.value = withTiming(labelPosition, { duration: 250 });
  }, [focus, setFocus, errorMessage, hasValue, disabled, type]);

  useEffect(() => {
    if (value?.length < 1) setHasValue(false);
  }, [value, errorMessage]);

  useEffect(() => {
    if (type === 'otp') otpInputRef.current[0].focus();
  }, []);

  useEffect(() => {
    if (errorMessage) {
      animatedShake.value = animatedShake.value === 0 ? 1 : 0;
    }
  }, [value, errorMessage, animatedShake]);

  if (type === 'otp') {
    return (
      <View style={[style, styles().columnContainer]}>
        <View style={[styles({ isRTL: isRTL }).container, styles().otpContainer]}>
          {Array(otpLength)
            .fill('')
            .map((_, index) => {
              const lineColor = errorMessage ? colors.red : otp[index] ? colors.sunset : getStyle(theme).disabledColor;

              return (
                <Animated.View key={index} style={[styles().container, styles({ lineColor: lineColor }).otpInputContainer, shakeAnimation]}>
                  <TextInput
                    ref={ref => (otpInputRef.current[index] = ref)}
                    style={[
                      Typography.hugeMobileMedium,
                      styles({ textColor: errorMessage ? colors.red : getStyle(theme).textColor }).otpInputText,
                      Platform.OS === 'android' ? { paddingVertical: 0 } : {}
                    ]}
                    value={value[index] || ''}
                    maxLength={1}
                    keyboardType={keyboardType}
                    cursorColor={getStyle(theme).primaryColor}
                    onChangeText={text => handleOTPInputText(text, index)}
                    onKeyPress={e => {
                      if (e.nativeEvent.key === 'Backspace') {
                        handleOTPInputText('', index);
                      }
                    }}
                    autoComplete="sms-otp" // android
                    textContentType="oneTimeCode" // ios
                    editable={editable}
                  />
                </Animated.View>
              );
            })}
        </View>
        {<Text style={styles({ isRTL }).otpError}>{errorMessage}</Text>}
        {otpResendMessage && otpResendMessage}
      </View>
    );
  }

  return (
    <View style={[style, styles().columnContainer]}>
      {!hasIcon && <Animated.Text style={[styles().label, labelStyle, animatedTextColor]}>{label}</Animated.Text>}

      {hasIcon && (
        <Animated.View style={[styles().containerTextWithIcon, animatedIcon]}>
          <Animated.Text style={[styles().labelWithIcon, labelStyle, animatedTextWithIconColor]}>{label}</Animated.Text>
          <Animated.Image style={[animatedIconColor, styles().textIcon]} source={images[textIconName]} resizeMode="contain" />
        </Animated.View>
      )}
      <View style={[styles({ isRTL: isRTL }).container]}>
        {type === 'phone' && (
          <Animated.View style={[styles().inputContainer, animatedViewStyle, styles().subContainer]}>
            <Text style={[styles().defaultLabel, styles({ textColor: getStyle(theme).textColor }).subValueText]}>{subValue} </Text>
            <View style={styles().subIcon}>
              <Icon name={'openregular'} width={24} height={24} fill={getStyle(theme).iconColor} />
            </View>
          </Animated.View>
        )}

        {type === 'phone' && <View style={styles().gap} />}

        <View onTouchEnd={() => {console.log('')}} style={styles().stretch}>
          <Animated.View style={[styles().inputContainer, animatedViewStyle, { justifyContent: 'space-between' }]}>
            <TextInput
              ref={ref}
              editable={disabled ? false : true}
              selectTextOnFocus={disabled ? false : true}
              style={[
                styles().defaultLabel,
                styles({ textColor: getStyle(theme).textColor }).inputText,
                Platform.OS === 'android' ? { paddingVertical: 0 } : {}
              ]}
              value={value}
              placeholder={focus ? placeholder : ''}
              placeholderTextColor={getStyle(theme).secondaryColor}
              cursorColor={getStyle(theme).primaryColor}
              textAlign={i18next.t('config_align')}
              onChangeText={text => handleInputText(text)}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              secureTextEntry={secureTextEntry !== undefined ? secureTextEntry : type === 'password' ? true : false}
              onEndEditing={onEndEditing}
            />
            {hasValue && type !== 'phone' && (
              <Pressable
                onPress={() => onIconPress()}
                style={[styles().inputTextIcon, Platform.OS === 'android' ? { paddingVertical: 0 } : {}]}
              >
                <Icon name={iconName} width={24} height={24} fill={getStyle(theme).iconColor} />
              </Pressable>
            )}
          </Animated.View>
        </View>
        {dropdown && dropdown}
      </View>
      {checkPasswordStrength && type === 'password' && (
        <PasswordStrength
          isVisible={((errorMessage === '' || errorMessage === undefined || errorMessage === null) && (hasValue || focus))}
          password={value}
          errorMessage={errorMessage}
        />
      )}
      {!checkPasswordStrength && errorMessage !== undefined && (
        <View>
          <Text style={[Typography.captionRegular, styles().errorMessage]}>{(errorMessage === '' || errorMessage === null) ? '' : errorMessage}</Text>
        </View>
      )}
    </View>
  );
});

export default Textfield;
