import { useTranslation } from 'react-i18next';
import ShopFilters from './Filters';
import { useShopCategory, useShopProduct } from '@fe-monorepo/hooks';
import { useEffect, useMemo } from 'react';
import { ShopCategoryDataModel, ShopProductDataModel } from '@fe-monorepo/models';
import { filter, times, uniqBy } from 'lodash';
import useShop from '../../../hooks/useShop';
import ProductCard from '../../../components/ProductCard/ProductCard';
import ProductSkeletonPlaceHolder from './ProductSkeletonPlaceHolder';
import usePageLayout from '../../../hooks/usePageLayout';
import Carousel from '../../../components/Carousel/Carousel';
const ShopByCategories = () => {
    const { direction } = usePageLayout()
    const { t } = useTranslation();
    const { getAll, categories } = useShopCategory();
    const { getAll: getAllProduct, products, isLoading } = useShopProduct();
    const [activeFilter, setActiveFilter] = useShop(state => [state.activeFilter, state.setActiveFilter]);
    const paddings = direction === 'ltr' ? 'sm:pl-10 xsMax:pl-10 xs:pl-10' : 'sm:pr-10 xsMax:pr-10 xs:pr-10';
    const productItemsFirstPaddings = direction === 'ltr' ? `
            md:first:ml-10
            lg:first:ml-[100px]
            sm:first:ml-10
            xs:first:ml-10
            xsMax:first:ml-10
            8xl:first:ml-[533.33px]
        ` : `
        md:first:mr-10
        lg:first:mr-[100px]
        sm:first:mr-10
        xs:first:mr-10
        xsMax:first:mr-10
        8xl:first:mr-[533.33px]
    `;
    const productItemsLastPaddings = direction === 'ltr' ? `
            md:last:mr-10
            lg:last:mr-[100px]
            sm:last:mr-10
            xs:last:mr-10
            xsMax:last:mr-10
            4xl:last:mr-[177.77px]
            8xl:last:mr-[533.33px]
        ` : `
        md:last:ml-10
        lg:last:ml-[100px]
        sm:last:ml-10
        xs:last:ml-10
        xsMax:last:ml-10
        4xl:last:ml-[177.77px]
        8xl:last:ml-[533.33px]
    `;
    const parsePrice = ({lowest_grand_total, total_price}: ShopProductDataModel) => {
        if ([null, 'null', 0, ''].includes(lowest_grand_total) && ![null, 'null', 0, ''].includes(total_price)) {
            return 'SR ' + Number(total_price).toFixed(2);
        }
        return 'SR ' + Number(lowest_grand_total).toFixed(2);
    }
    const filters = useMemo(() => {
        if (categories && categories.data?.length) {
            const { data = [] } = categories;
            return data.filter(item => item.sub_categories.length === 0).map(({
                category_id,
                name,
                sort_id
            }: ShopCategoryDataModel) => ({id: category_id, name: name.trim(), sort_id})).sort(function (a, b) {
                return a.sort_id - b.sort_id;
            })
        }
        return [];
    }, [categories]);
    const productLists = useMemo(() => {
        if (products && products.data?.length) {
            const { data } = products;
            return data.map((item, index) => ({
                ...item,
                brand: activeFilter,
                description: item.description_en,
                price: parsePrice(item),
                discount: item.discount_rate+'',
                discountPrice: item.discount_price+'',
                ratings: item.number_of_likes,
                image: item.media?.[0] || ''
            }))
        }
        return [];
    }, [products]);
    const initCategories = async () => {
        await getAll();
    }
    const handleFilter = ({id, name}: {id: number, name: string}) => {
        if (name !== 'all') {
            setActiveFilter(name);
            getAllProduct({
                category_id: Number(id),
                page_number: 1,
                // is_digital: 1,
                // is_active: 1,
            });
        }
    }
    useEffect(() => {
        initCategories();
    }, []);
    useEffect(() => {
        if (filters.length) {
            handleFilter(filters?.[0]);
        }
    }, [filters])
    return (
        <div className='
            w-full
            h-full
            flex
            flex-col
            gap-[56px]
            8xl:gap-[298.66px]
        ' key={direction}>
            <div className={`md:px-10 lg:px-[100px] 4xl:px-28 8xl:px-[533.33px] ${paddings}`}>
                <ShopFilters 
                    filters={uniqBy(filters, 'name')} 
                    defaultText={t('common_all') as string} 
                    activeFilter={activeFilter}
                    onClick={handleFilter}/>
            </div>
            { isLoading && <div className={`flex 
                gap-7 
                4xl:gap-[49.77px] 
                8xl:gap-[149.33px] 
                pb-40 
                4xl:pb-[71px] 
                8xl:pb-[213.33px] 
                sm:mx-10 xs:mx-10 
                xsMax:mx-10 
                8xl:mx-[533.33px] 
                ${direction === 'ltr' ? 'md:ml-[100px]' : 'md:mr-[100px]'}
                overflow-x-scroll`}>{times(3).map(item =><ProductSkeletonPlaceHolder key={item}/>)}</div> }
            {!isLoading && productLists.length > 0 && <Carousel className='pb-40 w-full h-full overflow-x-clip whitespace-nowrap 4xl:pb-[71px] 8xl:pb-[213.33px]'>
                {
                    productLists.length > 0 && productLists.map((product, index) => (
                        <div className={` 
                            h-full
                            w-auto
                            scroll-container__list-item
                            ${productItemsFirstPaddings}
                            ${productItemsLastPaddings}`} key={product.product_id}>
                            <ProductCard
                                {...product}
                                ctaLabel={t('shop_add_to_cart') as string}
                            />
                        </div>
                    ))
                }
            </Carousel>}
        </div>
    );
}
 
export default ShopByCategories;