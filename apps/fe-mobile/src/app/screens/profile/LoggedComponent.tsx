import React from 'react';
import { ScrollView, Text } from 'react-native';
import ViewContainer from '../../components/view_container';
import { useNavigation } from '@react-navigation/native';
import StandardHeader from '../../components/headers/standard_header';
import { translate } from '@fe-monorepo/helper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootNavigation';
import { NAV_ROUTES } from '../../helpers/navRoutes';
import styles from './styles';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import ProfileDetails from './logged_user/ProfileDetails';
import UserStats from './logged_user/UserStats';
import ScreenCards from './logged_user/ScreenCards';
import WalletBalance from './logged_user/WalletBalance';

const LoggedComponent = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, NAV_ROUTES.Profile>>();
  const { userContext } = useSelector((state: RootState) => state.user);
  console.log('userContext', userContext);

  return (
    <ViewContainer style={styles.container}>
      <StandardHeader
        onBackPress={() => navigation.goBack()}
        label={translate('screen_profile')}
        righComponent={
          <Text style={styles.editProfile} onPress={() => console.log('MOVE TO EDIT PROFILE')}>
            {translate('profile_edit_profile')}
          </Text>
        }
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }} bounces={false} showsVerticalScrollIndicator={false}>
        <ProfileDetails
          displayPhoto={userContext.avatar_url}
          username={userContext.username}
          displayName={userContext.display_name}
          bio={userContext.bio}
        />

        <UserStats followers={userContext.total_followers} following={userContext.total_following} xp={userContext.points} />
        <WalletBalance />
        <ScreenCards />
      </ScrollView>
    </ViewContainer>
  );
};

export default LoggedComponent;
