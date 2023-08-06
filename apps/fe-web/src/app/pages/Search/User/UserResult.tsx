import { UserSearchModel } from '@fe-monorepo/models';
import { IMAGES } from '@fe-monorepo/assets';
import { translate } from '@fe-monorepo/helper';

import Image from '../../../components/Image';
import { useTranslation } from 'react-i18next';
import { useCommunity } from '@fe-monorepo/hooks';
import { useEffect, useState } from 'react';

type UserResultProps = {
  user: UserSearchModel;
  isLoading?: boolean;
  shouldShowFollow?:boolean
};

const UserResult = (props: UserResultProps) =>
{
  const { follow, unfollow } = useCommunity();
  const { t } = useTranslation();
  const [isFollowing, setIsFollowing] = useState<boolean>();
  const handleFollowClick = async () => {
    if (!isFollowing) {
      const { data } = await unfollow(props.user.id);
      if (data?.unfollowUser.is_successful) {
        return setIsFollowing(true);
      }
    }
    const { data } = await follow(props.user.id);
    if (data?.followUser.is_successful) {
      return setIsFollowing(false);
    }
    
  }
  useEffect(() => {
    setIsFollowing(props?.user?.viewer_is_following === 0);
  }, [props?.user?.viewer_is_following]);
  
  return (
    <div className='
            flex
            items-center justify-between
            my-20 4xl:my-36 5xl:my-54 8xl:my-100'
    >
      <div className={`
              flex items-center
              sm:w-[40%]
              gap-8 4xl:gap-12 5xl:gap-20 8xl:gap-44
            `}
      >
        <Image
          img={props?.user?.img ? props?.user?.img : IMAGES?.DefaultPlaceholder?.toString()}
          divStyle={``}
          imgStyle={`
              rounded-full
              aspect-square
              w-24 4xl:w-[42.66px] 5xl:w-64 8xl:w-[128px]
              `
            }
        />

        <div className='font-regular '>
          <p className={`text-body 4xl:text-subtitle 5xl:text-bigTitle 8xl:text-LPTitle`}>
            {props?.user?.title}
          </p>

          <p className={`
            text-caption 4xl:text-mobileSubtitle 5xl:text-title 8xl:text-huge
            text-secondary/40`}
          >
            {props?.user?.id}
          </p>
        </div>
      </div>

      {
        props?.shouldShowFollow
        &&
        <p
            className={`
                font-regular
                text-bodySmall 4xl:text-subtitle 5xl:text-bigTitle 8xl:text-huge
                cursor-pointer
                ${isFollowing ? `text-sunset` : `text-outline`}`
            }
            onClick={handleFollowClick}
        >
          {
            isFollowing
            ?
              t("common_follow")
            :
              t("common_following")
          }
        </p>
      }
    </div>
  );
};

export default UserResult;
