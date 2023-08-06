import { useTranslation } from 'react-i18next';
import ShopFilters from './Filters';
import { times } from 'lodash';
import { Mousewheel } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import ProductSkeletonPlaceHolder from './ProductSkeletonPlaceHolder';
import usePageLayout from '../../../hooks/usePageLayout';

const ShopByProducts = () => {
    const { t } = useTranslation();
    const { direction } = usePageLayout();
    return (
        <div className='
            w-ful 
            h-full
            flex
            flex-col
            gap-[56px]
        ' key={direction}>
            <ShopFilters 
                filters={[]} 
                defaultText={t('common_all') as string} />
            {/* CONTENT */}
        <div className='w-full h-full flex gap-[30px] overflow-x-scroll'>
           {
            times(3).map(item => <ProductSkeletonPlaceHolder key={item}/>)
           }
        </div>
        </div>
    );
}
 
export default ShopByProducts;