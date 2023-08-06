import React, { useEffect } from 'react';
import { View, Modal } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@fe-monorepo/store';
import { useTranslation } from 'react-i18next';
import Animated, { withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { ModalsProps } from './types';
import { styles } from './styles';


const ModalContainer = (props: ModalsProps) => {
  const { isVisible, onOpen, onClose, overlay, overlayOpacity, children } = props;
  const { t } = useTranslation();
  const isRTL = useSelector((state: RootState) => state.app.isRTL);
  const animatedOpacityValue = useSharedValue(0);

  const animatedOverlayStyle = useAnimatedStyle(() => { return { opacity: animatedOpacityValue.value };});

  useEffect(() => {
    if(isVisible){
      animatedOpacityValue.value = withTiming(overlayOpacity, { duration: 600 });
    } else {
      animatedOpacityValue.value = withTiming(0, { duration: 600 });
    }
  }, [isVisible])

  return (
    <Modal
        visible={isVisible}
        onRequestClose={onClose}
        onShow={onOpen}
        animationType='slide'
        transparent={true}
    >
      {overlay && <Animated.View onTouchEnd={onClose} style={[styles().overlayContainer, animatedOverlayStyle]} />}
      {children}
    </Modal>
  );
};

export default ModalContainer;