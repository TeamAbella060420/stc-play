import { RootState } from '@fe-monorepo/store';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Spinner from '../../components/Spinner';
import Container from '../../components/Container';

interface SearchHeaderProps
{
  title: string;
  totalResult: number;
  selectedTab: string;
  tabs: Array<{ key: string; translate: string }>;
  isLoading: boolean;
  setSelectedTab: (value: string) => void;
}

const SearchHeader = (props: SearchHeaderProps) => {
  const { t } = useTranslation();
  const prefs = useSelector((state: RootState) => state.app);
  const dir = prefs?.language === "ar" ? 'rtl' : 'ltr';

  return (
    <div className={`

            font-regular
            text-secondary
            border-b-2 4xl:border-b-[3.55px] 5xl:border-b-4 8xl:border-b-[11px]
            border-secondary/20
            `}
    >
      <Container className="bg-primary">
        <div className={`
                    flex
                    font-medium
                    text-title 4xl:text-mobileDynamic 5xl:text-LPTitle 8xl:text-fiveKDynamic
                    py-48 4xl:py-[85.33px] 5xl:py-[128px] 8xl:py-[256px]
              `}
          >
          <h1>"{props?.title}"</h1>
          <h1 className={`
                    ms-[6px] 4xl:ms-[10.66px] 5xl:ms-16 8xl:ms-32
                    flex items-center`}
          >
            ({props?.isLoading? <Spinner className={`text-secondary/30`} /> : props?.totalResult})
          </h1>
        </div>

      {/* Implementing horizontal scrolling causes problems with the underline */}
        <div className={`overflow-x-scroll `}>
          <div className='mb-20 4xl:mb-32 5xl:mb-48 8xl:mb-[96px] z-[10] h-fit flex w-full'>
            {props?.tabs?.map((item, index) => {
              return (
                <span
                  key={index}
                  className={`
                        duration-[0.5s]
                        ${
                          index === 0
                        ?
                          `me-16 4xl:me-[28px] 5xl:me-[42px] 8xl:me-81`
                        :
                          `mx-16 4xl:mx-[28px] 5xl:mx-[42px] 8xl:mx-81`
                        }
                        cursor-pointer
                        text-body 4xl:text-subtitle 5xl:text-bigTitle 8xl:text-LPTitle
                        ${props?.selectedTab === item?.key ? `text-secondary` : `text-secondary/40`}

                        hover:text-secondary
                        underline-${dir}-animation
                        after:bottom-[-20px] after:4xl:bottom-[-35.55px] after:5xl:bottom-[-53.33px] after:8xl:bottom-[-106.66px]
                        after:h-2 4xl:after:h-[3.55px] 5xl:after:h-[5.33px] after:8xl:h-[10.66px]
                        after:bg-secondary`
                  }
                  onClick={() => props?.selectedTab !== item?.key && props?.setSelectedTab(item?.key)}
                >
                  <p>{t(item?.translate)}</p>
                  {
                    props?.selectedTab === item?.key
                  &&
                    <p className={`
                      bg-secondary
                      bottom-[-20px] 4xl:bottom-[-35.55px] 5xl:bottom-[-53.33px] 8xl:bottom-[-106.66px]
                      absolute w-full
                      h-2 4xl:h-[3.55px] 5xl:h-[5.33px] 8xl:h-[10.66px]`
                    }
                  />}
                </span>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SearchHeader;
