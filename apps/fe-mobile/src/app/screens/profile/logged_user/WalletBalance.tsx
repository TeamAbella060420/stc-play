import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import React from 'react';
import { colors, spacing } from '@fe-monorepo/themes';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import Typography from '../../../assets/typography';
import Icon from '../../../components/Icon';
import images from '../../../assets/images';
import { replaceStringsFromJson, translate } from '@fe-monorepo/helper';

const WalletBalance = () => {
  const { isRTL } = useSelector((state: RootState) => state.app);
  const { userWallet } = useSelector((state: RootState) => state.wallet);
  const walletBalance = replaceStringsFromJson(translate('currency_SR'), [{ '[balance]': userWallet.total_balance }]);

  return (
    <TouchableOpacity onPress={() => console.log('MOVE TO WALLET')} style={styles.container}>
      <ImageBackground
        style={{
          ...styles.imgBG,
          flexDirection: isRTL ? 'row-reverse' : 'row'
        }}
        source={images.bg_mask_purple}
        resizeMode="cover"
      >
        <View>
          <Text style={{ ...Typography.captionRegular, color: colors.white100, textAlign: isRTL ? 'right' : 'left' }}>
            {translate('wallet_balance')}
          </Text>
          <Text style={{ ...Typography.subtitleMedium, marginTop: spacing[8], color: colors.white100 }}>{walletBalance}</Text>
        </View>
        <Icon name={isRTL ? 'chevronLeft' : 'chevronRight'} fill={colors.white100} />
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default WalletBalance;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkPurple,
    borderRadius: spacing[4],
    marginHorizontal: spacing[20],
    marginTop: spacing[32],
    marginBottom: spacing[8]
  },
  imgBG: { flex: 1, padding: 16, borderRadius: spacing[4], justifyContent: 'space-between', alignItems: 'center' }
});
