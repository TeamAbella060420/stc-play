import { ShopModel } from '@fe-monorepo/models';
import { IMAGES } from '@fe-monorepo/assets';

import Image from '../../../components/Image';

type ProductResultProps = {
  product: ShopModel;
  isLoading?: boolean;
};

const ProductResult = (props: ProductResultProps) => {
  return (
    <div className={`
            flex items-center
            my-12 4xl:my-[21.33px] 5xl:my-32 8xl:my-64
            gap-8 4xl:gap-12 5xl:gap-20 8xl:gap-44
      `
    }
    >
      <Image
        img={props?.product?.img ? props?.product?.img : IMAGES?.DefaultPlaceholder?.toString()}
        divStyle={`
              aspect-square
              h-24 4xl:h-[42.7px] 5xl:h-64 8xl:h-[128px]
        `}
        imgStyle={`h-full  object-contain`}
      />

      <div>
        <p className={`font-regular text-body 4xl:text-subtitle 5xl:text-bigTitle 8xl:text-LPTitle`}>{props?.product?.title}</p>

        <div className={`text-caption 4xl:text-mobileSubtitle 5xl:text-title 8xl:text-huge flex`}>
          {props?.product?.breadcrumbs?.map((item, index) => {
            return (
              <p className={`${index === props?.product?.breadcrumbs?.length - 1 ? `text-btn-primary` : `text-secondary/40`}`} key={index}>
                {item}

                {index !== props?.product?.breadcrumbs?.length - 1 && <span className={`mx-4 4xl:mx-8 5xl:mx-12 8xl:mx-20`}>{'>'}</span>}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductResult;
