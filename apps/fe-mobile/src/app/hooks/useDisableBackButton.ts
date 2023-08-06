import { useEffect } from 'react';
import { BackHandler } from 'react-native';

const useDisableBackButton = (disable: boolean) => {
  const handleBackButtonPress = () => {
    if (disable) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonPress);
    return () => backHandler.remove();
  }, [handleBackButtonPress]);
};

export default useDisableBackButton;
