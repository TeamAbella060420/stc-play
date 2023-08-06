
import { useTranslation } from 'react-i18next';
import React from 'react';
import { translate } from '@fe-monorepo/helper';

export type HeaderTab =
{
  id: number | string,
  label: string
}

interface SectionHeaderProps
{
    className: string,

    title: string;

    tabs: HeaderTab[];
    activeTab: number,
    selectTab: (index: number) => void
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ className, title, tabs = [], activeTab = 0, selectTab  }) =>
{
    // scale-gap-[27px]
    return (
        <div className={`
            flex flex-col md:flex-row
            items-start sm:items-stretch
            gap-24 sm:gap-[27px] 4xl:gap-48 5xl:gap-72 8xl:gap-[144px]
            ${className}
        `}
    >
      <p
        className="
                  inline-block
                  text-secondary
                  font-medium
                  text-bigTitle 4xl:text-huge 5xl:text-eightKSubtitle 8xl:text-fiveKDynamic"
      >
        {title}
      </p>

      <div className="w-full overflow-x-scroll flex gap-24 sm:gap-[27px] 4xl:gap-48 5xl:gap-72 8xl:gap-[144px] items-start sm:items-stretch">
        <div className="flex flex-col w-full relative flex-1 justify-end items-center">
          <ul
            className="
                      h-36 md:h-[90%]

                      flex w-full list-none
                      relative items-end
                      border-transparent
                      gap-16 4xl:gap-[28px] 5xl:gap-[42px] 8xl:gap-81
                      "
          >
            {tabs.map((tab, index) =>
              {
                      return (
                        <li
                          className={`
                                              group h-full cursor-pointer
                                              relative
                                              flex md:items-center
                                              border-transparent
                                              border-b-[1px] 4xl:border-b-[1.77px] 5xl:border-b-[2.66px] 8xl:border-b-[5.33px]
                                              px-[30px] 4xl:px-54 5xl:px-80 8xl:px-160

                                        ${activeTab === index ? 'border-solid border-y-secondary' : ''}`}
                                        key={index}
                                        onClick={() => selectTab(index)}
                                      >
                                          <p className={`
                                                  relative
                                                  sm:h-fit
                                                  whitespace-nowrap
                                                  font-regular
                                                  text-body 4xl:text-subtitle 5xl:text-fourKSubtitle 8xl:text-eightKSubtitle
                                                  ${activeTab === index ? 'text-secondary' : 'text-secondary/30'}`}
                                          >
                                            {tab.label}
                                          </p>
                      </li>)
                })}
          </ul>

          <div
            className="

                    absolute
                    w-full
                    bottom-0
                    text-bigTitle 4xl:text-huge 5xl:text-eightKSubtitle 8xl:text-fiveKDynamic

                    bg-secondary/20
                    h-[1px] 4xl:h-[1.77px] 5xl:h-[2.66px] 8xl:h-[5.33px]

                    "
          />
        </div>

        <div
          className="
                  hidden md:flex items-end
                  border-b-[1px] 4xl:border-b-[1.77px] 5xl:border-b-[2.66px] 8xl:border-b-[5.33px]
                  border-solid border-y-sunset

                  cursor-pointer"
        >
          <p
            className={`
                    text-sunset font-regular
                    text-body 4xl:text-subtitle 5xl:text-fourKSubtitle 8xl:text-eightKSubtitle
                  `}
                >
                  {translate('common_see_all')}
                </p>
        </div>
            </div>
        </div>
  );
};

export default SectionHeader;
