import spacing from 'libs/themes/src/spacing';
import { StyleSheet } from 'react-native';
import Typography from '../../assets/typography';

export const styles = (props?: any) => StyleSheet.create({
    overlayContainer: {
        position: 'absolute',
        height: props?.height ?? 200,
        width:  props?.width ?? '100%',
        top: props?.top ?? 0,
        borderRadius: 2,
        marginTop: props?.offset ?? 0,
        shadowColor: 'grey',
        shadowOpacity:1,
        zIndex: 1000,
    }
})