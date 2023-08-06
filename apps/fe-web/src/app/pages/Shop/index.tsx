import Container from '../../components/Container';
import SectionHeader from '../Home/Components/SectionHeader';
import ShopHeader from './components/Header';
import ShopContent from './Content';
import { useTranslation } from 'react-i18next';

const Shop = () => {
    const { t } = useTranslation();
    const shopTabs = [
        {
            label: t('unboxing'),
            id: 0,
        },
        {
            label: t('by_products'),
            id: 1,
        },
        {
            label: t('by_categories'),
            id: 2,
        }
    ]
    return (
        <section className='w-full h-full px-6 
            py-40 relative 
            sm:px-0 
            xsMax:px-0 
            xs:px-0 
            md:px-6
            4xl:px-10
            4xl:py-[71px]
            8xl:px-[128px]
            8xl:py-[213px]
        '>
            <div className={`bg-gradient-to-t from-brand rounded-[8px] pt-40 flex gap-10 sm:gap-5 xs:gap-5 xsMax:gap-5 flex-col flex-1
                4xl:pt-[71px]
                4xl:gap-[71px]
                8xl:pt-[213px]
                8xl:gap-[213px]
            
            `}>
                <Container className='flex flex-col w-full h-full bg-transparent gap-10 py-40 
                    lg:px-[98px]
                    md:px-40
                    sm:px-0 
                    xsMax:px-0 
                    xs:px-0
                    4xl:px-[120px]
                    4xl:gap-[71px]
                    4xl:py-[71px]
                    8xl:px-[522px]
                    8xl:gap-[213px]
                    8xl:py-[213px]
                '>
                    
                    <ShopHeader tabs={shopTabs} title={t('tabTitle_shop')}
                        className='
                            sm:flex-col 
                            xsMax:flex-col 
                            xs:flex-col 
                            sm:items-start 
                            xsMax:items-start 
                            xs:items-start
                            md:flex-row
                            md:items-center
                        '
                    />
                </Container>
                <ShopContent/>
            </div>
        </section>
    );
}
 
export default Shop;