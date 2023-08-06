import { useTranslation } from 'react-i18next';
import useShop from '../../../hooks/useShop';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import usePageLayout from '../../../hooks/usePageLayout';

interface ShopHeaderTabProps {
    id: number;
    label: string;
}

interface ShopHeaderProps {
    tabs:ShopHeaderTabProps[];
    title: string;
    className?: string;
}
const ShopHeader: React.FC<ShopHeaderProps> = ({
    tabs = [],
    title,
    className
}) => {
    const { t } = useTranslation();
    const [ activeTab, setActiveTab ] = useShop(state => [state.activeTab, state.setActiveTab]);
    const handleClick = (tab: number = 0) => setActiveTab(tab);
    const { direction } = usePageLayout();
    const cssClassName = twMerge(`
        w-full
        h-full
        flex
        items-center
        gap-[27px]
        4xl:gap-[48px]
        8xl:gap-[144px]
    `, className)
    const paddings = direction === 'ltr' ? 'sm:ml-10 xsMax:ml-10 xs:ml-10 md:ml-0' : 'sm:mr-10 xsMax:mr-10 xs:mr-10 md:mr-0'
    return (
        <div className={cssClassName}>
            <div className={`
                h-full text-secondary font-regular font-semibold 
                text-[2.5rem]
                sm:mx-10
                xs:mx-10
                xsMax:mx-10
                md:mx-0
                4xl:text-[71px]
                8xl:text-[213.33px]
                4xl:text-huge 5xl:text-eightKSubtitle 8xl:text-fiveKDynamic
            `}>
                {title}
            </div>
            <div className={`h-full w-full flex-1 justify-start items-center ${paddings}  
                sm:overflow-x-scroll xsMax:overflow-x-scroll xs:overflow-x-scroll`}>
                <ul className={`
                flex w-full list-none border-transparent border-b border-solid border-y-secondary/30 
                gap-[16px]
                4xl:gap-[28px] 
                8xl:gap-[85px]
                4xl:border-b-[1.77px] 5xl:border-b-[2.66px] 8xl:border-b-[5.33px]
                sm:overflow-x-scroll xsMax:overflow-x-scroll xs:overflow-x-scroll
                ${direction === 'ltr' ? 'sm:mr-40 xs:mr-40 xsMax:mr-40 md:mr-0' : 'sm:ml-40 xs:ml40 xsMax:ml-40 md:ml-0'}
                `}>
                    {
                        tabs.map(({label, id}, index) => (
                            <li className={`
                                group h-full cursor-pointer 
                                px-[20px]
                                4xl:px-[35px]
                                8xl:px-[106.66px] 
                                py-[12px]
                                4xl:py-[21px] 
                                8xl:py-[64px]
                                border-transparent border-b transition-all duration-300 ease-in-out
                                4xl:border-b-[1.77px] 5xl:border-b-[2.66px] 8xl:border-b-[5.33px]
                                ${activeTab === id ? 'border-solid border-y-secondary' : ''}
                                ${direction === 'ltr' ? 'sm:last:mr-10 xs:last:mr-10 xsMax:last:mr-10 md:last:mr-0' : 'sm:last:ml-10 xs:last:ml-10 xsMax:last:ml-10 md:last:ml-0'}
                            `} key={index} onClick={() => handleClick(index)}>
                                <div className={`h-full transition-all duration-300 ease-in-out font-regular 
                                    text-base 
                                    4xl:text-[28px]
                                    8xl:text-[85.33px]
                                    whitespace-nowrap ${activeTab === id ? 'text-secondary' : 'text-secondary/20'}`}>
                                    {label}
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className={`text-sunset font-regular 
                text-base 
                4xl:text-[28px]
                8xl:text-[85.33px]
                4xl:border-b-[1.77px] 5xl:border-b-[2.66px] 8xl:border-b-[5.33px] border-solid border-y-sunset 
                pt-[25px] 
                4xl:pt-[44.44px]
                8xl:py-[68px]
                cursor-pointer 
                sm:absolute 
                xs:absolute 
                xsMax:absolute
                md:static
                sm:bottom-[-20px]
                xs:bottom-[-20px]
                xsMax:bottom-[-20px]
                sm:mx-10
                xs:mx-10
                xsMax:mx-10
                md:mx-0
                whitespace-nowrap
            `}>
                {t('common_see_all')}
            </div>
        </div>
    );
}
 
export default ShopHeader;