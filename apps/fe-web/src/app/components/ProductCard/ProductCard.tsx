import { LazyLoadImage } from 'react-lazy-load-image-component';
import { twMerge } from 'tailwind-merge';
import { HiOutlineHeart } from 'react-icons/hi';
import { MdOutlineStar, MdOutlineStarHalf } from 'react-icons/md';
import Button from '../Button';
import usePageLayout from '../../hooks/usePageLayout';
import './ProductCard.scss';
interface ProductCardProps {
  brand?: string | null;
  name: string;
  description: string | null;
  price: string;
  discount?: string;
  discountPrice?: string;
  ratings?: number;
  image?: string;
  ctaLabel?: string;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  brand,
  name,
  description,
  price,
  discount,
  discountPrice,
  ratings,
  image,
  ctaLabel,
  className
}) => {
  const { btnClass } = usePageLayout();
  const cssClassName = twMerge(
    `
            cmp-product-card
            w-auto
            h-full
            flex
            items-center
            flex-col
            gap-[18px]
            min-w-[282px]
            max-w-[282px]
            4xl:min-w-[501.33px] 
            4xl:max-w-[501.33px] 
            8xl:min-w-[1504px]
            8xl:max-w-[1504px]
            4xl:gap-[32px]
            8xl:gap-[96px]
        `,
        className);
  return (
    <div className={cssClassName}>
      <div className='img-bg flex w-full h-full flex-col rounded 
          py-5 items-center min-h-[308px] relative
          4xl:min-h-[547.55px]
          4xl:py-[35.55px]
          5xl:py-[47.77px]
          5xl:min-h-[735.77px]
          8xl:py-[106.66px]
          8xl:min-h-[1642.66px]

        '>
        <div className='absolute w-full'>
          <div className='flex w-full h-full items-center justify-between px-5 4xl:px-[35.55px] 5xl:px-[47.77px] 8xl:px-[106.66px]'>
            <div className='h-[24px] 4xl:h-[42.66px] 5xl:h-[57.33px] 8xl:h-[128px] w-auto font-regular text-base 4xl:text-[28px] 8xl:text-[85.33px] font-medium text-secondary'>
              {['0', 0, null, 'null'].includes(discount as string) ? '' : discount}
            </div>
            <HiOutlineHeart size={24} className='text-outline 4xl:w-[42.66px] 4xl:h-[42.66px] 5xl:w-[57px] 5xl:h-[57px] 8xl:w-[128px] 8xl:h-[128px]' />
          </div>
        </div>
        <div className='w-full h-full flex items-center justify-center mx-auto flex-1 px-10 4xl:px-[71px] 5xl:px-[95.55px] 8xl:px-[213.33px]'>
          <LazyLoadImage src={image} alt={name} className='w-full h-full object-contain' />
        </div>
      </div>
      <div className='w-full flex flex-col gap-3 4xl:gap-[21.33px] 5xl:gap-[28.66px] 8xl:gap-[64px]'>
        <div className='font-regular text-base text-sunset font-normal min-h-[24px] 4xl:min-h-[42.66px] 5xl:min-h-[57.33px] 8xl:min-h-[128px] 4xl:text-[28px] 5xl:text-[38.22px] 8xl:text-[85.33px] flex items-center w-full'>{brand}</div>
        <div className='font-regular font-semibold text-base text-secondary truncate min-h-[24px] 4xl:min-h-[42.66px] 5xl:min-h-[57.33px] 8xl:min-h-[128px] 4xl:text-[28px] 5xl:text-[38.22px] 8xl:text-[85.33px] 4xl:py-2.5 5xl:py-3 8xl:py-7'>{name}</div>
        <div className='flex gap-3 items-center min-h-[28px] 4xl:min-h-[49.77px] 5xl:min-h-[66.88px] 8xl:min-h-[149.33px] 4xl:gap-[21.33px 5xl:gap-[28.66px] 8xl:gap-[64px]'>
          <span
            className={`font-regular font-medium text-lg ${
              ['0', 0, null, 'null'].includes(discountPrice as string) ? 'text-secondary' : 'text-error'
            }
            4xl:text-[32px]
            5xl:text-[43px]
            8xl:text-[96px]`}
          >
            {price}
          </span>
          {!['0', 0, null, 'null'].includes(discountPrice as string) ? (
            <span className='font-regular text-lg line-through text-secondary/50 4xl:text-[43px] 8xl:text-[96px]'>{discountPrice}</span>
          ) : (
            ''
          )}
        </div>
        {
          <div className='flex gap-1 w-full items-center min-h-[24px]  4xl:min-h-[42.66px] 5xl:min-h-[57.33px] 4xl:gap-[7px] 5xl:gap-2.5 8xl:gap-[21px]'>
            <MdOutlineStar size={20} className='text-yellow 4xl:w-[35.55px] 4xl:h-[35.55px] 5xl:w-[47px] 5xl:h-[47px] 8xl:w-[128px] 8xl:h-[128px]' />
            <MdOutlineStar size={20} className='text-yellow 4xl:w-[35.55px] 4xl:h-[35.55px] 5xl:w-[47px] 5xl:h-[47px] 8xl:w-[128px] 8xl:h-[128px]' />
            <MdOutlineStar size={20} className='text-yellow 4xl:w-[35.55px] 4xl:h-[35.55px] 5xl:w-[47px] 5xl:h-[47px] 8xl:w-[128px] 8xl:h-[128px]' />
            <MdOutlineStarHalf size={20} className='text-yellow 4xl:w-[35.55px] 4xl:h-[35.55px] 5xl:w-[47px] 5xl:h-[47px] 8xl:w-[128px] 8xl:h-[128px]' />
            <MdOutlineStar size={20} className='text-secondary/50 4xl:w-[35.55px] 4xl:h-[35.55px] 5xl:w-[47px] 5xl:h-[47px] 8xl:w-[128px] 8xl:h-[128px]' />
            <div className='font-regular text-sm text-secondary/50 mt-1 4xl:text-[24.88px] 5xl:text-[33.44px] 8xl:text-[74px] 4xl:mt-[7.1px] 8xl:mt-[21.33px]'>({ratings})</div>
          </div>
        }
        <Button
          text={ctaLabel || ''}
          style={`
                    px-24 py-8
                    w-full
                    text-base
                    font-regular
                    text-white100
                `}
          normalStyle={btnClass}
          className='4xl:h-[71px] 5xl:h-[95.55px] 4xl:text-[28px] 5xl:text-[38.22px] 8xl:text-[85.33px] 8xl:h-[213.33px]'
        />
      </div>
    </div>
  );
};

export default ProductCard;
