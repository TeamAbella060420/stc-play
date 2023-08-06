import { MdOutlineSearch, MdOutlineClose } from 'react-icons/md';
import useToggleSearch from '../../../hooks/useToggleSeach';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@fe-monorepo/store';
import { useTranslation } from 'react-i18next';
import RecentSearch from './RecentSearch';
import useRecentSearch from '../../../hooks/useRecentSearch';
import { useGlobalSearch, useSearchHistory, useUserProfile } from '@fe-monorepo/hooks';
import useDebounce from '../../../hooks/useDebounce';
import useMobileDetect from '../../../hooks/useMobileDetect';
import useSearchInput from '../../../hooks/useSearchInput';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../../app.routes.enum';
import ScaledIcon from '../../../common/ScaledIcon';
import { IconNames } from '@fe-monorepo/helper';

const SearchInput = () => {
    const navegate = useNavigate();
    const appRoute = AppRoutes
    const [ isRecentClose, setIsRecentClose ] = useState(false);

    const [value, enableRecentSearch , setEnableRecentSearch , setValue] = useSearchInput(state => [state.value, state.enableRecentSearch , state.setEnableRecentSearch, state.setValue]);
    const isMobile = useMobileDetect();
    const { user } = useUserProfile();
    const [isOpen, setIsOpen] = useRecentSearch(state => [state.isOpen, state.setIsOpen]);
    const { t } = useTranslation();
    const prefs = useSelector((state: RootState) => state.app);
    const direction = prefs?.language === 'ar' ? 'rtl' : 'ltr';
    const [showSearchInput, setShowSearchInput] = useToggleSearch(state => [state.showSearchInput, state.setShowSearchInput]);
    const debounceVal = useDebounce(value, 500);
    const animationDir = direction === 'ltr' ?
    showSearchInput ? ' w-full h-full animate__fadeInRight' : 'animate__fadeOutRight w-[200px]'
    : direction === 'rtl' ? showSearchInput ? ' w-full h-full animate__fadeInLeft' : 'animate__fadeOutLeft w-0' : null;

    const navigateTosearch = (searchValue = value) =>
    {
        if(searchValue) {
            navegate(appRoute.search + `?q=${searchValue}`);
        }
    }

    // useEffect(() => {
    //     if (debounceVal.length)
    //     {
    //         getAllSearch({identifier: debounceVal, name: '', search_id: 0});
    //     }
    // }, [debounceVal]);
    return (
        <div className={`flex
            justify-end
            items-center
            animate__animated
            relative
            duration-200
            ease-in-out
            transition-all
            ${animationDir}
        `}>

            <div className={`
                  bg-secondary/10

                  rounded-[4px] 4xl:rounded-[7.11px] 5xl:rounded-[10.66px] 8xl:rounded-[21.33px]
                  flex items-center m-0

                  py-8 4xl:py-[14px] 5xl:py-22 8xl:py-[42.66px]
                  px-12 4xl:px-22 5xl:px-32 8xl:px-64
                  gap-12 4xl:gap-22 5xl:gap-32 8xl:gap-64
                  mix-blend-normal w-full`}
            >
                <div className='
                      flex w-full items-center
                      gap-12 4xl:gap-22 5xl:gap-32 8xl:gap-64

                      text-body 4xl:text-subtitle 5xl:text-bigTitle 8xl:text-LPTitle
                      '
                >
                    <ScaledIcon
                        className={`
                        cursor-pointer relative fill-secondary/50 mix-blend-normal
                        px-2 4xl:px-[3.55px] 5xl:px-[5.33px] 8xl:px-[10.66px]`}
                        name={IconNames.search1}
                        normalWidth={20}
                        normalHeight={20}
                    />

                    <input
                        value={value}
                        onChange={({target}) => setValue(target?.value)}
                        className='
                          border-none bg-transparent
                          rounded-none
                          focus:outline-none
                          flex-1

                          w-full text-secondary
                          mix-blend-normal'
                        placeholder={t('search_input_placeholder') || ''}
                        autoFocus={true}
                        onFocus={()=> setIsRecentClose(true)}
                        onKeyDown={(e)=> e.key?.toLocaleLowerCase() === 'enter' && navigateTosearch()}
                        onClick={() => {
                            if (user?.token && !isOpen) {
                                setIsOpen(true)
                            }
                        }}/>
                    {
                      value
                    &&
                      <span
                        className='
                            animate__animated
                            animate__fadeIn
                            text-btn-primary
                            cursor-pointer
                        '
                        onClick={() => setValue('')}>
                          {t('common_clear')}
                      </span>
                    }

                    <ScaledIcon
                        className={`cursor-pointer relative fill-secondary/50 px-[5px] 4xl:px-8 5xl:px-[13.33px] 8xl:px-[26.66px]`}
                        name={IconNames.close}
                        normalWidth={11.67}
                        normalHeight={11.67}
                        onClick={() =>
                        {
                          setValue('');

                          setShowSearchInput();
                          if (user?.token && isOpen)
                          {
                            setIsOpen(false)
                          }
                        }}
                    />
                </div>
            </div>

            {
              user?.token && !isMobile && enableRecentSearch &&
              <RecentSearch className={isOpen ? 'animate__fadeIn block' : 'animate__fadeOut hidden'} setSearchInput={(val) => { 
                setValue(val);
                navigateTosearch(val);
            }} isOpen={isOpen}/>}
        </div>
    );
}

export default SearchInput;
