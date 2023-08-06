import React, { forwardRef, useEffect, useRef, useState } from "react";
import { View, Text, TextInput, Pressable, Platform, Image } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { getStyle } from "@fe-monorepo/themes";
import { styles } from './style';
import { TextFieldProps } from "./types";
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import Validator from "libs/helper/src/lib/validators";
import Icon from "../Icon";
import colors from "libs/themes/src/colors";
import images from '../../assets/images';
import i18next from "i18next";

const DefaultTextfield = forwardRef((props: TextFieldProps, ref ) => {
    const { type, style, value, label, labelStyle, placeholder, subValue, otpLength, otpResendMessage, onPress, onInputChange, iconName, actionIconName, onIconPress, disabled, errorMessage, dropdown, keyboardType= 'default', onEndEditing } = props;
    const theme = useSelector((state: RootState) => state.app.themes);
    const isRTL = false;
    const [focus, setFocus] = useState<boolean>(false);
    const [hasValue, setHasValue] = useState<boolean>(value?.length < 1 ? false : true);
    const inputRef = useRef<TextInput>();
    const animatedView = useSharedValue<string>(getStyle(theme).disabledColor);
    const animatedColorText = useSharedValue<string>(getStyle(theme).disabledColor);
    const animatedSizeText = useSharedValue<number>(styles().defaultLabel.fontSize);
    const animatedLocationText = useSharedValue<number>(0);

    const animatedViewStyle = useAnimatedStyle(() => { return { borderBottomColor: animatedView.value }; });


    const handleLabelPress = () => { inputRef.current.focus() }

    const handleInputText = (text: string) => {
        setHasValue(text?.length > 0 ? true : false);
        onInputChange(text);
    }


    useEffect(() =>
    {
        const labelColor = focus || (hasValue !== false && (errorMessage && errorMessage !== '')) ? colors.sunset : getStyle(theme).secondaryColor ;
        const labelSize = (focus || hasValue || type === 'phone') ? styles().focusedLabel : styles().defaultLabel;
        const labelPosition = (focus || hasValue || type === 'phone')  ? 0 : labelSize.lineHeight * (Platform.OS === 'android' ? 1.5 : 1.25);
        const lineColor = disabled ? getStyle(theme).disabledColor : (hasValue !== false && (errorMessage && errorMessage !== '')) ? colors.red : focus ? colors.sunset : getStyle(theme).disabledColor;
        
        animatedView.value = withTiming(lineColor, { duration: 250 });
        animatedSizeText.value = withTiming(labelSize.fontSize, { duration: 250 });
        animatedColorText.value = withTiming(labelColor, { duration: 250 });
        animatedLocationText.value = withTiming(labelPosition, { duration: 250 });
    },[focus, setFocus, errorMessage, hasValue, disabled, type])

    useEffect(() => { if(value?.length < 1) setHasValue(false);  },[value, errorMessage])


    return (
        <View ref={ref} style={[style]}>
            <View style={[styles({isRTL: isRTL}).container]}>
                { type === 'phone' && <View style={styles().gap} /> }    
                
                <View onTouchEnd={() => handleLabelPress()} style={styles().stretch}>
                    <Animated.View style={[styles().inputContainer, animatedViewStyle, {justifyContent: 'space-between'}]}>
                        <TextInput 
                            ref={inputRef}
                            editable={disabled ? false : true} 
                            selectTextOnFocus={disabled ? false : true}
                            style={[styles().defaultLabel, styles({textColor: getStyle(theme).textColor}).inputText, Platform.OS === 'android' ? {paddingVertical: 0,} : {},{alignItems: 'stretch'}]}
                            value={value}
                            placeholder={placeholder}
                            placeholderTextColor={getStyle(theme).secondaryColor}
                            cursorColor={getStyle(theme).primaryColor}
                            textAlign={i18next.t('config_align')}
                            onChangeText={(text) => handleInputText(text)}
                            onFocus={() => setFocus(true)}
                            onBlur={() => setFocus(false)}
                            keyboardType={keyboardType}
                            onEndEditing={() => onEndEditing ? onEndEditing() : {}}
                        />
                        {
                            (hasValue && type !== 'phone') &&
                            <Pressable onPress={() => onIconPress()} style={[styles().inputTextIcon, Platform.OS === 'android' ? {paddingVertical: 0,} : {}]}>
                                <Image style={[styles().iconLabelStyle]} source={images[iconName]}/> 
                            </Pressable>
                        }
                    </Animated.View>
                </View>
            </View>
        </View>
    )
})

export default DefaultTextfield;