import React, { useEffect, useRef } from 'react';
import Video from 'react-native-video';
import videos from '../../assets/videos';
import { NAV_ROUTES } from '../../helpers/navRoutes';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootNavigation';
import { useNavigation } from '@react-navigation/native';
import useDisableBackButton from '../../hooks/useDisableBackButton';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import { useAccount, useAppState } from '@fe-monorepo/hooks';

const Splash = () => {
  useDisableBackButton(true);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, NAV_ROUTES.Splash>>();
  const { firstInstall, isValidated } = useSelector((state: RootState) => state.app);
  const { userContext } = useSelector((state: RootState) => state.user);
  const { changeInstallStatus } = useAppState();
  const { getUserProfile } = useAccount();
  const videoRef = useRef<Video>(null);

  const onEnd = () => {
    if (firstInstall) {
      navigation.navigate(NAV_ROUTES.Language);
      changeInstallStatus();
    } else {
      if (userContext.token && userContext.token !== '' && isValidated) {
        getUserProfile();
        navigation.replace(NAV_ROUTES.Main);
      } else {
        navigation.navigate(NAV_ROUTES.SignIn);
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current?.dismissFullscreenPlayer();
        onEnd();
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return <Video testID="Splash" ref={videoRef} source={videos.splash} style={{ flex: 1 }} resizeMode="cover" />;
};

export default Splash;
