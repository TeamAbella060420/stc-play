import { t } from 'i18next';
import { StreamsModel } from '@fe-monorepo/models';
import Image from '../../../components/Image';

type StreamResultProps = {
  stream: StreamsModel;
  isLoading?: boolean;
  length?: number;
};

const StreamResult = (props: StreamResultProps) => {
  return (
    <div className={`items-center my-12`}>
      <div className={`relative`}>
        <Image img={props?.stream?.img} divStyle={``} imgStyle={`h-[160px] w-full aspect-[141/80] rounded-md`} />
        <p className={`absolute left-8 top-12 bg-red font-regular px-[6px] text-bodySmall rounded text-white`}>{t('common_live')}</p>
      </div>
      <div className={`mt-20`}>
        <p className={`text-body`}>{props?.stream?.title}</p>
        <div className={`flex gap-12 items-center mt-12`}>
          <Image img={props?.stream?.img} divStyle={``} imgStyle={`w-[30px] h-[30px] rounded-full`} />
          <div className={`text-caption text-secondary/40`}>
            <p>{props?.stream?.title}</p>
            <p>{props?.stream?.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamResult;
