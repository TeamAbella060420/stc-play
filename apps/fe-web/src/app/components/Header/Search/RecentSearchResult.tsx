import { useSearchHistory } from '@fe-monorepo/hooks';
import { SearchHistoryModel } from '@fe-monorepo/models';
import React, { useCallback, useEffect, useState } from 'react';

import { IconNames } from '@fe-monorepo/helper';
import ScaledIcon from '../../../common/ScaledIcon';
type SearchHistoryItem = {
    search_id: number;
    title: string;
}

interface RecentSearchResultProps {
    setSearchInput: (value: any) => void;
    getSearchHistory: () => void;
    searchHistoryData: [SearchHistoryModel] | undefined
}
const RecentSearchResult: React.FC<RecentSearchResultProps> = ({
    setSearchInput,
    getSearchHistory,
    searchHistoryData = []
}) => {
    const [loading, setLoading] = useState(searchHistoryData.length === 0);
    const { removeHistory, removeData } = useSearchHistory();
    const handleItemClick = useCallback((item: SearchHistoryItem) => {
        setSearchInput(item.title)
    }, []);
    const removeItem = useCallback((item: SearchHistoryItem) => {
        setLoading(true);
        removeHistory(item.search_id);
    }, [removeHistory])
    useEffect(() => {
        getSearchHistory();
    }, []);
    useEffect(() => {
        if (removeData) {
            getSearchHistory();

        }
    }, [removeData]);
    useEffect(() => {
        setLoading(searchHistoryData.length === 0);
    }, [searchHistoryData]);
    return (
        <div className='
                  flex
                  gap-16 4xl:gap-[28px] 5xl:gap-[42px] 8xl:gap-81
                  flex-col
                  h-full relative bg-primary'>
            {
                searchHistoryData?.map(item => (
                    <div className='w-full flex justify-between items-center cursor-pointer' key={item.search_id}>
                        <div className='flex w-full items-start flex-col'>
                            <div
                                className='
                                font-normal
                                text-body 4xl:text-subtitle 5xl:text-bigTitle 8xl:text-LPTitle
                                text-secondary'
                                onClick={() => handleItemClick(item)}
                            >
                                {item.title}
                            </div>
                        </div>
                        <div className='cursor-pointer'>
                            {/* <MdOutlineClose size={20} className='text-secondary/70' onClick={() => removeItem(item)}/> */}
                            <ScaledIcon
                              className={`cursor-pointer relative fill-secondary/70`}
                              name={IconNames.close1}
                              normalWidth={20}
                              normalHeight={20}
                              onClick={() => removeItem(item)}
                            />
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default RecentSearchResult;
