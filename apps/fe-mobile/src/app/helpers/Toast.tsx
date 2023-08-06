import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { colors } from '@fe-monorepo/themes';
import { translate } from '@fe-monorepo/helper';
import Icon from '../components/Icon';
import { StyledText } from '../components/text';
import Typography from '../assets/typography';
import Toast, { ToastShowParams } from 'react-native-toast-message'

export const presentToast = ({
    type = 'success',
    message = '',
    position = "top",
    showBorder = false
}) => {    
    Toast.show(
    {
        type: type,
        position: position,
        text1: message,
        visibilityTime: 5000,
        autoHide: true,
        topOffset: 64,
        bottomOffset: 64,
        props: {showBorder: showBorder},
        onShow: () =>
        {
            // onShow Event..
        },
        onHide: () =>
        {
            // onHide Event..
        },
        onPress: () =>
        {
            // onPress Event..
        },
    });
};

export const toastConfig = {
    success: (params: ToastShowParams) => (
        <View style={styles().container}>
            <View style={[styles(params?.props?.showBorder).toast, styles().success]}>
                <Icon name="success" width={16} height={16} fill={colors.green} />
                <StyledText textStyle={{...Typography.bodySmallRegular, color: colors.black100}} >{params.text1}</StyledText>
            </View>
        </View>
    ),

    warning: (params: ToastShowParams) => (
        <View style={styles().container}>
            <View style={[styles(params?.props?.showBorder).toast, styles().warning]}>
                <Icon name="alert" width={16} height={16} fill={colors.yellow}/>
                <StyledText textStyle={{...Typography.bodySmallRegular, color: colors.black100}} >{params.text1}</StyledText>
            </View>
        </View>
    ),

    error: (params: ToastShowParams) => (
        <View style={styles().container}>
            <View style={[styles(params?.props?.showBorder).toast, styles().error]}>
                <Icon name="error" width={16} height={16}fill={colors.red} />
                <StyledText textStyle={{...Typography.bodySmallRegular, color: colors.black100}} >{params.text1}</StyledText>
            </View>
        </View>
    )
};

const styles = (showBorder = false) => StyleSheet.create({
    container:
    {
        width: '100%', 
        paddingHorizontal: 20
    },
    toast: {
        flexDirection: translate('config_row'),
        borderBottomWidth: showBorder ? 2 : 0,
        width: '100%',
        padding: 10,
        gap: 9,
        borderRadius: 2,
    },
    success: {
        backgroundColor: colors.greenC,
        borderBottomColor: colors.green,
    },
    warning: {
        backgroundColor: colors.yellowA,
        borderBottomColor: colors.yellow,  
    },
    error: {
        backgroundColor: colors.redC,
        borderBottomColor: colors.red,
    }
})