import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { COMMUNITY_MUTATION } from '@fe-monorepo/data-access';
import { AccountModel, QuestionnaireModel } from '@fe-monorepo/models';
import { useAppState } from '../index';

type FollowUserObjects = {
  is_successful: boolean;
  error_code: string;
  error_msg: string;
};

type FollowResponseData = { followUser: FollowUserObjects };
type UnFollowResponseData = { unfollowUser: FollowUserObjects };

type FollowModel = {
   username: string 
}

type FollowUserParams = {
  details: FollowModel;
};

export const useCommunity = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { changeLoadingState } = useAppState();

  const [followUser, { data: followUserData, error: followUserError }] = useMutation<
    FollowResponseData,
    FollowUserParams
  >(COMMUNITY_MUTATION.follow, {
    onError: e => {
      console.log(e);
      changeLoadingState(false);
    }
  });

  const [unfollowUser, { data: unfollowUserData, error: unfollowUserError }] = useMutation<
  UnFollowResponseData,
  FollowUserParams
>(COMMUNITY_MUTATION.unfollow, {
  onError: e => {
    console.log(e);
    changeLoadingState(false);
  }
});

  const follow = async (username: string) => {
    return await followUser({
      variables: { details: 
        { username : username } as FollowModel
      }
    });
  };

  const unfollow = async (username: string) => {
    return await unfollowUser({
        variables: { details: 
            { username : username } as FollowModel
        }
    });
  };

  useEffect(() => {
    if (followUserData) {
      const data = followUserData;
      setErrorMessage(data.followUser.error_msg);
      changeLoadingState(false);
    }

    if (unfollowUserData) {
      const data = unfollowUserData;
      setErrorMessage(data.unfollowUser.error_msg);
      changeLoadingState(false);
    }

  }, [followUserData, unfollowUserData]);

  useEffect(() => {
    if (followUserError || unfollowUserError) {
      changeLoadingState(false);
    }
  }, [followUserError, unfollowUserError]);

  return { follow, unfollow, followUserData, unfollowUserData, errorMessage };
};
