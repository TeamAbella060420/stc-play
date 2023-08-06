import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import GuestComponent from './GuestComponent';
import LoggedComponent from './LoggedComponent';

const ProfileScreen = () => {
  const { persona } = useSelector((state: RootState) => state.user);

  return !persona || persona === 'guest' ? <GuestComponent /> : <LoggedComponent />;
};

export default ProfileScreen;
