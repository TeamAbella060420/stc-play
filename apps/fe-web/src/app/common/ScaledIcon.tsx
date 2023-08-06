import { useState, useEffect } from 'react';
import { IconNames } from '@fe-monorepo/helper';
import Icon from './Icon';
import useGetCurrentBreakPoint from '../../lib/hooks/useGetCurrentBreakPoint/useGetCurrentBreakPoint';
import { BreakPoint } from '../../lib/hooks/useGetCurrentBreakPoint/useGetCurrentBreakPoint';


export interface IAppProps
{
  name: IconNames,
  className?: string,
  iconClasses?: string,
  normalWidth: number,
  normalHeight: number,
  fill?: string,
  onClick?: () => void
}

type SizesObj =
{
  [B in BreakPoint]:
  {
    height: number, width: number
  }
}

const ScaledIcon = (props: IAppProps) =>
{
  const { normalHeight: height, normalWidth: width } = props;

  const { currentBreakPoint } = useGetCurrentBreakPoint();

  const [sizes, setSizes] = useState<SizesObj>(
    {
      "mobile": {
        height: height?? 10, width: width?? 10
      },
      "normal":
      {
        height: height?? 10, width: width?? 10
      },

      "2k":
      {
        height: height?? 10, width: width?? 10
      },

      "4k":
      {
        height: height?? 10, width: width?? 10
      },

      "8k":
      {
        height: height?? 10, width: width?? 10
      },
  })


  useEffect(() =>
  {
    if (props?.normalHeight &&  props?.normalWidth)
    {
      const heightPercentage = props.normalHeight / 1440;
      const widthPercentage = props.normalWidth / 1440;


      const normalObj =
      {
        height: props.normalHeight,
        width: props.normalWidth
      }
      const sizes =
      {
        "mobile": normalObj,
        "normal": normalObj,

        "2k":
        {
          height: heightPercentage * 2560,
          width: widthPercentage * 2560,
        },

        "4k":
        {
          height: heightPercentage * 3840,
          width: widthPercentage * 3840,
        },

        "8k":
        {
          height: heightPercentage * 7680,
          width: widthPercentage * 7680,
        },
      }

      setSizes(sizes)
    }
  }, [props?.normalHeight, props?.normalWidth])

  return (
    <Icon
        className={props.className}
        name={props.name}
        width={sizes[currentBreakPoint].width}
        height={sizes[currentBreakPoint].height}
        onClick={props?.onClick}
    />
  );
}

export default ScaledIcon;
