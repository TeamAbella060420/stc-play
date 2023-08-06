import { TournamentModel } from '@fe-monorepo/models';
import { IMAGES } from '@fe-monorepo/assets';

import Image from '../../../components/Image';

type TournamentResultProps = {
  tournament: TournamentModel;
  isLoading?: boolean;
  index: number;
  length?: number;
};

const TournamentResult = (props: TournamentResultProps) => {
  return (
    // sm:w-[386.67px] 4xl:w-[687.41px] 5xl:w-[1031.12px] 8xl:w-[2062.24px]
    // sm:w-[386.67px] 4xl:w-[687.41px] 5xl:w-[1031.12px] 8xl:w-[2062.24px]
    <div className={`
      aspect-[773.34/496]
      min-w-[300px]
      w-full
      `
    }
  >
      <Image
        img={props?.tournament?.img ? props?.tournament?.img : IMAGES?.DefaultPlaceholder?.toString()}
        divStyle={`
              w-full aspect-[773.34/320]
              rounded-[4px] 4xl:rounded-[7.11px] 5xl:rounded-[10.66px] 8xl:rounded-[21.33px]
              overflow-hidden`}
        imgStyle={`w-full h-full object-cover`}
      />

      <div className={`mt-20 4xl:mt-[35.55px] 5xl:mt-[53.33px] 8xl:mt-[106.66px] text-ellipsis overflow-hidden`}>
        {/* TODO: Anything more than one line should use ... */}
        <p className={`
                line-clamp-1
                font-medium
                text-body 4xl:text-subtitle 5xl:text-bigTitle 8xl:text-LPTitle`
            }
        >
          {props?.tournament?.title}
        </p>

        <p className={`

            line-clamp-1
            font-regular
            text-caption 4xl:text-mobileSubtitle 5xl:text-title 8xl:text-huge
            text-secondary/40`}
        >
          {props?.tournament?.game_code}
        </p>
      </div>
    </div>
  );
};

export default TournamentResult;
