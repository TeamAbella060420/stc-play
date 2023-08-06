import { IconNames } from '@fe-monorepo/helper';
import { useHelper } from '@fe-monorepo/hooks';
import { BitsModel } from '@fe-monorepo/models';

import Image from '../../../components/Image';
import Icon from '../../../common/Icon';

type BitResultProps = {
  bit: BitsModel;
  isLoading?: boolean;
  length?: number;
};

const BitResult = (props: BitResultProps) => 
{
  const helper = useHelper();

  return (
    <div className={`items-center my-12 w-full`}>
      <div className={`relative text-white100`}>
        <Image img={props?.bit?.img} divStyle={``} imgStyle={`w-[386.67px] aspect-[40/71] rounded-md`} />
        <div className={`absolute bottom-8 left-8 backdrop-brightness-50 px-[6px] flex items-center gap-5 rounded h-[30px]`}>
          <Icon name={IconNames?.vectorOutline} iconClasses={`h-[16px] w-[15px]`} className={``} />
          <p className={``}>{helper?.abbrNum(props?.bit?.views, 1)}</p>
        </div>
        <div className={`absolute bottom-8 right-8 backdrop-brightness-50 px-[6px] flex items-center gap-5 rounded h-[30px]`}>
          <Icon name={IconNames?.likeOutline} iconClasses={`h-[28px] w-[19px]`} className={`stroke-white100 stroke-1`} />
          <p className={``}>{helper?.abbrNum(props?.bit?.number_of_likes, 1)}</p>
        </div>
      </div>
      <div className={`mt-20`}>
        <div className={`flex gap-8 items-center`}>
          <Image img={props?.bit?.img} divStyle={``} imgStyle={`w-[30px] h-[30px] rounded-full`} />
          <p className={`text-body`}>{props?.bit?.title}</p>
        </div>
        <p className={`text-caption text-secondary/40 mt-8`}>{props?.bit?.description}</p>
      </div>
    </div>
  );
};

export default BitResult;
