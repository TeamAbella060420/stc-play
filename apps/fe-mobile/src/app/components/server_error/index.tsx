import { Text, TextStyle, View, ViewStyle, Modal } from 'react-native';
import React, { useEffect } from 'react';
import ViewContainer from '../../components/view_container';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import StandardHeader from '../../components/headers/standard_header';
import { colors, getStyle } from '@fe-monorepo/themes';
import Icon from '../../components/Icon';
import Button from '../../components/buttons';
import { translate } from '@fe-monorepo/helper';
import styles from './styles';
import { serverErrorComponentProps } from './types';

const ServerError = (props: serverErrorComponentProps) => {
  const { isVisible, closeModal, onRefresh } = props;
  const { themes, isRTL } = useSelector((state: RootState) => state.app);
  const textAlign: TextStyle = { textAlign: isRTL ? 'right' : 'left' };
  const alignSelf: ViewStyle = { alignSelf: isRTL ? 'flex-end' : 'flex-start' };

  useEffect(() => {
    let timer;
    if (isVisible) {
      timer = setTimeout(() => {
        onRefresh();
      }, 60000);
    } else {
      clearTimeout(timer);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isVisible]);

  return (
    <Modal visible={isVisible} animationType="fade">
      <ViewContainer style={styles.container}>
        <StandardHeader style={styles.headerStyle} onBackPress={closeModal} />
        <View style={styles.bodyContainer}>
          <Icon style={alignSelf} name="errorCrossCircle" width={80} height={80} />
          <Text style={[styles.title, textAlign, { color: getStyle(themes).textColor }]}>{translate('error_respawn')}</Text>
          <Text style={[styles.description, textAlign, { color: getStyle(themes).textColor70 }]}>{translate('error_dont_worry')}</Text>
          <Text style={[styles.description, textAlign, { color: getStyle(themes).textColor70 }]}>
            {translate('error_if_issue_still_happening')}
            <Text style={[styles.description, textAlign, { color: colors.sunset }]}>{translate('error_contact_us')}</Text>
          </Text>
          <Button style={styles.btnStyle} onPress={onRefresh} type="primary" label={translate('button_refresh')} />
        </View>
      </ViewContainer>
    </Modal>
  );
};

export default ServerError;
