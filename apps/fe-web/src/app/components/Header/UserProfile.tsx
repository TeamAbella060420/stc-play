import { MdNotificationsNone, MdOutlineChatBubbleOutline, MdOutlineKeyboardArrowDown } from 'react-icons/md';
import UserAvatar from '../Avatar';
import { useUserProfile } from '@fe-monorepo/hooks';
import useMobileDetect from '../../hooks/useMobileDetect';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../app.routes.enum';
import ScaledIcon from '../../common/ScaledIcon';
import { IconNames } from '@fe-monorepo/helper';

const UserProfile = () => {
    const { user } = useUserProfile();
    const isMobile = useMobileDetect();
    return (
        <>
            {
              !isMobile
            &&
              <div className='gap-24 4xl:gap-[42.66px] 5xl:gap-64 8xl:gap-[128px]  flex items-center animate__animated animate__fadeIn'>

                <ScaledIcon
                    className={`
                      fill-secondary/50
                      animate__animated animate__fadeIn`
                    }
                    name={IconNames.notification}
                    normalWidth={20}
                    normalHeight={20}
                />

                <Link to={AppRoutes.chat}>
                    <ScaledIcon
                      className={`
                        fill-secondary/50
                        animate__animated animate__fadeIn`
                      }
                      name={IconNames.talk}
                      normalWidth={20}
                      normalHeight={20}
                    />

                </Link>

                <div className='divider
                  border-[1px] 4xl:border-[1.77px] 5xl:border-[2.66px] 8xl:border-[5.33px]
                  border-solid border-secondary/20 h-18 4xl:h-32 5xl:h-48 8xl:h-[96px]'
                />

                {/* (user?.avatar_url || user?.display_name) */}
                <div className='flex
                      gap-[10px] 4xl:gap-18 5xl:gap-[26.66px] 8xl:gap-54
                      items-center cursor-pointer'>
                    <div className='

                        flex items-center justify-center
                        aspect-square rounded-full
                        h-40 4xl:h-[60px] 5xl:h-[90px] 8xl:h-180 bg-blue overflow-hidden'
                    >

                  <p className='
                              text-secondary
                              text-bodySmall 4xl:text-bodyLarge 5xl:text-title 8xl:text-huge
                              font-regular '
                      >S</p>
                    </div>



                    <ScaledIcon
                        className={`
                          fill-secondary/50
                          animate__animated animate__fadeIn`
                        }
                        name={IconNames.chevron}
                        normalWidth={20}
                        normalHeight={20}
                    />
                </div>
              </div>
            }

            {
              isMobile && <div className='flex items-center justify-center flex-col gap-[12px]'>
                    <UserAvatar name={user?.avatar_url || user?.display_name} size='80'/>
                    <div className='font-regular text-secondary text-[24px]'>{user?.display_name}</div>
                    <div className='font-regular text-secondary/70 text-[16px]' dir='ltr'>@{user?.username}</div>
                </div>
                
              }
        </>
    );
}

export default UserProfile;
