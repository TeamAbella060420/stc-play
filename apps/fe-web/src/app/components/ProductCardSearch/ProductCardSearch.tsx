import { t } from 'i18next';
import { HiOutlineHeart } from 'react-icons/hi';
import { MdOutlineStar, MdOutlineStarHalf } from 'react-icons/md';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { ContentModel } from '@fe-monorepo/models';
import { IMAGES } from '@fe-monorepo/assets';
import ScaledIcon from '../../common/ScaledIcon';
import { IconNames } from '@fe-monorepo/helper';

interface ProductCardSearchProps
{
    tabData:ContentModel
}


const Rating = (props: { className?: string, size: number }) =>
{
  const { size } = props;

  return (
    <div className={props?.className}>
        <ScaledIcon
          className='stroke-yellow fill-yellow'
          name={IconNames.starOutline}
          normalHeight={size}
          normalWidth={size}
        />

        <ScaledIcon
          className='stroke-yellow fill-yellow'
          name={IconNames.starOutline}
          normalHeight={size}
          normalWidth={size}
        />

        <ScaledIcon
          className='stroke-yellow fill-yellow'
          name={IconNames.starOutline}
          normalHeight={size}
          normalWidth={size}
        />

        <ScaledIcon
          className='stroke-yellow fill-yellow'
          name={IconNames.starOutline}
          normalHeight={size}
          normalWidth={size}
        />

        <ScaledIcon
          className='stroke-silver fill-silver'
          name={IconNames.starOutline}
          normalHeight={size}
          normalWidth={size}
        />
    </div>
  )
}
const ProductCardSearch = (props:ProductCardSearchProps)=>
{
  // min-w-[282px]
  // max-w-[282px]
  // cmp-product-card
  //
    return(
        <div className={`
                flex flex-col
                flex items-center flex-col
                aspect-[282/308]
                gap-18 4xl:gap-32 5xl:gap-48 8xl:gap-[96px]
                w-[282px] 4xl:w-[501px] 5xl:w-[752px] 8xl:w-[1504px]
              `}
        >
            <div className='
                img-bg flex w-full aspect-[141/154] flex-col rounded-t
                py-5 4xl:py-[8.88px] 5xl:py-[13.33px] 8xl:py-[26.67px]
                items-center min-h-[308px] relative'
            >
              <div className='absolute w-full'>
                <div className='
                      flex w-full h-full items-center justify-between
                      p-18 4xl:p-32 5xl:p-48 8xl:p-[96px]'
                >
                  <div className='
                      h-24 4xl:h-[42.7px] 5xl:h-64 8xl:h-[128px]
                      w-auto
                      font-regular
                      text-bodyLarge 4xl:text-subtitle 5xl:text-bigTitle 8xl:text-LPTitle
                      text-secondary'
                    >
                    {
                      ['0', 0, null, 'null'].includes(props?.tabData?.desc as string)
                    ?
                      t("common_N/A")
                    :
                      props?.tabData?.desc
                    }
                  </div>

                  <ScaledIcon
                    className='fill-silver z-[1]'
                    name={IconNames.heartOutline}
                    normalHeight={32}
                    normalWidth={32}
                  />
                </div>
              </div>

              <div className='
                      relative
                      bg-secondary/[0.04]
                      w-full h-full flex items-center justify-center
                      flex-1
                      px-[10px] 4xl:px-[17.77px] 5xl:px-[26.66px] 8xl:px-[53.33px]
                      rounded-t'>

                <LazyLoadImage
                    className='w-full absolute h-full rounded-t'
                    src={props?.tabData?.img ? props?.tabData?.img : IMAGES?.DefaultPlaceholder?.toString()}
                    alt={props?.tabData?.title}
                />
              </div>
            </div>

            <div className='
                w-full flex flex-col
                gap-[6px] 4xl:gap-[10.66px] 5xl:gap-16 8xl:gap-32
                '
            >
              <div className='
                    font-regular
                    text-body 4xl:text-subtitle 5xl:text-fourKSubtitle 8xl:text-LPTitle
                    text-black50
                    min-h-[24px]'
              >
                {props?.tabData?.title}
              </div>

              <div className='
                gap-12 4xl:gap-[21.33px] 5xl:gap-32 8xl:gap-64
                w-full flex flex-col
                '
              >
                <div className='
                      font-medium
                      text-body 4xl:text-subtitle 5xl:text-fourKSubtitle 8xl:text-LPTitle
                      text-secondary
                      truncate min-h-[24px]'
                  >
                  {props?.tabData?.title}
                </div>

                <div className='
                      flex
                      gap-[3px] 4xl:gap-[5.33px] 5xl:gap-8 8xl:gap-16
                      items-center min-h-[28px]'>
                  <span className={`
                            font-medium
                            text-bodyLarge 4xl:text-subtitle 5xl:text-bigTitle 8xl:text-LPTitle
                            text-secondary`}
                    >
                    {props?.tabData?.total_price ? props?.tabData?.total_price : t("common_N/A")}
                  </span>

                  {
                    !['0', 0, null, 'null'].includes(props?.tabData?.desc as string) ?
                    (
                      <span className='
                            font-regular
                            text-bodyLarge 4xl:text-subtitle 5xl:text-bigTitle 8xl:text-LPTitle
                            line-through
                            text-secondary/50'
                      >
                        {props?.tabData?.desc ? props?.tabData?.desc : t("common_N/A") }
                      </span>
                    )
                  :
                  (
                    ''
                  )}
                </div>

                {
                  <div className='
                        flex
                        gap-[7px] 4xl:gap-[12.44px] 5xl:gap-[18.66px] 8xl:gap-[37.33px]
                        w-full
                        items-center'
                  >
                    <Rating
                      className='flex gap-2 4xl:gap-[3.55px] 5xl:gap-[5.33px] 8xl:gap-[10.66px]'
                      size={20}
                    />

                    <div className='
                          font-regular
                          text-bodySmall 4xl:text-subtitle 5xl:text-bigTitle 8xl:text-LPTitle
                          text-secondary/50
                          mt-1
                          '
                    >
                      ({
                        props?.tabData?.product_rating
                      ?
                        props?.tabData?.product_rating
                      :
                        t("common_N/A")
                      })
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
    )
}

export default ProductCardSearch
