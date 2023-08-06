import { Text, TextStyle, View, Modal } from 'react-native';
import React, { memo, useCallback, useState } from 'react';
import ViewContainer from '../../components/view_container';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import StandardHeader from '../../components/headers/standard_header';
import { colors, getStyle } from '@fe-monorepo/themes';
import Button from '../../components/buttons';
import { replaceStringsFromJson, translate } from '@fe-monorepo/helper';
import styles from './styles';
import { networkErrorComponentProps } from './types';
import { useFocusEffect } from '@react-navigation/core';

const NetworkError = (props: networkErrorComponentProps) => {
  const { isVisible, hastimer, timer, buttonLabel, title, subtitle, subtitle2, linkText, onLinkPress, closeModal, onRefresh } = props;
  const { themes, isRTL } = useSelector((state: RootState) => state.app);
  const [countdownTimer, setCountdownTimer] = useState(timer || 30);
  const textAlign: TextStyle = { textAlign: isRTL ? 'right' : 'left' };

  useFocusEffect(
    useCallback(() => {
      let counter;
      if (isVisible) {
        if (hastimer && countdownTimer > 0) {
          counter = setInterval(() => {
            setCountdownTimer(countdownTimer - 1);
          }, 1000);
        } else if (countdownTimer < 1) {
          onRefresh();
        }
      } else {
        setCountdownTimer(timer || 30);
        clearInterval(counter);
      }
      return () => {
        clearInterval(counter);
      };
    }, [isVisible, countdownTimer])
  );

  return (
    <Modal visible={isVisible} animationType="fade" onRequestClose={closeModal}>
      <ViewContainer style={styles.container}>
        <StandardHeader style={styles.headerStyle} onBackPress={closeModal} />
        <View style={styles.bodyContainer}>
          <Text style={[styles.title, textAlign, { color: getStyle(themes).textColor }]}>{title || translate('error_respawn')}</Text>
          <Text style={[styles.description, textAlign, { color: getStyle(themes).textColor70 }]}>
            {subtitle || translate('error_dont_worry')}
          </Text>
          <Text style={[styles.description, textAlign, { color: getStyle(themes).textColor70 }]}>
            {subtitle2 || translate('error_if_issue_still_happening')}
            <Text onPress={onLinkPress} style={[styles.description, textAlign, { color: colors.sunset }]}>
              {linkText || translate('error_contact_us')}
            </Text>
          </Text>
          <Button style={styles.btnStyle} onPress={onRefresh} type="primary" label={buttonLabel || translate('button_refresh')} />
          {hastimer && (
            <Text style={[styles.description, { marginTop: 20, textAlign: 'center', color: getStyle(themes).textColor70 }]}>
              {replaceStringsFromJson(translate('error_network_timer'), [{ '[timer]': countdownTimer }])}
            </Text>
          )}
        </View>
      </ViewContainer>
    </Modal>
  );
};

const arequal = (prevProps: any, nextProps: any) => {
  return (
    prevProps.isVisible === nextProps.isVisible &&
    prevProps.hastimer === nextProps.hastimer &&
    prevProps.title === nextProps.title &&
    prevProps.subtitle === nextProps.subtitle &&
    prevProps.subtitle2 === nextProps.subtitle2 &&
    prevProps.linkText === nextProps.linkText
  );
};

export default memo(NetworkError, arequal);
