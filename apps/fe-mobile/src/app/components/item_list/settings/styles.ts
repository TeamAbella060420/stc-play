import { colors } from '@fe-monorepo/themes';
import { StyleSheet } from 'react-native';

export const createStyle = (t: any) => StyleSheet.create({
    container: {
        flexDirection: t('config_row'),
        gap: 8,
        paddingVertical: 12,
        justifyContent: 'space-between',
        width: '100%',
    },
    leftContainer: {
        flexDirection: t('config_row'),
        justifyContent: t('config_flex'),
        alignItems: 'center',
        gap: 10,
    },
    labelsContainer: {
        flexDirection: 'column',
        justifyContent: t('config_flex'),
        gap: 8,
    },
    rightContainer: {
        flexDirection: t('config_row'),
        alignItems: 'center',
        gap: 13,
    },
    imgStyle: { 
        width: 40, 
        height: 40, 
        borderRadius: 50,
        borderWidth: 0.5,
        borderColor: colors.purple,
    },
    arrowStyle: {

    }
});
