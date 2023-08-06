import { useTranslation } from 'react-i18next';
import RecentSearchResult from './RecentSearchResult';
import { useSearchHistory } from '@fe-monorepo/hooks';
import { useEffect } from 'react';
import useRecentSearch from '../../../hooks/useRecentSearch';

interface RecentSearchProps {
    className?: string;
    setSearchInput: (value: any) => void;
    isOpen: boolean;
}
const RecentSearch: React.FC<RecentSearchProps> = ({
    className,
    setSearchInput,
    isOpen
}) => {
    const { t } = useTranslation();
    const [revalidateData, setRevalidateData] = useRecentSearch(state => [state.revalidateData, state.setRevalidateData]);
    const { getSearchHistory, searchHistoryData, clearAllHistory, clearAllSearchHistoryData} = useSearchHistory();
    useEffect(() => {
        if (clearAllSearchHistoryData) {
            getSearchHistory();
        }
    }, [clearAllSearchHistoryData]);
    useEffect(() => {
        if (revalidateData && isOpen) {
            getSearchHistory();
            setRevalidateData(false);
        }
        if (!isOpen) {
            setRevalidateData(true);
        }
    }, [revalidateData, isOpen]);
    return (
        <div className={`
            animate__animated
            w-full
            bg-primary
            border
            border-solid
            border-secondary/10
            h-auto
            rounded-[4px] 4xl:rounded-[7.11px] 5xl:rounded-[10.66px] 8xl:rounded-[21.33px]
            py-24 4xl:py-[42.66px] 5xl:py-64 8xl:py-[128px]
            px-16 4xl:px-[28px] 5xl:px-40 8xl:px-81
            flex
            flex-col
            gap-24 4xl:gap-[42.66px] 5xl:gap-64 8xl:gap-[128px]
            absolute
            top-[60px] 4xl:top-[106.66px] 5xl:top-[160px] 8xl:top-[320px]
            ${className}
            shadow-2xl
            shadow-secondary/10`
        }
        >
            <div className='flex justify-between w-full items-center h-full relative'>
                <div className='
                        font-medium
                        text-bodyLarge 4xl:text-subtitle 5xl:text-bigTitle 8xl:text-LPTitle
                        text-secondary'
                >
                  {t('recent')}</div>
                {
                  !!searchHistoryData?.length
                &&
                  <div className='
                          font-normal
                          text-bodySmall 4xl:text-subtitle 5xl:text-bigTitle 8xl:text-huge
                          text-btn-primary
                          mix-blend-normal
                          cursor-pointer'
                        onClick={() => clearAllHistory()}
                  >
                    {t('common_clearAll')}
                  </div>
                }
            </div>

            <RecentSearchResult
                setSearchInput={setSearchInput}
                getSearchHistory={getSearchHistory}
                searchHistoryData={searchHistoryData}
            />
        </div>

    );
}

export default RecentSearch;
