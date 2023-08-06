import { translate } from "@fe-monorepo/helper";
import Spinner from "../../../components/Spinner"

interface SearchSectionProps
{
  dir: "ltr" | "rtl",
  selectedTab: string,
  isLoading: boolean,
  sectionTitle: string,
  totalResults?: number,

  SectionData: React.ReactNode
  selectTab: () => void
}

const SearchSectionResult = (props: SearchSectionProps) =>
{
  const
  {
    dir,
    sectionTitle,
    selectedTab,
    isLoading,
    totalResults,

    SectionData,
    selectTab
  } = props;

  return (
      <>
      {/* TODO: Fix the top margin */}
        <div className={`
              ${
                  selectedTab === "all"
                ?
                  "mt-32 4xl:mt-[56.88px] 5xl:mt-[85.33px] 8xl:mt-[170.66px]"
                :
                  "mt-16 4xl:mt-[28px] 5xl:mt-40 8xl:mt-81"
                }
              flex items-center justify-between text-secondary`}
        >
            <div className={`flex


            `}>
            {
                selectedTab === "all"
                ?
                  <div className={`
                        flex
                        text-title 4xl:text-mobileDynamic 5xl:text-LPTitle 8xl:text-fiveKDynamic
                        font-medium
                  `}>
                    <h1 className='sm:text-sm sm:font-regular sm:text-secondary/70
                      xs:text-sm xs:font-regular xs:text-secondary/70
                      xsMax:text-sm xsMax:font-regular xsMax:text-secondary/70
                      md:text-2xl
                      md:text-secondary
                      4xl:text-[42.66px]
                      8xl:text-[128px]
                    '>{sectionTitle}</h1>

                    <h1 className={`ms-[6px] 4xl:ms-[10.66px] 5xl:ms-16 8xl:ms-32 flex items-center
                      sm:text-sm sm:font-regular sm:text-secondary/70
                      xs:text-sm xs:font-regular xs:text-secondary/70
                      xsMax:text-sm xsMax:font-regular xsMax:text-secondary/70
                      md:text-2xl
                      md:text-secondary
                      4xl:text-[42.66px]
                      8xl:text-[128px]
                    `}>
                      ({isLoading ? <Spinner className={`text-secondary/30`} /> : totalResults})
                    </h1>
                  </div>
                :
                  <div className={`
                      flex
                      text-bodySmall 4xl:text-subtitle 5xl:text-bigTitle 8xl:text-huge
                      text-secondary/50
                  `}>
                    <h1 className='sm:text-sm sm:font-regular sm:text-secondary/70'>{translate('common_results')}</h1>

                    <h1 className={`
                          ms-[6px] 4xl:ms-[10.66px] 5xl:ms-16 8xl:ms-32
                          flex items-center`
                        }
                    >
                      ({
                          isLoading
                        ?
                          <Spinner className={`
                                aspect-square
                                h-[10px] 4xl:h-[17.77px] 5xl:h-[26.66px] 8xl:h-[53.33px]

                                border-2 4xl:border-[3.55px] 5xl:border-[5.33px] 8xl:border-[10.66px]
                                text-secondary/30`}
                          />
                        :
                          totalResults
                      })
                    </h1>
                  </div>
              }
            </div>

            {
              props?.selectedTab === "all"
              &&
              <h1
                className={`
                    text-body 4xl:text-subtitle 5xl:text-bigTitle 8xl:text-LPTitle
                    text-btn-primary cursor-pointer underline-${dir}-animation
                    after:bottom-[-0.13rem] 4xl:after:bottom-[-0.2311rem] 5xl:after:bottom-[-0.3466rem] 8xl:after:bottom-[-0.6933rem]
                    after:h-2 4xl:after:h-[3.55px] 5xl:after:h-[5.33px] 8xl:after:h-[10.66px]
                    after:bg-btn-primary
                    sm:text-sm sm:font-regular
                    xs:text-sm xs:font-regular
                    xsMax:text-sm xsMax:font-regular
                    md:text-base
                    whitespace-nowrap`}
                  onClick={selectTab}
              >
                {translate('common_see_all')}
              </h1>
            }
        </div>

        <div className={`
          mt-32 4xl:mt-[56.88px] 5xl:mt-[85.33px] 8xl:mt-[170.66px]
          mb-48 4xl:mb-[85.33px] 5xl:mb-[128px] 8xl:mb-[256px]
          text-secondary`}
        >
          {SectionData}
        </div>
      </>
  )
}

export default SearchSectionResult;
