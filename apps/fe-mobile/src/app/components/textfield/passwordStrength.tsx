import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useTranslation } from 'react-i18next';
import { colors } from "@fe-monorepo/themes";
import Animated from "react-native-reanimated";
import { getPasswordStrength } from "@fe-monorepo/helper";
import Typography from "../../assets/typography";

const PasswordStrength = (props) => {
    const { password, isVisible, errorMessage } = props;    
    const { t } = useTranslation();
    const [color, setColor] = useState(colors.black10);
    const [passwordStrengthLevel, setPasswordStrengthLevel] = useState(-1);

    const passwordStrengthLevels = [
        {title: t('password_hint_weak_title'), detail: t('password_hint_weak_detail'), color: colors.red, level: 'Too Weak'},
        {title: t('password_hint_okay_title'), detail: t('password_hint_okay_detail'), color: colors.sunset, level: 'Okay'},
        {title: t('password_hint_better_title'), detail: t('password_hint_better_detail'), color: colors.greenA, level: 'Better'},
        {title: t('password_hint_perfect_title'), color: colors.green, level: 'Perfect'},
    ]

    const setPasswordLevels = (index: number) => {
        setPasswordStrengthLevel(index)
        setColor(index === -1 ? colors.black10 : passwordStrengthLevels[index].color)
    }

    useEffect(() => setPasswordLevels(getPasswordStrength(password)), [password])
    
    return (
        <View style={{marginBottom: 8}}>
            {
                errorMessage
                ?
                    <Text style={{...Typography.captionRegular, position: 'absolute', top: 0, textAlign: t('config_align'), paddingVertical: 4, color: colors.red}}>{errorMessage}</Text>
                :
                    null
            }
            <View style={{flexDirection: t('config_row'), gap: 2, paddingVertical: 8}}>
                {
                    passwordStrengthLevels.map((item, index) => {                        
                        return (
                            <View key={index+item?.level} style={{flex: 1, backgroundColor: isVisible ? colors.black10 : undefined, height: 4}} >
                                <Animated.View style={[{flex: 1, backgroundColor: isVisible && passwordStrengthLevel >= index ? color : undefined, height: 4}]}/>
                            </View>
                        )
                    })
                }
            </View>
            <Text style={{...Typography.captionRegular, textAlign: t('config_align')}}>
                <Text style={{color: color}}>{isVisible && passwordStrengthLevel !== -1 && passwordStrengthLevels[passwordStrengthLevel].title && passwordStrengthLevels[passwordStrengthLevel].title}</Text>
                <Text> </Text>
                <Text>{isVisible && passwordStrengthLevel !== -1 && passwordStrengthLevels[passwordStrengthLevel].detail && passwordStrengthLevels[passwordStrengthLevel].detail}</Text>
            </Text>
        </View>
    )
}

export default PasswordStrength;