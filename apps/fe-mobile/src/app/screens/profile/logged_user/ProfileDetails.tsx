import { View, Image, Text, StyleSheet } from 'react-native';
import React from 'react';
import IconButton from '../../../components/buttons/buttonIcon';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import images from '../../../assets/images';
import { getStyle, spacing } from '@fe-monorepo/themes';
import Typography from '../../../assets/typography';

type profileDetails = {
  username?: string;
  displayName?: string;
  displayPhoto?: string;
  bio?: string;
};

const ProfileDetails = (props: profileDetails) => {
  const { username, displayName, displayPhoto, bio } = props;
  const { isRTL, themes } = useSelector((state: RootState) => state.app);
  const QRPosition = isRTL ? { right: 20 } : { left: 20 };
  const profilePic = !displayPhoto ? images.profile_placeholder : typeof displayPhoto === 'string' ? { uri: displayPhoto } : displayPhoto;

  return (
    <View style={styles.profileDetailsContainer}>
      <IconButton
        onPress={() => console.log('MOVE TO QR ')}
        style={[{ position: 'absolute' }, QRPosition]}
        name="qr"
        width={24}
        height={24}
      />
      <Image source={profilePic} style={styles.displayPhoto} resizeMode="cover" />

      {displayName && <Text style={[styles.displaynName, { color: getStyle(themes).textColor }]}>{displayName}</Text>}
      {username && (
        <Text style={[displayName ? styles.username : styles.displaynName, { color: getStyle(themes).textColor }]}>{`@${username}`}</Text>
      )}
      {bio && <Text style={[styles.bio, { color: getStyle(themes).textColor70 }]}>{bio}</Text>}
    </View>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({
  profileDetailsContainer: { paddingHorizontal: spacing[20], marginTop: spacing[24] },
  displayPhoto: { width: 98, height: 98, alignSelf: 'center', borderRadius: 100 },
  displaynName: StyleSheet.flatten([Typography.subtitleMedium, { textAlign: 'center', marginTop: spacing[12] }]),
  username: StyleSheet.flatten([Typography.captionMedium, { textAlign: 'center', marginVertical: spacing[4] }]),
  bio: StyleSheet.flatten([Typography.bodySmallRegular, { textAlign: 'center', marginTop: spacing[4] }])
});
