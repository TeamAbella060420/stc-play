import React from 'react';
import { View, Text, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

import { RootState } from '@fe-monorepo/store';
import { IMAGES } from '@fe-monorepo/assets';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getStyle } from '@fe-monorepo/themes';

const CustomDrawer = props => {

  const User = useSelector((state: RootState) => state.user.userContext);
  const theme = useSelector((state: RootState) => state.app.themes);

  const { t } = useTranslation();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={getStyle(theme)}>
        <View style={{ padding: 20, minHeight: 150 }}>
          <Image source={IMAGES.Avatar} style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }} />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              marginBottom: 5
            }}
          >
            {t('common_welcomeing')} {User.firstName} {User.lastName}
          </Text>
        </View>
        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;
