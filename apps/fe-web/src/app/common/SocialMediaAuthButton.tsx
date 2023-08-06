import { useState } from 'react';
import SocialMediaAuthentication from '../../lib/types/socialMediaType';
import Icon from './Icon';

const SocialMediaIcon = (props: { isHover: boolean , value: SocialMediaAuthentication}) =>
{
  const { isHover, value } = props

  return (
    <>

        <div className='flex 4xl:hidden'>
          <Icon
            className={`cursor-pointer ${isHover ? value.icon.hoverStyle : value.icon.defaultStyle}`}
            name={value.icon.name}
            width={value.icon.dimensions.normal.width}
            height={value.icon.dimensions.normal.height}
          />
        </div>

        <div className='hidden 4xl:flex 5xl:hidden'>
          <Icon
            className={`cursor-pointer ${isHover ? value.icon.hoverStyle : value.icon.defaultStyle}`}
            name={value.icon.name}
            width={value.icon.dimensions["2k"].width}
            height={value.icon.dimensions["2k"].height}
          />
        </div>

        <div className='hidden 5xl:flex 8xl:hidden'>
          <Icon
            className={`cursor-pointer ${isHover ? value.icon.hoverStyle : value.icon.defaultStyle}`}
            name={value.icon.name}
            width={value.icon.dimensions["4k"].width}
            height={value.icon.dimensions["4k"].height}
          />
        </div>

        <div className='hidden 8xl:flex'>
          <Icon
            className={`cursor-pointer ${isHover ? value.icon.hoverStyle : value.icon.defaultStyle}`}
            name={value.icon.name}
            width={value.icon.dimensions["8k"].width}
            height={value.icon.dimensions["8k"].height}
          />
        </div>
  </>
  )
}

const SocialMediaAuthButton = (props: { value: SocialMediaAuthentication, onClick?: () => void }) => {
  const { value } = props;

  const [isHover, setHover] = useState<boolean>(false);

  const handleOnClick = () =>
  {
    if (props?.onClick) {
      return props?.onClick();
    }
    if (value?.authenticate) {
      return value?.authenticate();
    }
  }

  return (
    <div
      className={`
          relative
          grid
          w-full
          h-40 4xl:h-72 5xl:h-100 8xl:h-203
          py-8 4xl:py-16 5xl:py-21 8xl:py-44
          px-20 4xl:px-36 5xl:px-54 8xl:px-100
          cursor-pointer
          mb-20 4xl:mb-36 5xl:mb-54 8xl:mb-100
          border-[1px] 4xl:border-[1.77px] 5xl:border-[2.66px] 8xl:border-[5.33px]
          border-black20
          rounded-[2px] 4xl:rounded-[3.55px] 5xl:rounded-[5.33px] 8xl:rounded-[10.66px]

          text-black100
          ${value.hoverStyle}
      `}
      onClick={handleOnClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="
          absolute
          ms-20 4xl:ms-36 5xl:ms-54 8xl:ms-100
          h-20 4xl:h-36 5xl:h-54 8xl:h-100
          w-20 4xl:w-36 5xl:w-54 8xl:w-100
          flex items-center justify-center justify-self-start self-center"
      >
        <SocialMediaIcon isHover={isHover} value={value}/>
      </div>

      <p className="
              text-body 4xl:text-subtitle 5xl:text-fourKSubtitle 8xl:text-LPTitle
              font-regular
              justify-self-center self-center "
      >
        {value.text}
      </p>
    </div>
  );
};

export default SocialMediaAuthButton;
