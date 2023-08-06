import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View, GestureResponderEvent, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import { getStyle } from '@fe-monorepo/themes';
import { StyledText } from '../../../components/text';
import Typography from '../../../assets/typography';
import Button from '../../../components/buttons';
import Link from '../../../components/link';

export interface HeaderProps {
  title: string;
  subtitle?: string;
  subTitleLink?: string;
  children?: ReactNode;
  hasBackButton?: boolean;
  onPress?: (event?: GestureResponderEvent) => void;
  onPressLink?: (event?: GestureResponderEvent) => void;
}

export const Header = (props: HeaderProps) => {
  const { title, subtitle, subTitleLink, children, onPress, hasBackButton = true, onPressLink } = props;
  const theme = useSelector((state: RootState) => state.app.themes);
  const { t } = useTranslation();
  const styles = createStyles(t);

  return (
    <View style={styles.container}>
      <View style={[styles.backButtonContainer, { marginTop: hasBackButton ? 8 : 50 }]}>
        {hasBackButton && (
          <Button
            type="borderPrimary"
            iconNewStyle={styles.backButtonImage}
            style={styles.backButton}
            btnContent="iconOnly"
            iconName={t('config_dir') === 'ltr' ? 'icon_arrow_left' : 'icon_arrow_right'}
            onPress={onPress}
          />
        )}
      </View>
      <View style={{ width: '100%' }}>
        <StyledText
          textStyle={{ ...Typography.bigTitleMobileMedium, width: '100%'}}
          textColour={getStyle(theme).textColor}
          textAlign={t('config_align')}
          lineHeight={Typography.bigTitleMobileMedium.lineHeight * 1.25}
        >
          {title}
        </StyledText>
        {(subtitle || subTitleLink) && (
          <View style={styles.subTitleContainer}>
            <StyledText textStyle={Typography.bodyRegular} type="subtitle" textAlign={t('config_align')} lineHeight={24}>
              {subtitle}
            </StyledText>
            <Text> </Text>
            <Link label={subTitleLink} type="primary" onPress={onPressLink} />
          </View>
        )}
      </View>
      <View>{children}</View>
    </View>
  );
};

const createStyles = (t: any) => {
  console.log('dir', t('config_dir'));
  console.log('flex', t('config_flex'));

  return StyleSheet.create({
    container: {
      paddingVertical: 8,
      alignItems: t('config_flex')
    },
    subTitleContainer: {
      alignItems: t('config_flex'),
      flexDirection: t('config_row'),
      marginTop: 18,
    },
    backButtonContainer: {
      marginBottom: 33.33
    },
    backButton: {
      borderWidth: 0,
      padding: 0
    },
    backButtonImage: {
      width: 24,
      height: 24
    }
  });
};
