import React, { useEffect } from 'react';
import Drawer from '../../Drawer';
import { useSearchHistory } from '@fe-monorepo/hooks';
import { useTranslation } from 'react-i18next';
import RecentSearchResult from './RecentSearchResult';
import useDebounce from '../../../hooks/useDebounce';
import useSearchInput from '../../../hooks/useSearchInput';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../../app.routes.enum';

interface RecentSearchMobileProps {
    open: boolean;
}
const RecentSearchMobile: React.FC<RecentSearchMobileProps> = ({
    open
}) => {
    const [setValue] = useSearchInput(state => [state.setValue]);
    const { t } = useTranslation();
    const { searchHistoryData, clearAllHistory, getSearchHistory } = useSearchHistory();
    const navigate = useNavigate();
    useEffect(() => {
        getSearchHistory();
    }, []);
    return (
        <Drawer
            className='mt-[30px]'
            open={open}>
            <section className='
                      h-[calc(100vh-35px)]
                      overflow-y-auto
                      px-[20px]
                      pt-[5px]
                      flex flex-col
                      w-full
                      gap-[12px]'
            >
                <div className='flex justify-between w-full items-center'>
                    <div className='font-medium text-lg text-secondary'>{t('recent')}</div>
                    {!!searchHistoryData?.length && <div className='font-normal text-sm text-btn-primary mix-blend-normal cursor-pointer' onClick={() => clearAllHistory()}>{t('common_clearAll')}</div>}
                </div>

                <RecentSearchResult
                    setSearchInput={(value) => {
                        setValue(value);
                        navigate(AppRoutes.search + `?q=${value}`);
                    }}
                    getSearchHistory={getSearchHistory}
                    searchHistoryData={searchHistoryData}
                />
            </section>
        </Drawer>
    );
}

export default RecentSearchMobile;
