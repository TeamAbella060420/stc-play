import React, { useEffect, useMemo } from 'react';
import useDrawerToggle from '../../hooks/useDrawerToggle';
import { AppRoutes } from '../../app.routes.enum';
import { useNavigate } from 'react-router';
import useMobileDetect from '../../hooks/useMobileDetect';
import { MdOutlineShoppingCart, MdOutlineClose, MdMenu } from 'react-icons/md';
import { useUserProfile } from '@fe-monorepo/hooks';
import Search from './Search/Search';
import useToggleSearch from '../../hooks/useToggleSeach';
import SearchInput from './Search/SearchInput';
import Container from '../Container';
import useRecentSearch from '../../hooks/useRecentSearch';
import NavLinks from './NavLinks';
import NavProfile from './NavProfile';
import MobileDrawer from './MobileDrawer';
import { Link } from 'react-router-dom';
import RecentSearchMobile from './Search/RecentSearchMobile';
import ScaledIcon from '../../common/ScaledIcon';
import { IconNames } from '@fe-monorepo/helper';
import Icon from '../../common/Icon';

export const RECENT_SEARCH_ID = 'header-recent-search';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HeaderProps {

}

const Header: React.FC<HeaderProps> = () => {
    const isOpen = useRecentSearch(state => state.isOpen);
    const [showSearchInput] = useToggleSearch(state => [state.showSearchInput]);
    const [open, toggleDrawer] = useDrawerToggle(state => [state.open, state.toggleDrawer]);
    const isMobile = useMobileDetect();
    const navigate = useNavigate();
    const { user } = useUserProfile();
    const mobileSearchInput = useMemo(() => {
        if (isMobile) {
            toggleDrawer(false);
            return showSearchInput;
        }
        return false;
    }, [showSearchInput]);

    useEffect(() => {
        if (!isMobile && open) {
            toggleDrawer(false);
        }
    }, [isMobile]);

    return (
        <header className={`
              sticky
              flex items-center
              border-b-[1px] 4xl:border-b-[1.77px] 5xl:border-b-[2.66px] 8xl:border-b-[5.33px]
              border-solid border-secondary/20
              bg-primary
              top-0
              transition-all duration-300
              py-[15px] 4xl:py-[26.66px] 5xl:py-40 8xl:py-80
              z-50`}
        >
            <Container className={`
                  ${mobileSearchInput ? 'overflow-clip' : ''}
                  rounded-none bg-primary transition-all duration-300
                  flex items-center justify-between
                  gap-[30px] 4xl:gap-54 5xl:gap-80 8xl:gap-160
                  animate__animated animate__fadeIn`}>
                {
                  !mobileSearchInput
                &&
                  <>
                    <ScaledIcon
                      className={`cursor-pointer fill-brand-primary animate__animated animate__fadeIn`}
                      name={IconNames.stcPlay}
                      normalWidth={110}
                      normalHeight={30}
                      onClick={() => navigate(AppRoutes.home)}
                    />

                    <div className={`${showSearchInput ? 'animate__animated animate__fadeOut hidden' : 'flex-1 animate__animated animate__fadeIn block'}`}>
                      <NavLinks/>
                    </div>

                    <div className={`flex items-center gap-20 4xl:gap-36 5xl:gap-54 8xl:gap-100 ${showSearchInput ? 'flex-1' : ''}`}>
                        {!open && <Search/>}

                        {
                          !open
                        &&
                          <Link to={AppRoutes.cart} className='cursor-pointer relative'>
                            <ScaledIcon
                              className={`
                                  cursor-pointer
                                  fill-secondary/50  xsMax:fill-secondary/70
                                  animate__animated animate__fadeIn`
                              }
                              name={IconNames.shoppingCart1}
                              normalWidth={20}
                              normalHeight={20}
                            />
                          </Link>
                        }

                        <NavProfile/>

                        {
                          isMobile
                        &&
                          <div className='h-fit' onClick={() => toggleDrawer(!open)}>
                            {
                              open
                            ?
                              <Icon
                                  className={`
                                    cursor-pointer
                                    fill-secondary
                                  `}
                                  name={IconNames.close1}
                                  height={20}
                                  width={20}
                              />
                            :
                              <Icon
                                  className={`
                                    cursor-pointer
                                    fill-secondary
                                  `}
                                  name={IconNames.menu}
                                  height={20}
                                  width={20}
                              />
                            }
                          </div>
                        }
                    </div>
                  </>
                }

                {
                  mobileSearchInput
                &&
                  <div className='w-full'>
                      <SearchInput/>
                  </div>
                }
            </Container>

            <MobileDrawer/>

            {isMobile && user?.token && <RecentSearchMobile open={isOpen && isMobile}/>}

            {
              isOpen
            &&
              <div
                className={`xsMax:hidden sm:hidden xs:hidden md:hidden lg:block animate__animated
                ${(isOpen) ? 'animate__fadeIn block' : 'animate__fadeOut hidden' }
                -z-[50] fixed top-64 4xl:top-[113.77px] 5xl:top-[170.66px] 8xl:top-[341.33px]
                bg-black100/80 h-screen w-full inset-0 backdrop-blur-sm drop-shadow-sm`}/>
            }
        </header>
    );
}

export default Header;
