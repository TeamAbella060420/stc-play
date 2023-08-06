import { useState } from 'react';
import SearchInput from './SearchInput';
import useToggleSearch from '../../../hooks/useToggleSeach';
import useMobileDetect from '../../../hooks/useMobileDetect';
import ScaledIcon from '../../../common/ScaledIcon';
import { IconNames } from '@fe-monorepo/helper';

const Search = () =>
{
    const isMobile = useMobileDetect();
    const [showSearchInput, setShowSearchInput] = useToggleSearch((state) => [state.showSearchInput,  state.setShowSearchInput]);

    return (
        <>
            {
              !isMobile
            &&
              <div className={` h-full flex ${showSearchInput ? 'flex-1' : 'items-center'}`}>
                <SearchInput/>

                  {
                    !showSearchInput
                  &&
                      <ScaledIcon
                          className={`cursor-pointer relative fill-secondary/50`}
                          name={IconNames.search1}
                          normalWidth={24}
                          normalHeight={24}
                          onClick={() => setShowSearchInput()}
                      />
                  }
              </div>
            }

            {
              isMobile
            &&
              <ScaledIcon
                  className={`cursor-pointer relative fill-secondary/70`}
                  name={IconNames.search1}
                  normalWidth={20}
                  normalHeight={20}
                  onClick={() => setShowSearchInput()}
                />
            }
        </>
    );
}

export default Search;
